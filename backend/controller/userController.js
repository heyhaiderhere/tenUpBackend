import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import genrateToken from "../utils/genrateToken.js";

// @desc	user register
// @route	POST /api/users/register
// @access	public
const userRegister = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User alredy existed");
  } else {
    const user = await User.create({
      name,
      email,
      password,
      phone,
    });
    if (user) {
      res.status(201);
      res.json({
        name: user.name,
        email: user.email,
        image: user.profilePicture,
        token: genrateToken(user._id),
      });
    } else {
      res.status(404);
      throw new Error("Invalid user");
    }
  }
});
// @desc	user login
// @route	POST /api/users/login
// @access	public
const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.send({
      email: user.email,
      id: user._id,
      isAdmin: user.isAdmin,
      name: user.name,
      phone: user.phone,
      image: user.profilePicture,
      friends: user.friends,
      posts: user.posts,
      token: genrateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid username or password");
  }
});
// @desc	logged in user profile
// @route	GET /api/users/profile
// @access	private
const getUserProfile = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id).populate({
    path: "posts",
    populate: {
      path: "user",
      select: "_id profilePicture name",
    },
    options: { sort: [{ postedAt: "descending" }] },
  });
  // .sort({ "posts.postedAt": "descending" });
  // .sort({createdAt: "descending"})
  if (user) {
    res.status(200);
    res.json({
      email: user.email,
      id: user._id,
      isAdmin: user.isAdmin,
      name: user.name,
      phone: user.phone,
      image: user.profilePicture,
      friends: user.friends,
      posts: user.posts,
    });
  } else {
    throw new Error("user Not found");
  }
});
export { userRegister, userLogin, getUserProfile };
