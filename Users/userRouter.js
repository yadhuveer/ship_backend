import express from "express"

export const userRouter = express.Router()

import {UserController} from "./userController.js";



import { jwtAuth } from "../Middleware/jwt.middleware.js";


const userController = new UserController();

userRouter.post("/signUp",[(req,res,next)=>{
    userController.SignUp(req,res,next);
}])


userRouter.post("/login",[(req,res,next)=>{


    userController.Signin(req,res,next);
},])

userRouter.get("/logout",[(req,res,next)=>{
    userController.Logout(req,res,next);
}])

userRouter.get("/test",[jwtAuth])