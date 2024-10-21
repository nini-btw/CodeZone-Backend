const express =require('express');
const router=express.Router();
const {validationSchema} =require('../middleware/validationSchema')
const userController=require('../controllers/user.controller');
const verifyToken=require('../middleware/verifyToken');
const multer  = require('multer');
const AppError = require('../utils/AppError');

const diskStorage= multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,'uploads');
      },
      filename: function (req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        const fileName = `user-${Date.now()}.${ext}`;
        cb(null,fileName);
      }
    
})

const fileFilter = (req,file,cb)=>{
    const type=file.mimetype.split('/')[0];
    if(type=='image'){
        return cb(null,true)
    }
    else{
        return cb(AppError.create('File type should be an image',400),false)
    }
}

const upload = multer({
    storage:  diskStorage,
    fileFilter
})


router.route('/')
    .get(verifyToken,userController.getAllUsers)
router.route('/register')
    .post(upload.single('avatar'),userController.register)
router.route('/login')
    .post(userController.login);

module.exports=router; 