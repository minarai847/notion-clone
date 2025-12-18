const Memo = require("../models/memo");
exports.create = async (req, res) => {
    console.log("memo.create: リクエスト受信");
    console.log("memo.create: user =", req.user);

    try {
        const memoCount = await Memo.countDocuments();
        console.log("memo.create: memoCount =", memoCount);

        const memo = await Memo.create({
            user: req.user._id,
            position: memoCount > 0 ? memoCount : 0,
        });
        console.log("memo.create: 作成成功", memo);
        return res.status(201).json(memo);
    } catch (err) {
        console.error("memo.create: エラー", err);
        return res.status(500).json(err);
    }
};
