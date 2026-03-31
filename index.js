import express from "express";
import {connectToDb} from "./Connection/mongoose.connection.js";
import cors from "cors";

import {voyageRouter} from "./voyagePlanning/voyageRouter.js";

import dotenv from "dotenv";

dotenv.config();
import {logInAuth} from "./Middleware/jwt.middleware.js";
import {userRouter} from "./Users/userRouter.js";
import cookieParser from "cookie-parser"; 
import rateLimit from "express-rate-limit";


const server = express();


server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({extended:true}));

/*export const voyageLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, 
  max: 10,                       
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    error: "You have exceeded the daily limit of 10 requests for voyage API."
  }
});*/

server.use(cors({
  origin:["http://localhost:3000", "https://13.233.141.243", "https://shipping-ui-ekiv.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true                
}));


server.use("/user",userRouter);


server.use("/voyage",voyageRouter);


server.get("/user/loginAuth",logInAuth);

server.use((req, res, next) => {
  console.log("Hit:", req.method, req.url);
  next();
});


server.listen(process.env.PORT,()=>{

    connectToDb();
})

