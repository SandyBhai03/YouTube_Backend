import jwt from "jsonwebtoken";
import User from '../models/user.js'

// ---------- Authentication Function ----------
export const auth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied" });
  } else {
    try {
      const decode = jwt.verify(token, "Its my SecretKey");
      req.user = await User.findById(decode.userId).select("-password");
      console.log("Authenticated user:", req.user);
      next(); // move to next functions or middleware
    } catch (error) {
      console.log("JWT error:", error.message);
      res.status(401).json({ error: "Token invalid" });
    }
  }
};

//export default auth;
