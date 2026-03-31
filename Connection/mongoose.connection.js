import mongoose from "mongoose"

export const connectToDb = async ()=>{
    console.log(process.env.MongoUrl);
    await mongoose.connect(process.env.MongoUrl,{useUnifiedTopology:true,useNewURlParser:true});

    console.log("sucessfully connect to mongodb");

}