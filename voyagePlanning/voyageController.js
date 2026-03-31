import {WeatherDecoding} from "./weatherAndTrafficDecoding.js";

import {TrafficDecoding} from "./weatherAndTrafficDecoding.js";

import {VoyageModel} from "./voyageModel.js";

import {VoyageRepository} from "./voyageRepository.js";

import { ObjectId } from 'mongodb';



export class VoyageController{

    
    
    constructor(){
        this.voyageRepository = new VoyageRepository(); 
    
    }

    async getRoutes(req,res,next){

        try{
            console.log("cargo is "+req.body.cargo);
            console.log("source is "+req.body.source);
            console.log("destination is "+req.body.destination);
            const reqParameters = {cargo:req.body.cargo,origin_id:req.body.source,destination_id:req.body.destination}

         
         const resData =   await fetch(`${process.env.fastApiURL}/plan-voyage`,{

                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(reqParameters)
            })


            const data = await resData.json();
            //console.log("Data is "+data);
            //console.log(data.origin);
            //console.log(data.destination);
            //console.log(data.reqPath);

            const weather = WeatherDecoding(data.reqPath.weatherNum);
            const traffic = TrafficDecoding(data.reqPath.trafficNum);

            const voyageInstance = new VoyageModel(new ObjectId(req.userId),data.origin,data.destination,data.reqPath.distance_km,data.cargo,data.originPort,data.destinationPort,data.reqPath.ETA,"",data.reqPath.Fuel,"",data.reqPath.Speed,data.reqPath.weatherNum,weather,data.reqPath.trafficNum,traffic,data.reqPath.path_ids,data.reqPath.path_names);
            const result = await this.voyageRepository.addData(voyageInstance);
            console.log("result is "+result);

            return res.status(200).json({"message":result});

        }catch(err){

            
            console.log(err);
        }
    }

    async getHistroy(req,res,next){

        try{
            const histroyData = await this.voyageRepository.getHistroy(req.userId); 

            if(histroyData){
                return res.status(200).json({message:histroyData});
            }else{
                return res.status(401).json({message:"server error"});
            }

        }catch(err){
            return res.status(401).json({message:"server error"});
        }
    }

    async provideFeedback(req,res,next){
        try{

            const {feedBackETA,feedBackFuel,id} = req.body;
            const feedbackData = await this.voyageRepository.feedBack(feedBackETA,feedBackFuel,id);

            if(feedbackData){
                return res.status(200).json({message:"sucessfully submitted feedback"});
            }else{
                return res.status(400).json({message:"server error"});
            }

        }catch(err){
            console.log(err.message);
            return res.status(400).json({message:"server error"});
        }
    }

    async allData(req,res,next){
        try{
            console.log("Its inside all data")
            const pageNo=req.query.page;
            const pageSize =req.query.size;
            console.log("here size is "+pageSize); 
             console.log("here page is "+pageNo); 
            const allPath = await this.voyageRepository.getAllPath(pageNo,pageSize);
            //console.log(allPath);
            const total = await this.voyageRepository.getCount();
            return res.status(200).json({message:allPath,total:total});

        }catch(err){
            console.log("err is "+err);
            return res.status(400).json({message:"server srror"});
            
        }
    }


    async retrainModel(req,res,next){
        try{
            const getReTrainData = await this.voyageRepository.getRetrainData(req.body.ids);

            console.log(getReTrainData);

            if(!getReTrainData){
                return res.status(400).json({message:"server error"})
            }

            const res1 = await fetch(`${process.env.fastApiURL}/retrainData`,{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ trainData: getReTrainData })
            })

             if (!res1.ok) {
                const errData = await res1.json();
                throw new Error(errData.detail);
            }

            const dataRes = await res1.json();
            console.log("Success:", dataRes);

            return res.status(200).json({message:"Sucessfully retrained model"});

        }catch(err){
            console.error("Caught error:", err.message);
            return res.status(400).json({message:"server error"})


        
        }
    }

   


}