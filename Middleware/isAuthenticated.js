
import jwt from "jsonwebtoken";

export const isAuthenticate= async(req,res,next)=>{
const token=req.cookies?.token;
if(token){
    const decodedvalue=jwt.verify(token,process.env.JWT_SECRET);
    req.user=decodedvalue?.id;
    await next();
}else{
    res.send("You are not authenticated");
}
}