const JWT = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const User = require("../models/user");

exports.register = async (req, res) =>{
    //パスワードの受け取り
    const password = req.body.password;

    try{
        //パスワードの暗号化
        req.body.password = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY);
        //ユーザー新規作成
        const user = await User.create(req.body);
        //JWTの発行
        const token = JWT.sign({id: user._id},process.env.TOKEN_SECRET_KEY,{
            expiresIn: "24h",
        });
        return res.status(200).json({user, token});
     } catch(err){
        return res.status(500).json(err);
     }
    };

    exports.login = async(req, res) =>{
        const{username, password} = req.body;

        try{

            //DBからユーザーが存在するか探してくる
            const user = await User.findOne({username: username})
            if(!user){
                res.status(401).json({
                    errors:{
                        param:"username",
                        message:"ユーザー名が無効です"
                    }
                })
            }
            //パスワードがあっているか照合する。
            const descrytedPassword = CryptoJS.AES.decrypt(
                user.password,
                process.env.SECRET_KEY
            ).toString(CryptoJS.enc.Utf8);

            if(descrytedPassword !== password){
                res.status(401).json({
                    param:"password",
                    message:"パスワードが無効です"
                })
            }
            //JWTの発行
            const token = JWT.sign({id: user._id},process.env.TOKEN_SECRET_KEY,{
                expiresIn: "24h",
            });

            return res.status(201).json({user,token})

        }catch (err){
            return res.status(500).json(err);
        }
    };
