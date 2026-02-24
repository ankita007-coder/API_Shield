import redisClient from "../config/redis.js";

export const getViolations = async (req, res) => {
  try {
    const keys = await redisClient.keys(`violation:*`);
    const result = {
      ip: {},
      user: {},
    };
    for (const key of keys) {
      const count = await redisClient.get(key);
      if (key.startsWith("violation:ip:")) {
        let ip = req.ip;

        if (ip.startsWith("::ffff:")) {
          ip = ip.replace("::ffff:", "");
        }
        result["ip"][ip] = Number(count);
      } else {
        const userId = key.split(":")[2];
        result["user"][userId] = Number(count);
      }
    }
    return res.json(result);
  } catch (error) {
    res.status(500).json({ message: `${error.message}` });
  }
};
