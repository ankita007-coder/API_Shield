//we use sorted sets here
const slidingWindow = async ({key,limit,timeWindow,redisClient}) => {
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
  return Boolean(count)
};

export default slidingWindow