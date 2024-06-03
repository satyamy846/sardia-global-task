import express from 'express';
const router = express.Router();
import { signupUser, loginUser, resetPasswordOTP, updatePassword, logoutUser } from '../controllers/User.js';
import authenticate from '../middlewares/Auth.js';


router.post("/auth/signup", signupUser);

router.post("/auth/login", loginUser);

router.post("/reset-password", resetPasswordOTP);

router.patch("/update-password", updatePassword);

router.get("/logout", authenticate, logoutUser);

export default router;