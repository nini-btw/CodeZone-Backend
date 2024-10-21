const { body } = require('express-validator');

const validationSchema =()=>{
    return[
            body('name')
                .notEmpty()
                .isLength({min:3})
                .withMessage("digit must be > 2"),
            body('price')
                .notEmpty()
                .withMessage("Price is required")
        ]
}

module.exports={
    validationSchema
}