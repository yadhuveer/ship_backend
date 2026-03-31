import { userModel } from "./userSchema.js";

export class UserRepo{

   async signUp(reqdata){
    try{
        const data = new userModel(reqdata);

        const savedData = await data.save();
        return savedData;
    
    }catch(err){
        throw err;

    }
    }



    async signIn(email){
        try{
            const userData = await userModel.findOne({email:email});
            return userData;
        }catch(err){
            throw err;
        }
    }



}