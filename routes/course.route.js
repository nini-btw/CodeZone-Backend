const express =require('express');
const router=express.Router();
const {body} =require('express-validator');
const {validationSchema} =require('../middleware/validationSchema');
const courseController=require('../controllers/course.controller');
const tokenValidation=require('../middleware/verifyToken')
const userRoles = require('../utils/userRoles');
const allowedTo = require('../middleware/allowedTo');


router.route('/')
    .get(courseController.getAllCourses)
    .post(tokenValidation,allowedTo(userRoles.M),validationSchema(),courseController.addCourse)
router.route('/:courseId')
    .get(tokenValidation,allowedTo(userRoles.A),courseController.getCourse)
    .patch(courseController.updateCourse)
    .delete(courseController.deleteCourse)

module.exports=router;