import {UserRepo} from "./userRepository.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

export class UserController{
    constructor(){

        
        this.userRepo = new UserRepo();
    
    }

    async SignUp(req,res,next){

        try{
             const {firstName,lastName,email,password}=req.body;
             const newPassword = await bcrypt.hash(password,10);
             const result = await this.userRepo.signUp({firstName:firstName,lastName:lastName,email:email,password:newPassword,role:"user"});
             res.status(201).json({success:true,message:"User created successfully"});
        
    }catch(err){
        if (err.code === 11000 && err.keyPattern?.email) {
      
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
       
    }

       
    }


    async Signin(req,res,next){
        try{
            const {email,password}=req.body;

            
            //const hashedPassword = await  bcrypt.hash(password,10);
            //console.log(hashedPassword);

            const result = await  this.userRepo.signIn(email);


            if(! result){
                return res.status(403).json({"message":"user credentials are incorrect"});
            }

            
                const pasCheck = await bcrypt.compare(password,result.password);

            if(pasCheck){
                const token = jwt.sign({userId:result._id},process.env.JWT_SECRET,{ expiresIn:'9h',})
                res.cookie('token', token, { httpOnly: true,secure: false,sameSite: "lax", maxAge: 30 * 60 * 1000 });
                return res.status(200).json({message:"LogIn sucessfull"});
            }else{
                return res.status(403).json({message:"User doesn't exsixt"});
            }
               
               
        }catch(err){
            console.log(err);
            return res.status(400).json({"message":err.message});
            
        }
    }


    async Logout(req,res,next){
        try{
              res.clearCookie('token', { 
            httpOnly: true, 
            secure: false, 
            sameSite: 'lax' 
        });
        
             console.log("token is cleared")
              return res.status(200).json({ message: "Logout successful" });

        }catch(err){
            console.log(err);
            return res.status(400).json({"message":err.message});
        }
    }

    


}