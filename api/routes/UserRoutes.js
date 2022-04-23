import express from "express";
import mongoose from "mongoose";
import User from "../models/User.js";

const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  try {
    let users = await User.find();
    // const { password, ...others } = users._doc;
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json("Something Else Went Wrong!");
  }
});

// Get single user
router.get("/:id", async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(200).json("Something Else Went Wrong!");
  }
});

// Update user
router.put("/:id", async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    // if (!user) res.status(404).json("User Not Found!");
    !user && res.status(404).json("User Not Found!");
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(400).json("Error Connecting To The Database!");
    }
  } catch (error) {
    res.status(500).json("Something Else Went Wrong!");
  }
});

// Delete user
router.delete("/:id", async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    !user && res.status(404).json("No User Found!");

    (await User.findByIdAndDelete(req.params.id)) &&
      res.status(200).json("User Deleted Successfully!");
  } catch (error) {
    res.status(500).json("Something Else Went Wrong!");
  }
});

export default router;
