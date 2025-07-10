import { body, validationResult } from "express-validator";
export const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        // if there is error means unprocessable call
        return res.status(422).json({ errors: errors.array() });
    };
};
// customized function to verify the details
export const signupValidate = (req, res, next) => {
    let { name, email, password } = req.body;
    name = name?.trim();
    email = email?.trim();
    password = password?.trim();
    // name should be between 2-50 characters
    const nameRegex = /^[a-zA-Z .'-]{2,50}$/;
    // email shoudl be in standard format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // password should be of 8 characters and at elast 1 letter and 1 number
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    if (!name || !nameRegex.test(name)) {
        return res.status(400).json({
            success: false,
            message: "Name must contain 2-50 characters",
        });
    }
    // email validation
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: "Invalid email format",
        });
    }
    // password validation
    if (!password || !passwordRegex.test(password)) {
        return res.status(400).json({
            success: false,
            message: "Password must contain at least 8 characters, one letter and one number",
        });
    }
    next();
};
export const loginValidate = (req, res, next) => {
    let { email, password } = req.body;
    email = email?.trim();
    password = password?.trim();
    // email shoudl be in standard format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // password should be of 8 characters and at elast 1 letter and 1 number
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    // email validation
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: "Invalid email format",
        });
    }
    // password validation
    if (!password || !passwordRegex.test(password)) {
        return res.status(400).json({
            success: false,
            message: "Password must contain at least 8 characters, one letter and one number",
        });
    }
    next();
};
export const chatCompletionValidator = [
    body("message").notEmpty().withMessage("Message is required"),
];
//# sourceMappingURL=validators.js.map