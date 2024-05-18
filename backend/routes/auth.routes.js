import express from "express";
import {
    signup,
    login,
    logout,
    deleteUser,
    getProfile,
    resendEmail,
} from "../controllers/auth.controller.js";
import Token from "../models/token.js";
import User from "../models/user.model.js";

const router = express.Router();

router.post("/register", signup);

router.post("/login", login);

router.post("/logout", logout);

router.get("/profile/:username", getProfile);

router.post("/resendemail", resendEmail);

router.get("/confirm/:token", async (req, res) => {
    try {
        const token = await Token.findOne({ token: req.params.token });
        if (!token) {
            console.log(`Token not found: ${req.params.token}`);
            return res.status(400).send("Invalid token");
        }
        console.log(`Token found: ${token}`);
        await User.updateOne({ _id: token.userId }, { isVerified: true });
        res.redirect("/verified");
        await Token.findByIdAndDelete(token._id);
    } catch (error) {
        console.log(`Error in /confirm/:token: ${error.message}`);
        res.status(500).send("Server error");
    }
});

router.post("/delete", deleteUser);

export default router;
