const {validationResult} =require('express-validator');
const Product = require('../models/Product.model');
const httpStatusText = require('../utils/httpStatusText');
const messages = require('../utils/messages');
const asyncWrapper = require('../middleware/asyncWrapper');
const appError=require('../utils/AppError');

const getAllProducts=async (req,res)=>{

    const products=await Product.find(
        {},
        {
            "__v":false
        }
    );

    res.json({
        status:httpStatusText.S,
        data:{
            products
        }
    });
}


const getProduct =asyncWrapper(
    async (req,res,next)=>{
           const product=await Product.findById(req.params.productId); 
           if (!product){
               err=appError.create('not found Product',404,httpStatusText.F);
               return next(err);
           }

           res.json({
               status:httpStatusText.S,
               data:{
                   product
               }
           });
   }
)

const addProduct =async(req,res)=>{
    const newProduct = new Product(req.body);

    await newProduct.save();

    res.status(201).json({
        status:httpStatusText.S,
        data:newProduct
    });
}

const deleteProduct =asyncWrapper(
    async(req,res)=>{
        const data = await Product.deleteOne({_id:req.params.productId});
        return res.status(200).json({
            status:httpStatusText.S,
            data:null,  
            msg:"Deleted"
        }) 
    }
)

const updateProduct = asyncWrapper(
    async(req,res)=>{
        const productId = req.params.productId;
        const updatedProduct = await Product.updateOne(
            {_id: productId},
            {$set:{...req.body}}
        );

        return res.status(200).json({
            status:httpStatusText.S,
            data:updatedProduct
        });
    }
)
    
module.exports={
    getAllProducts,
    addProduct,
    deleteProduct,
    updateProduct,
    getProduct
}