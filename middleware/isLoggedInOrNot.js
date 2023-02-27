const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const isLoggedInOrNot = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1]
    
    // * INVALID TOKEN
    if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "You must have LoggedIn to do further action ",
      });
    }

    // * VERIFYING THE TOKEN
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        return res.status(404).json({
          error: err.message,
        });
      }
      const { _id, email } = payload;

      // * FINDING THE LOGGED IN USER
      User.findOne({ $and: [{ _id: _id }, { email: email }] })
        .then((result) => {
          req.user = result;
          next();
        })
        .catch((err) => console.log(err));
    });
  } catch (err) {
    return res.status(404).json({
      error: err.message,
    });
  }
};

module.exports = { isLoggedInOrNot };
