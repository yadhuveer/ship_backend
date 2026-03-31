import express from "express";

import {VoyageController} from "./voyageController.js";

import {jwtAuth} from "../Middleware/jwt.middleware.js"

export const voyageRouter = express.Router();

const voyageInstance = new VoyageController();
import {Authorize} from "../Middleware/AuthorizeMiddleware.js";

import {voyageLimiter} from "../Middleware/RateLimitter.js";


voyageRouter.post("/voyagePlanner",[jwtAuth,voyageLimiter,(req,res,next)=>{
    voyageInstance.getRoutes(req,res,next);

}])

voyageRouter.get("/history",[jwtAuth,(req,res,next)=>{
    voyageInstance.getHistroy(req,res,next);

}])


voyageRouter.post("/feedback",[jwtAuth,(req,res,next)=>{
    voyageInstance.provideFeedback(req,res,next);
}])


voyageRouter.get("/allData",[jwtAuth,(req,res,next)=>{
    voyageInstance.allData(req,res,next);

}])


voyageRouter.post("/reTrain",[jwtAuth,Authorize,(req,res,next)=>{
    voyageInstance.retrainModel(req,res,next);
}])


