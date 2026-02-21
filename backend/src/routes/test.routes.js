import express from "express"
import RateRule from "../models/RateRule.js"


const router = express.Router()

router.get("/ping",(req,res)=>{
    res.json({"message":"pong"})
})

router.get("/rate-rule",async(req,res)=>{
    const rule = await RateRule.create({
        type:"ip",
        identifier:"/ping",
        limit:5,
        timeWindow:60,
        algorithm:"fixed_window"
    })
    res.json(rule)
})
export default router