import { Router } from "express";
import { getAllUsers, loginUser, logoutUser, signUpUser, verifyUser } from "../controllers/user-controllers.js";
import { loginValidate, signupValidate } from "../utils/validators.js";
import { verifyToken } from "../utils/tokens.js";

const userRoutes = Router()

userRoutes.get("/", getAllUsers)
userRoutes.post("/signup", signupValidate, signUpUser)
userRoutes.post("/login", loginValidate, loginUser)
userRoutes.get("/auth-status",verifyToken ,verifyUser)
userRoutes.get("/logout",verifyToken, logoutUser)

export default userRoutes