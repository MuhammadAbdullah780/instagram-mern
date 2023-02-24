const User = require("../models/UserModel");
const statusCode = require("http-status-codes");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const getUser = (req, res, next)=> {
  res.status(200).json({
    user: req.user
  })
}






const signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    // * VALIDATION CHECK
    if (!username || !email || !password)
      return res
        .status(statusCode.PARTIAL_CONTENT)
        .json({ msg: "Please fill the fields properly"});

    // * CHECKING IF USER EXISTS OR NOT
    const existedUser = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });

    // * IF THE USER EXISTS THEN WE THROW AN ERROR
    if (existedUser)
      return res.status(422).json({ msg: "User already exists" });

    // * CREATING THE USER
    await bcrypt.hash(password, 12).then((hashedPw) => {
      const user = new User({
        username,
        email,
        password: hashedPw,
      });
        user.save()
        .then((user) =>
          res.status(201).json({
            msg: "User created successfully",
            user: user,
          })
        )
        .catch((err) =>
          res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            msg: "Error Occurred while saving the user",
          })
        );
    });
  } catch (error) {
    res.status(404).json({
      msg: error.message,
    });
  }
};

const logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // * IF BOTH FIELDS ARE NOT FILLED
    if (!email || !password) {
      return res
        .status(statusCode.PARTIAL_CONTENT)
        .json("Please fill the fields properly");
    }
    const existedUser = await User.findOne({ email: email }).select('+password');
    // * IF USER IS NOT EXISTED
    if (!existedUser) {
      return res.status(422).json("Invalid Email");
    }


    // * COMPARING THE PASSWORD OF USER
    bcrypt.compare(password,existedUser.password)
      .then((match) => {
        if (!match)
          return res.status(422).json({
            msg: "Invalid Password",
          });

        // * PASSWORD MATCHED
        const token = jwt.sign(
          {
            _id: existedUser._id,
            email: existedUser.email,
          },
          process.env.JWT_SECRET,
          // TODO: EXPIRES IN WALI FIELD DAALNI HAI AUR REFERESH TOKEN KA INTEZAAM BH KRNA HAI
        );

        if (!token) {
          return res.status(422).json({
            msg: "Invalid Password",
          });
        }

        res.status(200).json({
          msg: "Successfully Logged In",
          token,
          user:existedUser
        });
      })
      .catch((err) => console.log(err));
  } catch (error) {
    return res.status(statusCode.BAD_REQUEST).json(error);
  }
};

module.exports = { signUp, logIn, getUser };
