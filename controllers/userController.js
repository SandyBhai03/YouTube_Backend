import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

// ~~~~~~~ Create For Logout Funcion ~~~~~~~~~
const cookieOptions = { 
    httpOnly: true,
    secure: false, // Set True in Production
    sameSite: 'Lax'
}

// --------- SIGN-UP FUNCTION -----------
export const signUp = async (req, res) => {
  try {
    const { channelName, userName,  userEmail, about, profilePic, password } = req.body;
    const isExist = await User.findOne({ userName });

    if (isExist) {
      res
        .status(400)
        .json({
          error: "Username Already Exist! Please try with other username",
        });
    } else {
      let hashPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        channelName,
        userName,
        email: userEmail,
        about,
        profilePic,
        password: hashPassword,
      });
      await newUser.save();
      res
        .status(201)
        .json({
          message: "User registered successfully",
          success: "yes",
          data: newUser,
        });
    }
  } catch (error) {}
};

// --------- SIGN-IN FUNCTION -----------

export const signIn = async (req, res) => {
  try {
    const { userNameOrEmail, password } = req.body;

    const user = await User.findOne({
      $or: [{ userName: userNameOrEmail }, { email: userNameOrEmail }]
    });

    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.cookie('token', token, cookieOptions);
      res.json({ message: "Logged in successfully", success: "true", token, user});
    } else {
      res.status(400).json({ error: "Invalid credentials" });
    }I
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};


// ---------- Logout Function ----------
export const logOut = async (req, res) => {
    res.clearCookie('token', cookieOptions).json({message: 'Logged out successfully'});
}