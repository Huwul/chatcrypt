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
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const token = await Token.findOne({ token: req.params.token });
        if (!token) {
            console.log(`Token not found: ${req.params.token}`);
            throw new Error("Invalid token");
        }
        console.log(`Token found: ${token}`);
        await User.updateOne({ _id: token.userId }, { isVerified: true });
        await Token.findByIdAndDelete(token._id);
        await session.commitTransaction();
        res.redirect("/verified");
    } catch (error) {
        await session.abortTransaction();
        console.log(`Error in /confirm/:token: ${error.message}`);
        res.status(500).send("Server error");
    } finally {
        session.endSession();
    }
});

router.post("/delete", deleteUser);

export default router;
