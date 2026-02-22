### This sliding approcach makes 4 round of request which create latency when the number of requests increase to avoid that we can go with lua scripting which is Accurate, Efficient, Atomic and Production-grade

```js
//basic sliding window
import redis from "../config/redis.js";

const rateLimiter = async (req, res, next) => {
  try {
    const ip = req.ip;

    const limit = 5;
    const window = 60; // seconds

    const key = `rate:ip:${ip}`;
    const now = Date.now();
    const windowStart = now - window * 1000;

    // Remove old requests
    await redis.zremrangebyscore(key, 0, windowStart);

    // Add current request
    await redis.zadd(key, now, now);

    // Count current requests in window
    const requestCount = await redis.zcard(key);

    // Set expiration so key doesn't stay forever
    await redis.expire(key, window);

    if (requestCount > limit) {
      return res.status(429).json({
        message: "Too many requests. Try again later.",
      });
    }

    next();
  } catch (error) {
    console.error("Sliding window error:", error);
    next();
  }
};

export default rateLimiter;
```