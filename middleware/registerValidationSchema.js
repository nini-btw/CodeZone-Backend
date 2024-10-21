const { body } = require('express-validator');

const registerValidationSchema =()=>{
    return[
            body('firstName')
                .notEmpty()
                .isLength({min:2})
                .withMessage("digit must be > 1"),
            body('lastName')
                .notEmpty()
                .isLength({min:2})
                .withMessage("digit must be > 1"),
            body('password')
                .notEmpty()
                .isLength({min:6})
                .withMessage("digit must be > 5"),
            body('email')
                .notEmpty()
                .isLength({min:5})
                .withMessage("digit must be > 4"),
        ]
}

module.exports={
    registerValidationSchema
}