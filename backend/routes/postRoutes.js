import express from "express";
import { createPost, getAllPosts } from "../controller/postController.js";
import { protect } from "../middlewares/authMiddlewares.js";
import pictureParser from "../middlewares/imageMiddlewares.js";
const router = express.Router();

router.post("/createpost", protect, pictureParser.single("image"), createPost);
router.get("/getall", getAllPosts);

export default router;
