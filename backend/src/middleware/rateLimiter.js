import redisClient from "../config/redis.js";
import resolveRule from "../services/ruleResolver.js";

const rateLimiter = async (req, res, next) => {
  try {
    const rule = await resolveRule(req);
    if (!rule) {
      return next();
    }
    const limit = rule.limit;
    const timeWindow = rule.timeWindow * 1000;
    let key;

    if (rule.target === "user" && req.user?.id) {
      key = `rate:${rule.identifier}:user:${req.user.id}`;
    } else {
      key = `rate:${rule.identifier}:ip:${req.ip}`;
    }
    const now = Date.now();
    const luaScript = `local key = KEYS[1]
                    local limit = tonumber(ARGV[1])
                    local timeWindow = tonumber(ARGV[2])
                    local now = tonumber(ARGV[3])
                    local windowStart = now - timeWindow
                    redis.call("ZREMRANGEBYSCORE", key, 0, windowStart)
                    redis.call("ZADD", key, now, now)
                    local count = redis.call("ZCARD", key)
                    redis.call("EXPIRE", key, math.floor(timeWindow / 1000))
                    if count > limit then
                        return 0
                    else
                        return 1
                    end`;
    const count = await redisClient.eval(
      luaScript,
      1,
      key,
      limit,
      timeWindow,
      now,
    );
    if (count === 0) {
      return res.status(429).json({
        message: "Too many requests. Please try again later.",
      });
    }
    next();
  } catch (error) {
    console.error("Rate limit error", error);
    next();
  }
};

// ===== Fixed Window Implementation (Initial Version) =====
// Used INCR + EXPIRE
// Replaced due to boundary burst issue and multi-call overhead
// const rateLimiter = async(req,res,next)=>{
//     try{
//         const {ip} = req
//         const limit = 5;
//         const timeWindow = 60;
//         const key = `rate_limit:${ip}`
//         const current = await redisClient.incr(key)
//         if (current===1){
//             await redisClient.expire(key,timeWindow)
//         }
//         if(current>limit){
//             return res.status(429).json({
//                 message:"Too many requests. Please try again later."
//             })
//         }
//         next()
//     }
//     catch(err){
//         console.error("Rate limiter error",err);
//         next()
//     }
// }

export default rateLimiter;
