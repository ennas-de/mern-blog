import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      required: false,
    },
    dislikes: {
      type: Number,
      required: false,
    },
    love: {
      type: Number,
      required: false,
    },
    categories: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
