import mongoose from "mongoose";

const voyageSchema = new mongoose.Schema({

    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    origin:{type:String,required:true},
    destination:{type:String,required:true},

    distance:{type:Number},

    cargo:{type:Number, required:true},

    originPort:{type:String, required:true},

    destinationPort:{type:String, required:true},
    predictedETA:{type:Number, required:true},
    feedBackETA:{type:Number},

    predictedFuel:{type:Number, required:true},

    feedBackFuel:{type:Number},

    speed:{type:Number, required:true},

    weatherFactor:{type:Number, required: true},

    weather:{type:String,required:true},

    TrafficFactor:{type:Number,required:true},

    Traffic:{type:String,required:true},

    portPath:{type:[String], required:true},

    reqPath:{type:[String], required:true}

})

export const voyageModel = mongoose.model("Path",voyageSchema);