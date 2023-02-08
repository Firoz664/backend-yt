const config = require('./../../../../config/env/config');
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
      return res.send({
        status: false,
        data: {
          message: "token is required for authentication"
        }
      })
    }
    jwt.verify(token, config.JWT_SECRET, (err, result) => {
      if (err) {
        return res.send({
          status: false,
          data: {
            message: "invalid token"
          }
        })
      } else {
        req.userId = result.user._id;
        req.userDetails = result.user
        return next();
      }
    })
  } catch (err) {
    return { err: "Unauthorized user" }
  }
};

const generateToken = async (user) => {
  if (!user) {
    console.log("got token error, email not found");
    return;
  }
  const token = jwt.sign({ user }, config.JWT_SECRET, {
    expiresIn: "2d",
  });
  return token;
};

module.exports = { verifyToken, generateToken } 
