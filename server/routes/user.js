const express = require("express");
const {
  loginUser,
  signupUser,
  getAlldata,
  userInfo,
} = require("../controllers/userController");
const requireAuth = require("../middleware/requireAuth");
const User = require("../models/userModel");

const router = express.Router();

// middleware
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params._id).select("-password");
    if (user == null) {
      return res.status(500).json({ message: "user not found" });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }

  res.user = user;
  next();
}

//login
router.post("/login", loginUser);

// signup
router.post("/signup", signupUser);

// GET all data
router.get("/", getAlldata);

// GET user details
router.get("/info/:_id", getUser, userInfo);

module.exports = router;
