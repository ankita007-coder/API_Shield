// we use redis hashmap

export default async function tokenBucket ({key,limit, timeWindow, redisClient}){
    const now = Date.now()
    const refillRate = limit/timeWindow

    const bucket = await redisClient.hgetall(key)

    let tokens = parseFloat(bucket.tokens || limit)
    let lastRefill =  parseInt(bucket.lastRefill || now)
    const tokenRefill = parseInt(refillRate*(now-lastRefill))
    tokens = Math.min(limit,tokens+tokenRefill)
    if(tokens<1){
        return false
    }
    tokens-=1

    await redisClient.hmset(key,{
        tokens,
        lastRefill:now
    })
    await redisClient.expire(key,Math.floor(timeWindow/1000))
    return true
}