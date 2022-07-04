import express from "express";
import {
  userRegister,
  userLogin,
  getUserProfile,
} from "../controller/userController.js";
import { protect } from "../middlewares/authMiddlewares.js";
const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/profile", protect, getUserProfile);

export default router;
