//Creating The Server
require('dotenv').config();
const httpStatusText=require('./utils/httpStatusText')
const messages=require('./utils/messages')
const express= require('express');
const cors=require('cors');
const app=express();
const path=require('node:path'); 

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//Connecting to The DataBase
const mongoose=require('mongoose');
const url=process.env.MONGO_URL;

mongoose.connect(url)
.then(()=>{
    console.log("MongoDb connect Success");
});


app.use(cors());
app.use(express.json());

  

//Courses Routing
const courseRouter=require('./routes/course.route');
app.use('/api/courses',courseRouter);

//Users Routing 
const userRouter=require('./routes/user.route');
app.use('/api/users',userRouter);

//Products Routing
const productRouter=require('./routes/product.route');
app.use('/api/products',productRouter);

//global middleware for not found router
app.all('*',(req,res,next)=>{
    res.status(404).json({
        status:httpStatusText.E,
        data:null,
        message:messages.EM
    })
})


//global error handler
app.use((error,req,res,next)=>{
    res.status(error.statusCode || 500 ).json({
        status: error.statusText || httpStatusText.E,
        message:error.message,
        code: error.statusCode || 500,
        data:null
    })
});

//Connecting To the Server
app.listen(3000,()=>{
    console.log('listening on PORT 3000');
})
