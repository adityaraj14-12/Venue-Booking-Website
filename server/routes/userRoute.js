const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const User = require("../models/user");

// Register Route
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });

    // Generate verification token
    const token = crypto.randomBytes(20).toString("hex");
    newUser.verificationToken = token;
    await newUser.save();

    // Send verification email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL, // replace with your email from .env
        pass: process.env.EMAIL_PASSWORD, // replace with your password from .env
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Account Verification",
      html: `Please click <a href="http://localhost:5000/api/users/verify/${token}">here</a> to verify your account.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        throw new Error("Failed to send verification email");
      } else {
        console.log("Email sent: " + info.response);
        res.send("Verification email sent. Please check your email.");
      }
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// Verify Route
router.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "User not found or already verified." });
    }
    user.isVerified = true;
    user.verificationToken = undefined; // Clear token after verification
    await user.save();
    res.redirect("/verified.html"); // Redirect to a page indicating successful verification
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }
    if (!user.isVerified) {
      return res.status(400).json({ message: "Please verify your email before logging in." });
    }
    res.send(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});
router.post("/getallusers", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});


module.exports = router;
