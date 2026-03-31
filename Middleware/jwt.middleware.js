import jwt from "jsonwebtoken"


export const jwtAuth = (req,res,next)=>{

    console.log("Its coming inside jwt auth");

    if(req.cookies.token){


        
        try{
            const token= req.cookies.token;

         
         const payload = jwt.verify(token,process.env.JWT_SECRET);
         req.userId=payload.userId;
         //res.status(200).json({"message":req.userId});
          next();

        }catch(err){
            console.log(err);

           return  res.status(401).json({message:"unauthorized"});
        }
         

    }else{

    
    console.log("Wrong is executed");
    return res.status(401).json({message:"unauthorized"});
    }
   


}


export const logInAuth = (req,res,next)=>{

    console.log("Hi");

    if(req.cookies.token){


        
        try{
            const token= req.cookies.token;
         
         const payload = jwt.verify(token,process.env.JWT_SECRET);
         req.userId=payload.userId;
         console.log("Sucess");
         return  res.status(200).json({authStatus:true});
         //res.status(200).json({"message":req.userId});
          //next();

        }catch(err){
            console.log("err is "+err);

            return res.status(200).json({authStatus:false});
        }
         

    }else{

    

    console.log("Its not correct");

    return res.status(200).json({authStatus:false});

    }

}