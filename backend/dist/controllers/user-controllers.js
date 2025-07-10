import User from "../models/User.js";
import * as brcypt from "bcrypt";
import { generateToken } from "../utils/tokens.js";
import { COOKIE_NAME } from "../utils/constants.js";
export const getAllUsers = async (req, res, next) => {
    // get all users from db
    try {
        const users = await User.find();
        return res.status(200).json({ message: "OK", users });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
export const signUpUser = async (req, res, next) => {
    try {
        // get the data from the body
        const { name, email, password } = req.body;
        // some validation check on name and email
        if ([name, email, password].some((feild) => feild?.trim() === "")) {
            return res.status(500).json({ message: "All feilds are required" });
        }
        // check if user already existed
        const existedUser = await User.findOne({
            $or: [{ name }, { email }],
        });
        if (existedUser) {
            return res.status(500).json({ message: "User already exists" });
        }
        // hash the password
        const hashedPassword = await brcypt.hash(password, 10);
        // make the new user object
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        if (!newUser) {
            return res.status(500).json({ message: "Error in creating new user" });
        }
        // generate a fresh token
        const newToken = generateToken(newUser._id.toString(), newUser.email.toString(), "10d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 10);
        res.cookie(COOKIE_NAME, newToken, {
            path: "/", // in the root directory store the cookie
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true, // will again sign the cookie
        });
        return res.status(201).json({
            message: "User created successfully",
            name: newUser.name,
            email: newUser.email,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
export const loginUser = async (req, res, next) => {
    try {
        // find if the user exists
        const { email, password } = req.body;
        // find the user either by name or email
        const user = await User.findOne({
            $or: [{ email }],
        });
        if (!user) {
            return res.status(404).json({ message: "email is invalid" });
        }
        // now check the entered password
        const isPasswordCorrect = await brcypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "incorrect password" });
        }
        // remove the previous cookiew when the user login again
        res.clearCookie(COOKIE_NAME, {
            path: "/", // in the root directory store the cookie
            domain: "localhost",
            httpOnly: true,
            signed: true, // will again sign the cookie
        });
        // generate a fresh token
        const newToken = generateToken(user._id.toString(), user.email.toString(), "10d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 10);
        res.cookie(COOKIE_NAME, newToken, {
            path: "/", // in the root directory store the cookie
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true, // will again sign the cookie
        });
        return res
            .status(200)
            .json({ message: "SUCCESS", name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
export const verifyUser = async (req, res, next) => {
    try {
        // user login
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered or Token malfunctioned");
        }
        console.log(user._id.toString(), res.locals.jwtData.id);
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't matched");
        }
        return res
            .status(200)
            .json({ message: "SUCCESS", name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
export const logoutUser = async (req, res, next) => {
    try {
        // user login
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered or Token malfunctioned");
        }
        //console.log(user._id.toString(), res.locals.jwtData.id)
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't matched");
        }
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });
        return res
            .status(200)
            .json({ message: "SUCCESS", name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=user-controllers.js.map