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
app.use("/api/v1/auth", require("./src/v1/routes/auth"));

//DB接続
try {
    mongoose.connect(process.env.MONGODB_URL);
    console.log("DBと接続中")
} catch (errors) {
    console.log(errors);
}

app.listen(PORT, () => {
    console.log("ローカルサーバー起動中");
});
