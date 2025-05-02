const JWT = require("jsonwebtoken");
const User = require("../models/user");

// クライアントから渡されたJWTが正常か検証
const tokenDecode = (req) => {
    const bearerHeader = req.headers["authorization"];
    if (!bearerHeader) {
        return false; // Authorization ヘッダーがない場合
    }

    try {
        const bearer = bearerHeader.split(" ")[1];
        if (!bearer) {
            return false; // トークンが正しくない場合
        }

        const decodeToken = JWT.verify(bearer, process.env.TOKEN_SECRET_KEY);
        return decodeToken;

    } catch (err) {
        console.error("JWT verification error:", err.message);
        return false;
    }
};

// JWT認証を検証するためのミドルウェア（バリデーションチェック）
const verifyToken = async (req, res, next) => {
    const tokenDecoded = tokenDecode(req);

    if (tokenDecoded) {
        try {
            // JWTと一致するユーザーを探す
            const user = await User.findById(tokenDecoded.id);
            if (!user) {
                return res.status(401).json({ message: "権限がありません" });
            }

            req.user = user;
            next();
        } catch (error) {
            console.error("Error in verifyToken middleware:", error.message);
            return res.status(500).json({ message: "サーバーエラー" });
        }
    } else {
        return res.status(401).json({ message: "権限がありません" });
    }
};

// モジュールをエクスポート
module.exports = {
    tokenDecode,
    verifyToken
};
