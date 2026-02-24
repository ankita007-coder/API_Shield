import Redis from "ioredis"

const client = new Redis({
    host:process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
})

client.on("connect",()=>{
    console.log("Redis is connected")
})

client.on("error",(err)=>{
    console.error("Redis error",err);
})

export default client