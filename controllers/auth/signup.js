import jwt from "jsonwebtoken"
import {prisma} from "../../utils/prisma.js"
export const SignUp = async(req,res)=>{
    const {username,email,password}=req.body;
    const user=await prisma.user.create({
        data:{
            name:username || "",
            email:email || "",
            password:password || ""
        }
    });
    const token=jwt.sign({id:user.id} ,process.env.JWT_SECRET)
    res.cookie("token",token,{
        secure: true,             
    maxAge: 2 * 60 * 60 * 1000,
    sameSite: 'Strict'  
    });
    res.status(200).send({
        message:"Cookie set successfully"
    });
}