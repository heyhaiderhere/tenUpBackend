import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import { uploadFile } from "./s3.js";
import asyncHandler from "express-async-handler";

// @desc	Creating post
// @route	POST /api/posts/createpost
// @access	Private
const createPost = asyncHandler(async (req, res) => {
  const { description } = req.body;
  const { _id } = req.user;

  const imageUri = "posts/";
  console.log(req.file);
  const bucketResult = await uploadFile(req.file);
  console.log(bucketResult);
  if (req.file || description) {
    const createPost = await Post.create({
      user: _id,
      description: description && description,
      image: bucketResult ? { url: bucketResult.Key } : {},
    });
    if (createPost) {
      const updateUserPosts = await User.findByIdAndUpdate(_id, {
        $push: {
          posts: createPost._id,
        },
      });
      res.status(200);
      res.json(createPost);
    } else {
      throw new Error("Could not create post");
    }
  } else {
    throw new Error("Either description or image is required");
  }
});

const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({})
    .sort({ postedAt: "descending" })
    .populate("user", "name email profilePicture");
  if (posts) {
    res.status(200);
    res.send(posts);
  } else {
    res.status(404);
    throw new Error("No posts at the moment");
  }
});

export { createPost, getAllPosts };
