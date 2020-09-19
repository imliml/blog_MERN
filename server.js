const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const passport = require("passport");
const cors = require("cors");

dotenv.config();

const app = express();

// route 파일
const userRoute = require("./routes/user");
const profileRoute = require("./routes/profile");
const postRoute = require("./routes/post");
// DB connect
require("./config/database.js");

// 미들웨어 설정
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

require("./config/passport")(passport);

// routing
app.use("/user", userRoute);
app.use("/profile", profileRoute);
app.use("/post", postRoute);

const PORT = process.env.PORT || 7000;

app.listen(PORT, console.log(`sever started at ${PORT}`));
