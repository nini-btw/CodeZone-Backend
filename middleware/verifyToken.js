const jwt=require('jsonwebtoken');
const appError=require('../utils/AppError');
const httpStatusText=require('../utils/httpStatusText')
const verifyToken=(req,res,next)=>{
    const header = req.headers['Authorization'] || req.headers['authorization'];
    if(!header){
        const error=appError.create('Token required',400,httpStatusText.E);
        return next(error)
    }

    token=header.split(' ')[1];
    try{
        const decodedToken=jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.currentUser=decodedToken; 
        next();
    }catch(err){
        const error=appError.create('Invalid Token',400,httpStatusText.F);
        return next(error)
    }
}

module.exports =verifyToken;