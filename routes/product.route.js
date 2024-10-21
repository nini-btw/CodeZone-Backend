const express =require('express');
const router=express.Router();
const {validationSchema} =require('../middleware/validationSchema')
const productController=require('../controllers/product.controller');
const verifyToken=require('../middleware/verifyToken');

router.route('/')
    .get(productController.getAllProducts)
    .post(productController.addProduct)
router.route('/:productId')
    .get(productController.getProduct) 
    .delete(productController.deleteProduct)
    .patch(productController.updateProduct)

module.exports=router;