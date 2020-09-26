const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
const _ = require("lodash");
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

<html>
  <head>
    <meta name="viewport" content="width=device-width" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Simple Transactional Email</title>
    <style>
      /* -------------------------------------
          GLOBAL RESETS
      ------------------------------------- */
      
      /*All the styling goes here*/
      
      img {
        border: none;
        -ms-interpolation-mode: bicubic;
        max-width: 100%; 
      }

      body {
        background-color: #f6f6f6;
        font-family: sans-serif;
        -webkit-font-smoothing: antialiased;
        font-size: 14px;
        line-height: 1.4;
        margin: 0;
        padding: 0;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%; 
      }

      table {
        border-collapse: separate;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
        width: 100%; }
        table td {
          font-family: sans-serif;
          font-size: 14px;
          vertical-align: top; 
      }

      /* -------------------------------------
          BODY & CONTAINER
      ------------------------------------- */

      .body {
        background-color: #f6f6f6;
        width: 100%; 
      }

      /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
      .container {
        display: block;
        margin: 0 auto !important;
        /* makes it centered */
        max-width: 580px;
        padding: 10px;
        width: 580px; 
      }

      /* This should also be a block element, so that it will fill 100% of the .container */
      .content {
        box-sizing: border-box;
        display: block;
        margin: 0 auto;
        max-width: 580px;
        padding: 10px; 
      }

      /* -------------------------------------
          HEADER, FOOTER, MAIN
      ------------------------------------- */
      .main {
        background: #ffffff;
        border-radius: 3px;
        width: 100%; 
      }

      .wrapper {
        box-sizing: border-box;
        padding: 20px; 
      }

      .content-block {
        padding-bottom: 10px;
        padding-top: 10px;
      }

      .footer {
        clear: both;
        margin-top: 10px;
        text-align: center;
        width: 100%; 
      }
        .footer td,
        .footer p,
        .footer span,
        .footer a {
          color: #999999;
          font-size: 12px;
          text-align: center; 
      }

      /* -------------------------------------
          TYPOGRAPHY
      ------------------------------------- */
      h1,
      h2,
      h3,
      h4 {
        color: #000000;
        font-family: sans-serif;
        font-weight: 400;
        line-height: 1.4;
        margin: 0;
        margin-bottom: 30px; 
      }

      h1 {
        font-size: 35px;
        font-weight: 300;
        text-align: center;
        text-transform: capitalize; 
      }

      p,
      ul,
      ol {
        font-family: sans-serif;
        font-size: 14px;
        font-weight: normal;
        margin: 0;
        margin-bottom: 15px; 
      }
        p li,
        ul li,
        ol li {
          list-style-position: inside;
          margin-left: 5px; 
      }

      a {
        color: #3498db;
        text-decoration: underline; 
      }

      /* -------------------------------------
          BUTTONS
      ------------------------------------- */
      .btn {
        box-sizing: border-box;
        width: 100%; }
        .btn > tbody > tr > td {
          padding-bottom: 15px; }
        .btn table {
          width: auto; 
      }
        .btn table td {
          background-color: #ffffff;
          border-radius: 5px;
          text-align: center; 
      }
        .btn a {
          background-color: #ffffff;
          border: solid 1px #3498db;
          border-radius: 5px;
          box-sizing: border-box;
          color: #3498db;
          cursor: pointer;
          display: inline-block;
          font-size: 14px;
          font-weight: bold;
          margin: 0;
          padding: 12px 25px;
          text-decoration: none;
          text-transform: capitalize; 
      }

      .btn-primary table td {
        background-color: #3498db; 
      }

      .btn-primary a {
        background-color: #3498db;
        border-color: #3498db;
        color: #ffffff; 
      }

      /* -------------------------------------
          OTHER STYLES THAT MIGHT BE USEFUL
      ------------------------------------- */
      .last {
        margin-bottom: 0; 
      }

      .first {
        margin-top: 0; 
      }

      .align-center {
        text-align: center; 
      }

      .align-right {
        text-align: right; 
      }

      .align-left {
        text-align: left; 
      }

      .clear {
        clear: both; 
      }

      .mt0 {
        margin-top: 0; 
      }

      .mb0 {
        margin-bottom: 0; 
      }

      .preheader {
        color: transparent;
        display: none;
        height: 0;
        max-height: 0;
        max-width: 0;
        opacity: 0;
        overflow: hidden;
        mso-hide: all;
        visibility: hidden;
        width: 0; 
      }

      .powered-by a {
        text-decoration: none; 
      }

      hr {
        border: 0;
        border-bottom: 1px solid #f6f6f6;
        margin: 20px 0; 
      }

      /* -------------------------------------
          RESPONSIVE AND MOBILE FRIENDLY STYLES
      ------------------------------------- */
      @media only screen and (max-width: 620px) {
        table[class=body] h1 {
          font-size: 28px !important;
          margin-bottom: 10px !important; 
        }
        table[class=body] p,
        table[class=body] ul,
        table[class=body] ol,
        table[class=body] td,
        table[class=body] span,
        table[class=body] a {
          font-size: 16px !important; 
        }
        table[class=body] .wrapper,
        table[class=body] .article {
          padding: 10px !important; 
        }
        table[class=body] .content {
          padding: 0 !important; 
        }
        table[class=body] .container {
          padding: 0 !important;
          width: 100% !important; 
        }
        table[class=body] .main {
          border-left-width: 0 !important;
          border-radius: 0 !important;
          border-right-width: 0 !important; 
        }
        table[class=body] .btn table {
          width: 100% !important; 
        }
        table[class=body] .btn a {
          width: 100% !important; 
        }
        table[class=body] .img-responsive {
          height: auto !important;
          max-width: 100% !important;
          width: auto !important; 
        }
      }

      /* -------------------------------------
          PRESERVE THESE STYLES IN THE HEAD
      ------------------------------------- */
      @media all {
        .ExternalClass {
          width: 100%; 
        }
        .ExternalClass,
        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass font,
        .ExternalClass td,
        .ExternalClass div {
          line-height: 100%; 
        }
        .apple-link a {
          color: inherit !important;
          font-family: inherit !important;
          font-size: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
          text-decoration: none !important; 
        }
        #MessageViewBody a {
          color: inherit;
          text-decoration: none;
          font-size: inherit;
          font-family: inherit;
          font-weight: inherit;
          line-height: inherit;
        }
        .btn-primary table td:hover {
          background-color: #34495e !important; 
        }
        .btn-primary a:hover {
          background-color: #34495e !important;
          border-color: #34495e !important; 
        } 
      }

    </style>
  </head>
  <body class="">
    <span class="preheader">This is preheader text. Some clients will show this text as a preview.</span>
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
      <tr>
        <td>&nbsp;</td>
        <td class="container">
          <div class="content">

            <!-- START CENTERED WHITE CONTAINER -->
            <table role="presentation" class="main">

              <!-- START MAIN CONTENT AREA -->
              <tr>
                <td class="wrapper">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                      <td>
                        <p>Hi there,</p>
                        <p>Sometimes you just want to send a simple HTML email with a simple design and clear call to action. This is it.</p>
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                          <tbody>
                            <tr>
                              <td align="left">
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                  <tbody>
                                    <tr>
                                      <td> <a href="http://localhost:3000/users/activate/${token}" target="_blank">Call To Action</a> </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <p>This is a really simple email template. Its sole purpose is to get the recipient to click the button with no distractions.</p>
                        <p>Good luck! Hope it works.</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

            <!-- END MAIN CONTENT AREA -->
            </table>
            <!-- END CENTERED WHITE CONTAINER -->

            <!-- START FOOTER -->
            <div class="footer">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td class="content-block">
                    <span class="apple-link">Company Inc, 3 Abbey Road, San Francisco CA 94102</span>
                    <br> Don't like these emails? <a href="http://i.imgur.com/CScmqnj.gif">Unsubscribe</a>.
                  </td>
                </tr>
                <tr>
                  <td class="content-block powered-by">
                    Powered by <a href="http://localhost:3000/users/activate/${token}">HTMLemail</a>.
                  </td>
                </tr>
              </table>
            </div>
            <!— END FOOTER —>

          </div>
        </td>
        <td>&nbsp;</td>
      </tr>
    </table>
  </body>
</html>
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
              tokenInfo: tokenGenerator(payload, "7d"),
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
        // const token = jwt.sign({ _id: user._id }, process.env.SECRET, {
        //   expiresIn: "30m",
        // });
        const token = tokenGenerator({ _id: user._id }, "30m");

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

        // token을 업데이트 하고 메일 발송
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

exports.reset_password = (req, res) => {
  //
  const { resetPasswordLink, newPassword } = req.body;

  if (resetPasswordLink) {
    jwt.verify(resetPasswordLink, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(400).json({
          error: "Expired link. Try again",
        });
      } else {
        userModel
          .findOne({ resetPasswordLink })
          .then((user) => {
            const updateFields = {
              password: newPassword,
              resetPasswordLink: "",
            };

            user = _.extend(user, updateFields);

            user
              .save()
              .then(() => {
                res.status(200).json({
                  message: "Great! Now you can login with your new password",
                });
              })
              .catch((err) => {
                return res.status(400).json({
                  error: "Error resetting user password",
                });
              });
          })

          .catch((err) => {
            return res.status(400).json({
              error: "Something went wrong. Try later",
            });
          });
      }
    });
  }
};

exports.activation_user = (req, res) => {
  const { token } = req.body;

  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          errors: "expired link. Signup again",
        });
      } else {
        const { name, email, password } = jwt.decode(token);

        const newUser = new userModel({
          name,
          email,
          password,
        });

        newUser
          .save()
          .then((user) => {
            res.status(200).json({
              success: true,
              userInfo: user,
            });
          })
          .catch((err) =>
            res.status(400).json({
              success: false,
              errors: err,
            })
          );
      }
    });
  }
};
