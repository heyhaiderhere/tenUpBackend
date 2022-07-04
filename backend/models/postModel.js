import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  description: {
    type: String,
  },
  image: {
    url: {
      type: String,
    },
    required: false,
  },
  likes: [
    {
      likedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    },
  ],
  comments: [
    {
      comment: { type: String },
      commentBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      time: { type: Date, required: true, default: Date.now() },
    },
  ],
  postedAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
