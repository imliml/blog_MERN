const jwt = require("jsonwebtoken");

const userModel = require("../model/user");

function tokenGenerator(payload) {
  return jwt.sign(payload, process.env.SECRET, { expiresIn: 36000 });
}

const validateRegisterInput = require("../validation/register");

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
        const newUser = new userModel({
          name,
          email,
          password,
        });

        newUser
          .save()
          .then((result) => {
            res.json({
              message: "save user",
              userInfo: {
                id: result._id,
                name: result.name,
                email: result.email,
                avatar: result.avatar,
                password: result.password,
                date: {
                  createdAt: result.createdAt,
                  updatedAt: result.updatedAt,
                },
              },
            });
          })
          .catch((err) => {
            res.status(404).json({
              error: err.message,
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
  userModel
    .findOne({ email })
    .then((user) => {
      if (!user) {
        return res.json({
          message: "No email",
        });
      } else {
        user.comparePassword(password, (err, isMatch) => {
          if (err || isMatch === false) {
            return res.json({
              message: "password incorrect",
            });
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
