
import fixedWindow from "./fixedWindow.js"
import slidingWindow from "./slidingWindow.js"
import tokenBucket from "./tokenBucket.js"

const strategyMap = {
    fixed_window:fixedWindow,
    sliding_window:slidingWindow,
    token_bucket:tokenBucket
}
export const  getStrategy=(algorithm)=>{
    return strategyMap[algorithm]
}