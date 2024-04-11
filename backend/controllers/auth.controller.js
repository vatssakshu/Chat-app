import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res, next) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword)
      return next(errorHandler(400, "Passwords do not match"));

    const user = await User.findOne({ username });

    if (user) {
      return next(errorHandler(400, "User already exists"));
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

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res, next);
      await newUser.save();

      return res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        fullName: newUser.fullName,
        profilePic: newUser.profilePic,
      });
    } else {
      return next(errorHandler(500, "Invalid user data"));
    }
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const validUser = await User.findOne({ username });

    if (!validUser) return next(errorHandler(400, "Invalid credentials"));

    const validPassword = await bcryptjs.compare(password, validUser.password);

    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));

    generateTokenAndSetCookie(validUser._id, res, next);
    res.status(200).json({
      _id: validUser._id,
      username: validUser.username,
      fullName: validUser.fullName,
      profilePic: validUser.profilePic,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  console.log("login user");
};
