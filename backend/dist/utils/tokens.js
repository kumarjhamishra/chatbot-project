import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";
export const generateToken = (id, email, expiresIn) => {
    const payload = { id, email };
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is not defined");
    }
    const token = jwt.sign(payload, secret, {
        expiresIn: expiresIn,
    });
    return token;
};
// middleware to verify the token of the user so he has no need to login again
export const verifyToken = async (req, res, next) => {
    // signed cookies store the cookies data
    const token = req.signedCookies[`${COOKIE_NAME}`];
    if (!token || token.trim() === "") {
        return res.status(401).json({ message: "Token Not Received" });
    }
    //console.log(token)
    return new Promise((resolve, reject) => {
        return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
            if (err) {
                reject(err.message);
                return res.status(401).json({ message: "Token Expired" });
            }
            else {
                console.log("Token Verification Successfully");
                resolve();
                res.locals.jwtData = success;
                return next();
            }
        });
    });
};
//# sourceMappingURL=tokens.js.map