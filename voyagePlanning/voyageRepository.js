import mongoose from "mongoose";

import {voyageModel} from "./voyageSchema.js";

import { ObjectId } from 'mongodb';

export class VoyageRepository{

    async addData(data){

        const result = new voyageModel(data);
        const newResult = await result.save();

        
        return newResult;



    }

    async getHistroy(id){
        try{
            console.log("id is "+id);
            const historyData = await voyageModel.find({userId:new ObjectId(id)});
            console.log(historyData);

            return historyData;

        }catch(err){
            throw err;
        }
    
    }

    async feedBack(feedBackETA,feedBackFuel,id){



        try{

            
            const feedBackdata = await voyageModel.find({_id:new ObjectId(id)});

            if(feedBackdata){
                const feedBackResult = await voyageModel.updateOne({_id:new ObjectId(id)},{$set:{feedBackETA:feedBackETA,feedBackFuel:feedBackFuel}});
                
                return feedBackResult;

            }else{
                throw err("no data exsist for given id");
            }

        }catch(err){
            throw err;
        }
    }


    async getAllPath(pageNo,pageSize){

        try{
             const page = parseInt(pageNo) 
             const size = parseInt(pageSize) 
             console.log("size is "+size)
            const allPaths = await voyageModel.find().skip((page-1)*size).limit(size);
            return allPaths;

        }catch(err){
            throw err;
        }
    }

    async getRetrainData(idArray){
        try{
            console.log("id array is "+idArray);
            const reTrainData = await voyageModel.find({_id:{$in:idArray}}).select("cargo distance weatherFactor speed TrafficFactor predictedETA predictedFuel");
            return reTrainData;

        }catch(err){
            throw err;
        }
    }

    async getCount(){

        try{
            const count = await voyageModel.find().countDocuments();
            return count;

        }catch(err){
            throw err;
        }

    }





}