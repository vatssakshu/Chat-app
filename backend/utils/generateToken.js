import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res, next) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    httpOnly: true, // cookie cannot be accessed by client side scripts
    sameSite: "strict", // same-site cookies
    secure: process.env.NODE_ENV === "production" ? true : false, // cookie will only be sent over HTTPS
  });
};

export default generateTokenAndSetCookie;
