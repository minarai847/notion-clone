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
    console.log("verifyToken: 認証チェック開始");
    console.log("verifyToken: Authorization =", req.headers["authorization"]);

    const tokenDecoded = tokenDecode(req);
    console.log("verifyToken: tokenDecoded =", tokenDecoded);

    if (tokenDecoded) {
        try {
            // JWTと一致するユーザーを探す
            const user = await User.findById(tokenDecoded.id);
            console.log("verifyToken: user =", user ? "見つかりました" : "見つかりませんでした");

            if (!user) {
                console.log("verifyToken: ユーザーが見つかりません");
                return res.status(401).json({ message: "権限がありません" });
            }

            req.user = user;
            console.log("verifyToken: 認証成功、next()を呼び出します");
            next();
        } catch (error) {
            console.error("verifyToken: エラー", error.message);
            return res.status(500).json({ message: "サーバーエラー" });
        }
    } else {
        console.log("verifyToken: トークンのデコードに失敗");
        return res.status(401).json({ message: "権限がありません" });
    }
};

// モジュールをエクスポート
module.exports = {
    tokenDecode,
    verifyToken
};
