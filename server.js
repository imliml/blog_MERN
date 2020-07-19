const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// route 파일
const userRoute = require("./routes/user");

// DB connect
require("./config/database.js");

// 미들웨어 설정
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routing
app.use("/user", userRoute);

const PORT = process.env.PORT || 7000;

app.listen(PORT, console.log(`sever started at ${PORT}`));
