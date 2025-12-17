const router = require("express").Router();
const { body, validationResult } = require("express-validator");

require("dotenv").config();

const memoController = require("../controllers/memo");
const tokenHandler = require("../handlers/tokenHandler");



module.exports = router;
