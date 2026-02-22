import mongoose from "mongoose";

const rateRuleSchema = new mongoose.Schema({
    target:{
        type:String,
        required: true,
        enum: ["ip","user"]
    },
    scope:{
        type:String,
        required:true,
        enum:["global","endpoint"]
    },
    identifier:{
        type:String,
        required:true
    },
    limit:{
        type:Number,
        required:true
    },
    timeWindow:{
        type:Number,//in seconds
        required:true
    },
    algorithm:{
        type:String,
        enum:["fixed_window","sliding_window","token_bucket"],
        default:"fixed_window"
    },
    active:{
        type:Boolean,
        default:true
    }
},
    {timestamps:true}
)

export default mongoose.model("RateRule",rateRuleSchema)