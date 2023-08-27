const express = require("express");
const {
  loginUser,
  signupUser,
  getAlldata,
  userInfo,
  updateUserProfile,
  connectUser,
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

// Update user details
router.patch("/:_id", requireAuth, getUser, updateUserProfile);

router.put("/connect", requireAuth, connectUser);

router.get('/pending/:_id', getUser, async (req, res) => {
  const data = await res.user.populate('pendingReq');
  console.log(data.pendingReq, 'user50');
  res.send(data.pendingReq);
})

router.get('/search/:query', async (req, res) => {
  const query = req.params.query;
  try {
    const skill = await User.find({ skills: new RegExp(`^${query}$`, 'i') })
    console.log(skill, 'user59')
    res.json(skill);
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

module.exports = router;
