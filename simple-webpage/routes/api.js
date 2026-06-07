const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

// Fixed JWT Secret
const JWT_SECRET = "mysecretkey123";

// =========================
// SIGNUP API
// =========================

router.post("/signupapi", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check for empty fields
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Check if username already exists
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({
                message: "Username already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({
            message: "User registered successfully"
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        });
    }
});

// =========================
// LOGIN API
// =========================

router.post("/loginapi", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user
        const user = await User.findOne({ username });

        console.log("Username entered:", username);
        console.log("User found:", user);

        if (!user) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        console.log("Password match:", isMatch);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        // Generate JWT
        const token = jwt.sign(
            {
                userId: user._id
            },
            JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.status(200).json({
            username: user.username,
            email: user.email,
            token: token
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        });
    }
});

// =========================
// VERIFY TOKEN MIDDLEWARE
// =========================

const verifyToken = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Unauthorized - Missing Token"
        });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, JWT_SECRET, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                message: "Unauthorized - Invalid Token"
            });
        }

        req.userId = decoded.userId;
        next();
    });
};

// =========================
// PROTECTED ROUTE
// =========================

router.get("/profile", verifyToken, (req, res) => {

    res.status(200).json({
        message: "Access Granted",
        userId: req.userId
    });

});

module.exports = router;