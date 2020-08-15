const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
const userModel = require("../model/user");

sgMail.setApiKey(process.env.MAIL_KEY);

const tokenGenerator = (payload, time) => {
  return jwt.sign(payload, process.env.SECRET, { expiresIn: time });
};

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

exports.register_user = (req, res) => {
  // email 유무 체크 -> password 암호화 -> DB 저장

  const { name, email, password } = req.body;

  // v
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  userModel
    .findOne({ email })
    .then((user) => {
      if (user) {
        errors.message = "email already exists";
        return res.status(404).json(errors);
      } else {
        const payload = { name, email, password };
        const token = tokenGenerator(payload, "10m");

        const emailData = {
          from: process.env.MAIL_FROM,
          to: email,
          subject: "Account activation Link",
          html: `
            <h1>Please use the following to activate your account</h1>
            <p>http://localhost:3000/users/activate/${token}</p>
            <hr />
            <p>This email may containe sensetive information</p>
            <p>http://localhost:3000</p>
          `,
        };

        sgMail
          .send(emailData)
          .then(() => {
            return res.status(200).json({
              message: `Email has been sent to ${email}`,
            });
          })
          .catch((err) => {
            return res.status(400).json({
              success: false,
              error: err,
            });
          });

        // const avatar = gravatar.url(req.body.email, {
        //   s: "200", // size
        //   r: "pg", // rating
        //   d: "mm", // Default
        // });
        // bcrypt.hash(req.body.password, 10, (err, hash) => {
        //   if (err) {
        //     return res.json({
        //       message: err.message,
        //     });
        //   } else {
        //     const user = new userModel({
        //       name: req.body.name,
        //       email: req.body.email,
        //       password: hash,
        //       avatar: avatar,
        //     });
        //     user
        //       .save()
        //       .then((result) => {
        //         res.json({
        //           message: "save user",
        //           userInfo: result,
        //         });
        //       })
        //       .catch((err) => {
        //         res.json({
        //           error: err.message,
        //         });
        //       });
        //   }
        // });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
};

exports.login_user = (req, res) => {
  // email 체크 -> password 체크 -> returning jwt

  const { email, password } = req.body;

  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  userModel
    .findOne({ email })
    .then((user) => {
      if (!user) {
        errors.email = "No email";
        return res.status(404).json(errors);
        // return res.json({
        //   message: "No email",
        // });
      } else {
        user.comparePassword(password, (err, isMatch) => {
          if (err || isMatch === false) {
            errors.password = "password incorrect";
            return res.status(404).json(errors);
            // return res.json({
            //   message: "password incorrect",
            // });
          } else {
            const payload = {
              id: user._id,
              email: user.email,
              name: user.name,
              avatar: user.avatar,
            };

            res.json({
              message: "successful login",
              tokenInfo: tokenGenerator(payload),
            });
          }
        });
        // bcrypt.compare(password, user.password, (err, result) => {
        //   if (err || result === false) {
        //     return res.json({
        //       message: "password incorrect",
        //     });
        //   } else {

        //   }
        // });
      }
    })
    .catch((err) => {
      res.json({
        error: err.message,
      });
    });
};

exports.current_user = (req, res) => {
  res.json({
    id: req.user.id,
    email: req.user.email,
    name: req.user.name,
    avatar: req.user.avatar,
  });
};

exports.forgot_password = (req, res) => {
  const { email } = req.body;
  userModel
    .findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "No user",
        });
      } else {
        const token = jwt.sign({ _id: user._id }, process.env.SECRET, {
          expiresIn: "30m",
        });

        // 이메일로 보낼 내용
        const emailData = {
          from: process.env.MAIL_FROM,
          to: email,
          subject: "Password Reset link",
          html: `
            <h1>Please use the following link to reset your password</h1>
            <p>${process.env.CLIENT_URL}/users/password/reset/${token}</p>
            <hr />
            <p>This email may contain sensetive information</p>
            <p>${process.env.CLIENT_URL}</p>
          `,
        };

        //
        return user
          .updateOne({ resetPasswordLink: token })
          .then((user) => {
            sgMail
              .send(emailData)
              .then(() => {
                return res.status(200).json({
                  message: `Email has been sent to ${email}. Follow the instruction to activate your account`,
                });
              })
              .catch((err) => {
                return res.status(404).json({
                  message: err.message,
                });
              });
          })
          .catch((err) =>
            res.status(400).json({
              error:
                "Database connection error on user password forgot request",
            })
          );
      }
    })
    .catch((err) => res.status(500).json(err));
};
