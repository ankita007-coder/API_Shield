// ===== Fixed Window Implementation (Initial Version) =====
// Used INCR + EXPIRE
// Replaced due to boundary burst issue and multi-call overhead
const fixedWindow = async ({ key, limit, timeWindow, redisClient }) => {
  const current = await redisClient.incr(key);
  if (current === 1) {
    await redisClient.expire(key, Math.floor(timeWindow/1000));
  }
  return current<=limit
};

export default fixedWindow