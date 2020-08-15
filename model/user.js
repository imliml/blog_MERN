// 1
const mongoose = require("mongoose");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

// 2
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    resetPasswordLink: {
      data: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// 저장하기전 실행되는 함수(avatar생성, password 암호화)
userSchema.pre("save", async function (next) {
  try {
    console.log("entered");

    const avatar = await gravatar.url(this.email, {
      s: "200",
      r: "pg",
      d: "mm",
    });
    this.avatar = avatar;

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(this.password, salt);
    this.password = passwordHash;

    console.log("exited");
    next();
  } catch (error) {
    next(error);
  }
});

// password 비교 함수 생성
userSchema.methods.comparePassword = function (userPassword, cb) {
  bcrypt.compare(userPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// 3
module.exports = mongoose.model("user", userSchema);
