const express = require('express');
const jwt  = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../models/Users');

const router = express.Router();

router.post('/register', async(req,res)=>{
    
    
    try{
        const {username,password} = req.body;
        const user = await UserModel.findOne({username});

        if(user){
            return res.json({message:"User Already Have"});
        }

        const hashPassword = await bcrypt.hash(password,10);

        const newUser = new UserModel({username, password:hashPassword});
        await newUser.save();


        res.json({message:"User Registeration Successfull"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
    


    
});


router.post('/login', async (req,res)=>{

    try{
        const {username,password} = req.body;
        const user = await UserModel.findOne({username});

        if(!user){
            return res.json({message:"User Doesn't Exist!"})
        }

        const isPasswordValid = await bcrypt.compare(password,user.password);

        if(!isPasswordValid){
            return res.json({message:"Username or Password Is Incorrect"})
        }

        const token = jwt.sign({id:user._id},"secrect");
        res.json({token,userID:user._id});

    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
})




const verifyToken = (req,res,next) =>{
    const token = req.headers.authorization;
    if(token){            
        jwt.verify(token,"secrect",(err) =>{
           if(err) return res.sendStatus(403);
           next();
        });
    }else{
       res.sendStatus(401); 
    }
}

module.exports = {router,verifyToken};