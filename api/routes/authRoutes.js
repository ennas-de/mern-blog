import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  if (
    req.body.firstname == "" ||
    req.body.lastname == "" ||
    req.body.username == "" ||
    req.body.email == "" ||
    req.body.password == ""
  ) {
    res.status(400).json("Please Fill All Fields!");
  }
  try {
    // do new user checks:
    const username = await User.findOne({ username: req.body.username });
    const email = await User.findOne({ email: req.body.email });
    // const user = User.findOne({ username: req.body.username });
    if (username) {
      res.status(403).json("Username Already Taken!");
    } else if (email) {
      res.status(403).json("Email Already Taken!");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    try {
      const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: hashedPass,
      });

      const savedUser = await newUser.save();
      res.status(200).json("Registered Successfully!");
    } catch (error) {
      res.status(403).json("Error While Registering New User!");
    }
  } catch (err) {
    res.status(200).json("Something Else Went Wrong!");
  }
});

router.post("/login", async (req, res) => {
  if (req.body.userdetail == "" || req.body.password == "") {
    res.status(400).json("All Fields Are Required!");
  }
  try {
    try {
      let user = await User.findOne({ username: req.body.userdetail });
      if (!user) {
        user = await User.findOne({ email: req.body.userdetail });
      }
      const validatedUser = await bcrypt.compare(
        req.body.password,
        user.password
      );
      !validatedUser && res.status(400).json("Wrong Credentials!");

      const { password, ...others } = user._doc;
      res.status(200).json(others);
      // res.status(200).json(user);
    } catch (error) {
      res.status(404).json("User Not Found!");
    }
  } catch (err) {
    res.status(200).json(err); //"Something Else Went Wrong!");
  }
});

export default router;
