const router = require("express").Router();

const memoController = require("../controllers/memo");
const tokenHandler = require("../handlers/tokenHandler");

console.log("memo.js: ルーティング設定中");
console.log("memo.js: memoController.create =", typeof memoController.create);

router.post("/", tokenHandler.verifyToken, memoController.create);
router.get("/", tokenHandler.verifyToken, memoController.getAll);

router.get("/:memoId", tokenHandler.verifyToken, memoController.getOne);
console.log("memo.js: ルーティング設定完了");

module.exports = router;
