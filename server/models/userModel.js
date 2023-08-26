const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  bio: {
    type: String,
    default: "Hey there! I am using DevConnect",
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  education: {
    college: String,
    degree: String,
    fieldOfStudy: String,
    from: Number,
    to: Number,
  },
  urls: {
    linkedin: String,
    portfolio: String,
    github: String,
  },
  skills: {
    type: Array,
    limit: 5,
  },
  profile_img: {
    type: String,
    default:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  connections: [Schema.Types.ObjectId],
  pendingReq: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }]
});


userSchema.statics.signup = async function (
  email,
  password,
  username,
  fullName
) {
  // validation
  if (!email || !password || !username || !fullName) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not Valid");
  }

  if (password.length < 6) {
    throw Error("Password must be atleast 6 characters long");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already exist");
  }

  const data = await fetch(`https://api.github.com/users/${username}`);
  const { avatar_url } = await data.json();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash, username, fullName, 'urls.github': `https://github.com/${username}`, profile_img: avatar_url });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incrrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
