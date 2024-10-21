const {validationResult} =require('express-validator');
const Course = require('../models/course.model');
const httpStatusText = require('../utils/httpStatusText');
const messages = require('../utils/messages');
const asyncWrapper = require('../middleware/asyncWrapper');
const appError=require('../utils/AppError');

const getAllCourses=async (req,res)=>{
 
    const q=req.query;
    const l=q.limit || 3;
    const p=q.page || 1;



    const courses=await Course.find(
        {},
        {
            "__v":false
        }
    ).limit(l).skip((p-1)*l);



    res.json({
        status:httpStatusText.S,
        data:{
            courses
        }
    });
}

const getCourse =asyncWrapper(
     async (req,res,next)=>{
            const course=await Course.findById(req.params.courseId); 
            if (!course){
                err=appError.create('not found course',404,httpStatusText.F);
                return next(err);
            }
        
            res.json({
                status:httpStatusText.S,
                data:{
                    course
                }
            });
    }
)

const addCourse = asyncWrapper(
    async (req,res,next)=>{
        const errors=validationResult(req);

        if(!errors.isEmpty()){
            err=appError.create('not the right schema',401,httpStatusText.F);
            return next(err);
        }
        
        const newCourse = new Course(req.body);

        await newCourse.save();


        res.status(201).json({
            status:httpStatusText.S,
            data:newCourse
        });
    }
)

const updateCourse = asyncWrapper(
    async (req,res)=>{
        const courseId = req.params.courseId;
        const updatedCourse = await Course.updateOne(
            {_id: courseId},
            {$set:{...req.body}}
        );
        return res.status(200).json({
            status:httpStatusText.S,
            data:updatedCourse
        });
    }   
)
const deleteCourse = asyncWrapper(
    async (req,res)=>{
            const data=await Course.deleteOne({_id:req.params.courseId});
            return res.status(200).json({
                status:httpStatusText.S,
                data:null
            }) 
    }
)
module.exports={
    getAllCourses,
    getCourse,
    updateCourse,
    deleteCourse,
    addCourse
}