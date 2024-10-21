const { body } = require('express-validator');

const userValidationSchema =()=>{
    return[
            firstName('name')
                .notEmpty()
                .isLength({min:3})
                .withMessage("digit must be > 2"),
            lastName('price')
                .notEmpty()
                .withMessage("Price is required")
            ('name')
                .notEmpty()
                .isLength({min:3})
                .withMessage("digit must be > 2"),
            lastName('price')
                .notEmpty()
                .withMessage("Price is required")
        ]
}

module.exports={
    userValidationSchema
}