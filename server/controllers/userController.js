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

const userInfo = async function (req, res) {
  try {
    // console.log(res.user, "userController 49");
    res.json(res.user);
  } catch (error) {
    res.status(500).json({ message: e.message });
  }
};

const updateUserProfile = async function (req, res) {
  // const { description, tags, location } = req.body;
  console.log(req.body, 58);
  const {
    fullName,
    bio,
    isAvailable,
    college,
    degree,
    fieldOfStudy,
    edu_from,
    edu_to,
    linkedin,
    portfolio,
    github,
    skills,
  } = req.body;

  let newskills = String(skills).trim();
  let skillArr = [];
  if (newskills.length > 0) {
    skillArr = newskills.split(",");
    skillArr.forEach((ele, idx) => {
      skillArr[idx] = ele.trim();
    });
  } else skillArr = [];

  // if (
  //   res.user.description === description &&
  //   res.user.skills === skillArr &&
  //   res.user.location === location
  // ) {
  //   res.status(200).json({ message: "post updated" });
  //   return;
  // }

  res.user.fullName = fullName;
  res.user.bio = bio;
  res.user.isAvailable = isAvailable;
  res.user.education.college = college;
  res.user.education.degree = degree;
  res.user.education.fieldOfStudy = fieldOfStudy;
  res.user.education.from = edu_from;
  res.user.education.to = edu_to;
  res.user.urls.linkedin = linkedin;
  res.user.urls.portfolio = portfolio;
  res.user.urls.github = github;
  res.user.skills = skillArr;

  try {
    const result = await res.user.save();
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const connectUser = async function (req, res) {
  const { id, connectTo, status } = req.body;
  console.log(typeof status, status, 108);
  try {
    const x = await User.findByIdAndUpdate(
      { _id: id },
      { $push: { connections: connectTo } },
      { new: true }
    );
    let y;
    if (status === "Accept") {
      y = await User.findByIdAndUpdate(
        { _id: id },
        { $pull: { pendingReq: connectTo } },
        { new: true }
      );
    } else {
      y = await User.findByIdAndUpdate(
        { _id: connectTo },
        { $push: { pendingReq: id } },
        { new: true }
      );
    }
    // console.log(x, y, 129);
    res.json(x);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  loginUser,
  signupUser,
  getAlldata,
  userInfo,
  updateUserProfile,
  connectUser,
};
