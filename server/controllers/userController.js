const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = function (_id) {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

//login user
const loginUser = async function (req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    //create token
    const token = createToken(user._id);

    res.status(200).json({ id: user._id, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user
const signupUser = async function (req, res) {
  const { email, password, username, fullName } = req.body;
  try {
    const user = await User.signup(email, password, username, fullName);

    //create token
    const token = createToken(user._id);

    res.status(200).json({ id: user._id, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAlldata = async function (req, res) {
  try {
    const user = await User.find({}).select("-password");
    // console.log(user, 41);
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};


module.exports = {
  loginUser,
  signupUser,
  getAlldata,
};
