import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
export const signup = async (req, res, next) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      const error = new Error("Password do not match");
      error.statusCode = 400;
      throw error;
    }

    const user = await User.findOne({ username });

    if (user) {
      const error = "User already exists";
      error.statusCode = 400;
      throw error;
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = bcryptjs.hashSync(password, salt);
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    await newUser.save();

    return res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      fullName: newUser.fullName,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    next(error);
  }
};
export const login = (req, res) => {
  console.log("login user");
};
export const logout = (req, res) => {
  console.log("login user");
};
