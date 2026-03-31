import {userModel}  from "../Users/userSchema.js";

export const Authorize = async (req,res,next)=>{

    try{
        console.log("Its coming inside Authorize")
        const UserCheck = await userModel.findOne({_id:req.userId});


    if (!UserCheck) {
        return res.status(404).json({ message: "User not found" });
    }

    if(UserCheck.role!="admin"){
        return res.status(401).json({message:"please login as ADMIN"});
    }

    next();
    

    }catch(err){
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
    


}