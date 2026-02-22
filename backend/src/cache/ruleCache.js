
const ruleCache = new Map()

const ruleTTL = 5*60*1000

export const getRuleFromCache = (key)=>{
    const cached = ruleCache.get(key)
    if(!cached){
        return null
    }
    const {timestamp,rule}=cached
    if(Date.now()-timestamp>ruleTTL){
        ruleCache.delete(key)
        return null
    }
    return rule
}

export const setRuleInCache = (key,rule)=>{
    ruleCache.set(key,{
        timestamp:Date.now(),
        rule
    })

}

export const clearCache = ()=>{
    ruleCache.clear()
}