import express from "express"
const router=express.Router();
import {Login} from "../controllers/auth/login.js"
import { SignUp } from "../controllers/auth/signup.js";
import { isAuthenticate } from "../Middleware/isAuthenticated.js";
import addToQueue from "../utils/queue.js";
import { requestQueue } from '../utils/queue.js';

router.post("/signup",SignUp);
router.post("/login",Login);

router.post("/tasks", isAuthenticate, async (req, res) => {
    try {
      const id = req.user; // Assuming isAuthenticate middleware sets req.user
      await addToQueue(id, req.body.task);
      res.json({ message: 'Task added to queue for processing', userId: id });
    } catch (err) {
      console.error('Failed to add task to queue:', err);
      res.status(500).json({ error: 'Failed to add task' });
    }
  });
  
  
  
  


export default  router;

// router.post("/login",async(req,res)=>{
//         const {username,password}=req.body;
        
// })