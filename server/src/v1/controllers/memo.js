const Memo = require("../models/memo");
exports.create = async (req, res) => {

    try {
        const memoCount = await Memo.countDocuments();
        const memo = await Memo.create({
            user: req.user._id,
            position: memoCount > 0 ? memoCount : 0,
        });
        return res.status(201).json(memo);
    } catch (err) {
        return res.status(500).json(err);
    }
};
