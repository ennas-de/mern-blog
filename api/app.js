import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import cors from "cors";
import mongoose from "mongoose";
import User from "./models/User.js";

//Routes
import authRoute from "./routes/authRoutes.js";
import userRoute from "./routes/UserRoutes.js";
import postsRoute from "./routes/PostRoutes.js";

const app = express();
dotenv.config();
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(express.static());
// app.use("/images", express.static(path.join(__dirname, "/images")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File uploaded successfully!");
});

// Routes
app.get("/api", async (req, res) => {
  const user = await User.find();
  res.json(user);
});
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postsRoute);

const db_url = "mongodb://localhost/mernblog";
mongoose
  .connect(db_url)
  .then(app.listen(3001, () => console.log("Backend Running...")))
  .catch((err) => console.log(err));
