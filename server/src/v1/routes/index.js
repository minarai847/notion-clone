const router = require("express").Router();

console.log("index.js: ルーティングを設定中...");
const authRouter = require("./auth");
const memoRouter = require("./memo");

console.log("authRouter:", typeof authRouter);
console.log("memoRouter:", typeof memoRouter);

router.use("/auth", authRouter);
router.use("/memo", memoRouter);

console.log("index.js: ルーティング設定完了");

module.exports = router;
