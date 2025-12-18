const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3002;
const cors = require("cors");

require("dotenv").config();
app.use(cors({
    origin: "http://localhost:3001",
    credentials: true
}));

app.use(express.json());

// リクエストログミドルウェア
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
});

// ルーティングのデバッグログ
console.log("ルーティングを読み込み中...");
const routes = require("./src/v1/routes");
console.log("ルーティングを読み込みました:", typeof routes);
app.use("/api/v1", routes);

//DB接続
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("DBと接続中");
    })
    .catch((errors) => {
        console.log("MongoDB接続エラー:", errors.message);
        console.log("サーバーはMongoDBなしで起動します");
    });

app.listen(PORT, () => {
    console.log(`ローカルサーバー起動中: http://localhost:${PORT}`);
});
