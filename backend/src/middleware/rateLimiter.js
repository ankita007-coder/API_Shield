import redisClient from "../config/redis.js";
import resolveRule from "../services/ruleResolver.js";
import { getStrategy } from "../strategies/index.js";


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
    
    const strategy = getStrategy(rule.algorithm)
    const allowed = await strategy({key,limit,timeWindow,redisClient})
    if (!allowed) {
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
