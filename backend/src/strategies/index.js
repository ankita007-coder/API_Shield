
import fixedWindow from "./fixedWindow.js"
import slidingWindow from "./slidingWindow.js"

const strategyMap = {
    fixed_window:fixedWindow,
    sliding_window:slidingWindow
}
export const  getStrategy=(algorithm)=>{
    return strategyMap[algorithm]
}