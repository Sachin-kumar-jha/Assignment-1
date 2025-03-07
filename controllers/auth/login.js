
import {prisma} from "../../utils/prisma.js"
import jwt from "jsonwebtoken"
export const Login= async(req,res)=>{
    const {email,password}=req.body;
try {
  const user=await prisma.user.findUnique({
    where:{
        email:email,
        password:password
    }
});
const userId=user.id;
if(!user) return res.send("User doesn't exist!");
    const token=jwt.sign({id:user.id} ,process.env.JWT_SECRET)
        res.cookie("token",token,{
            secure: true,             
        maxAge: 2 * 60 * 60 * 1000,
        sameSite: 'Strict'  
        });
       return  res.status(200).send({token});
//         res.status(201).send({
//             message:"User authenticated"
//  });
} catch (error) {
  res.status(401).json({ message: 'Invalid token', error: error.message });
}
}