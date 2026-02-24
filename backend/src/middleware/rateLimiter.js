import redisClient from "../config/redis.js";
import resolveRule from "../services/ruleResolver.js";
import { getStrategy } from "../strategies/index.js";

const DEFAULT_LIMIT=5
const DEFAULT_TIME_WINDOW=60
const rateLimiter = async (req, res, next) => {
  try {
    let rule = await resolveRule(req);
    
    if (!rule) {
      rule = {
        target: req?.user? "user":"ip",
        scope:'global',
        identifier:'*',
        limit:DEFAULT_LIMIT,
        timeWindow:DEFAULT_TIME_WINDOW,
        algorithm:"sliding_window"
      }
    }
    console.log(rule)
    const limit = rule.limit;
    const timeWindow = rule.timeWindow * 1000;
    let key;

    if (rule.target === "user" && req.user?.id) {
      key = `rate:${rule.identifier}:user:${req.user.id}`;
    } else {
      
      key = `rate:${rule.identifier}:ip:${req.ip}`;
    }
    
    const strategy = getStrategy(rule.algorithm)
    const allowed = await strategy({key,limit,timeWindow,redisClient})
    if (!allowed) {
      const violationKey = req.user? `violation:user:${req.user.id}`:`violation:ip:${req.ip}`
      await redisClient.incr(violationKey)
      await redisClient.exists(violationKey,86400);
      return res.status(429).json({
        message: `Too many requests. Please try again later.${rule.algorithm}`,
      });
    }
    next();
  } catch (error) {
    console.error("Rate limit error", error);
    next();
  }
};


export default rateLimiter;
