const router = require("express").Router();
const {body, validationResult} = require("express-validator");

const JWT  = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

const User = require("../models/user");
const validation = require("../handlers/validation");
const userController = require("../controllers/user");
const tokenHandler = require("../handlers/tokenHandler");

router.post("/register",
    body("username")
    .isLength({min: 8})
    .withMessage("ユーザー名は８文字以上である必要があります。"),
body("password")
.isLength({min:8})
.withMessage("パスワードは８文字以上である必要があります"),
body("confirmPassword")
.isLength({min:8})
.withMessage("確認用パスワードは８文字以上である必要があります"),
body("username").custom((value)=>{
    return User.findOne({username: value}).then((user)=>{
        if(user){
            return Promise.reject("このユーザーはすでに使われています");
        }
    });
}),
validation.validate,
userController.register
);

//ログイン用のAPI
router.post("/login",
    body("username").isLength({min:8}).withMessage("ユーザー名は８文字以上である必要があります。"),
    body("password").isLength({min:8}).withMessage("パスワードは８文字以上である必要があります"),
    validation.validate,
userController.login
);

//JWT認証API
router.post("/verify-token",tokenHandler.verifyToken,(req, res)=>{
return res.status(200).json({user:req.user});
});

module.exports = router;
