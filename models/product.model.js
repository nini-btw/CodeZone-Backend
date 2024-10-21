const mongoose=require('mongoose');
const validator=require('validator');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:true
    }
})


module.exports= mongoose.model('Product',productSchema);
