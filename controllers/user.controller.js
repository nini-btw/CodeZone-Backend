const {validationResult} =require('express-validator');
const httpStatusText = require('../utils/httpStatusText');
const asyncWrapper = require('../middleware/asyncWrapper');
const User = require('../models/user.model');
const bcrypt=require('bcryptjs');
const appError=require('../utils/AppError');
const jwt=require('jsonwebtoken');
const jwtGenerator=require('../utils/jwtGenerator');



const getAllUsers=asyncWrapper(
    async (req,res,next)=>{
        const users= await User.find(
        {},
        {
            "__v":false,
            "password":false
        }
        );
        res.json({
            status:httpStatusText.S,
            data:{
                users
            }
        })
    }
);

const register=asyncWrapper(
    async(req,res,next)=>{
        const {firstName,lastName,email,password,role}=req.body;
        const oldUser = await User.findOne({email:email});

        const file=req.file;
        console.log(file);

        if(oldUser){
            err=appError.create('User Already Exist',404,httpStatusText.F);
            return next(err);
        }

        //password hashing
        const hashPassword=await bcrypt.hash(password,10)

        
        newUser=new User({
            firstName,
            lastName,
            email,
            password:hashPassword,
            role,
            avatar:file.filename
        });


        const token=await jwtGenerator({
            email:newUser.email,
            id:newUser._id
        })
        newUser.token=token;




        await newUser.save();

        res.json({
            status:httpStatusText.S,
            data:newUser
        })
    }
);

const login=asyncWrapper(
    async(req,res,next)=>{
        const {email,password} = req.body;
        
        if(!email && !password){
            err=appError.create('email and password required',404,httpStatusText.F);
            return next(err);
        }

        const user= await User.findOne({email:email});

        if(!user){
            err=appError.create('User Not Found',404,httpStatusText.F);
            return next(err);
        }

        
        
        const matchedPassword =await bcrypt.compare(password , user.password);
        
        if(user && matchedPassword){
            const token=await jwtGenerator({
                email:user.email,
                id:user._id,
                role:user.role
            })
            return res.json({
                status:httpStatusText.S,
                data:{
                    token
                }
            })
        }
        else{
            err=appError.create('Something Happen',404,httpStatusText.F);
            return next(err);
        }

    }
);


module.exports={
    getAllUsers,
    login,
    register
}