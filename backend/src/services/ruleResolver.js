import { getRuleFromCache, setRuleInCache } from "../cache/ruleCache.js";
import RateRule from "../models/RateRule.js";

export default async function resolveRule(req) {
  const endpoint = req.baseUrl + req.path;
  const userId = req.user ? req.user.id : null;
  const { ip } = req;

  const cachedKey = `${endpoint}:${userId}||${ip}`;
  const cached = getRuleFromCache(cachedKey);
  if (cached) return cached;

  let rule = null;

  if (userId) {
    //1. endpoint + user
    rule = await RateRule.findOne({
      target: "user",
      scope: "endpoint",
      identifier: endpoint,
      active: true,
    });
    //2. endpoint + ip
    if (!rule) {
        rule = await RateRule.findOne({
        target: "ip",
        scope: "endpoint",
        identifier: endpoint,
        active: true,
      });
    }
    //3. global user
    if(!rule){
        rule = await RateRule.findOne({
            target:"user",
            scope:"global",
            identifier:"*",
            active: true
        })
    }
    //4. global ip
    if(!rule){
        rule = await RateRule.findOne({
            target:"ip",
            scope:"global",
            identifier:"*",
            active: true
        })
    }
  }
  else{
    //    1. endpoint + ip
    rule = await RateRule.findOne({
        target:"ip",
        scope:"endpoint",
        identifier:endpoint,
        active: true
    })
    //    2. global ip
    if(!rule){
        rule = await RateRule.findOne({
        target:"ip",
        scope:"global",
        identifier:"*",
        active: true
        })
    }
  }

  if(rule){
    setRuleInCache(cachedKey,rule)
  }
  return rule;
}


