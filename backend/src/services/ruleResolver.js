import { getRuleFromCache, setRuleInCache } from "../cache/ruleCache.js"
import RateRule from "../models/RateRule.js"

export default async function resolveRule(req){
    const endpoint = req.baseUrl + req.path
    const cached = getRuleFromCache(endpoint)
    if(cached) return cached
    const rule = await RateRule.findOne({
        type:"ip",
        identifier:endpoint,
        active:true
    })
    if(rule){
        setRuleInCache(endpoint,rule)
    }
    return rule
} 