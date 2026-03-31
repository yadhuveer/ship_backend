import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    firstName:{type:String,required:[true,"First name is required"],trim:true,minlength:[2,"First name must be atleast 2 characters"],
        maxlength:[50,"First name must be atmost 50 characters"],
        match:[/^[A-Za-z][A-Za-z\s'-]*$/,"First name may contain letters, spaces, apostrophes, and hyphens only",]},
    lastName:{type:String,required:[true,"Last name is required"],trim:true,minlength:[1,"Last name must me atleast 1 character"],

        maxlength:[50,"last name must be atmost 50 characters"],match: [/^[A-Za-z][A-Za-z\s'-]*$/,"Last name may contain letters, spaces, apostrophes, and hyphens only",
      ],
    },
    email:{type:String,required:[true,"Email is required"],unique:true,lowercase:true,trim:true,
        validate:{validator:(v)=>validator.isEmail(v),message:"please prrovide a valid email address"}},
    password:{type:String,required:[true,"password is required"],minlength:[8,"Password must be atleast 8 characters"],
    },
    role:{type:String,enum:["user","admin"],default: "user"},

    


})


export const userModel = mongoose.model('user',userSchema);