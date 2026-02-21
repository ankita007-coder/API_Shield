import redisClient from "../config/redis.js";

const rateLimiter = async(req,res,next)=>{
    try{
        const {ip} = req
        const limit = 5;
        const timeWindow = 60;
        const key = `rate_limit:${ip}`
        const current = await redisClient.incr(key)
        if (current===1){
            await redisClient.expire(key,timeWindow)
        }
        if(current>limit){
            return res.status(429).json({
                message:"Too many requests. Please try again later."
            })
        }
        next()
    }
    catch(err){
        console.error("Rate limiter error",err);
        next()
    }
}

export default rateLimiter