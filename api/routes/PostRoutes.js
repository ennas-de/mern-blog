import express from "express";
import Post from "../models/Post.js";

const router = express.Router();

// GET ALL POSTS
router.get("/", async (req, res) => {
  try {
    let posts = await Post.find();
    // if (posts.length < 1) res.status(401).json("No Post Yet!");
    !posts.length && res.status(401).json("No Post Yet!");

    posts && res.status(200).json(posts);
  } catch (error) {
    res.status(500).json("Something Else Went Wrong!");
  }
});

// GET SINGLE POST
// Todo: Make the path to be based on category ("/cat/:id" || "/catId/:id")
router.get("/post/:id", async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    !post.length && res.status(404).json("Post Not Found!");

    post && res.status(200).json(post);
  } catch (error) {
    res.status(500).json("Something Else Went Wrong!");
  }
});

// CREATE NEW POST
router.post("/", async (req, res) => {
  try {
    let newPost = new Post(req.body);
    try {
      let savedPost = newPost.save();
      savedPost && res.status(200).json("New Post Created!");
    } catch (err) {
      res.status(403).json("Can not connect to the Database!");
    }
  } catch (error) {
    res.status(500).json("Something Else Went Wrong!");
  }
});

// UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    !post.length && res.status(404).json("Post Not Found!");

    let updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body);

    try {
      let savedPost = updatedPost.save();
      savedPost && res.status(200).json("Post Updated Successfully!");
    } catch (error) {
      res.status(401).json("Post Not Updated!");
    }
  } catch (error) {
    res.status(500).json("Something Else Went Wrong!");
  }
});

// DELETE POST
//

export default router;
