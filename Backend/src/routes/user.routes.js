import { Router } from "express";
import passport from "passport";
import { registerUser } from "../controllers/user.controller.js";
import { loginUser } from "../controllers/user.controller.js";
import{ logoutUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { refreshAccessToken } from "../controllers/user.controller.js";
import { changePassword } from "../controllers/user.controller.js";
import { getCurrentUser } from "../controllers/user.controller.js";
import { updateUserProfile } from "../controllers/user.controller.js";
import { googleAuthCallback } from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router
	.route("/auth/google")
	.get(passport.authenticate("google", { scope: ["profile", "email"], session: false }));
router
	.route("/auth/google/callback")
	.get(
		passport.authenticate("google", {
			session: false,
			failureRedirect: `${process.env.FRONTEND_URL || "http://localhost:3000"}/login?oauth=failed`,
		}),
		googleAuthCallback
	);
router.route("/logout").post(verifyJWT, logoutUser); 
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changePassword);
router.route("/current-user").post(verifyJWT, getCurrentUser);
router.route("/update-profile").post(verifyJWT, updateUserProfile);

export default router;