import express from "express";
import passport from "passport";
import User from "../models/user.model.js";

const router = express.Router();

// Register route (plain text password)
router.post("/register", async (req, res) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password)
		return res.status(400).json({ message: "All fields are required" });

	const userExists = await User.findOne({ email });
	if (userExists)
		return res.status(400).json({ message: "User already exists" });

	const user = await User.create({ name, email, password });
	req.login(user, (err) => {
		if (err) return res.status(500).json({ message: "Login after register failed" });
		res.json({ user: { _id: user._id, name: user.name, email: user.email } });
	});
});

// Login route (passport local, plain text password, always returns JSON)
router.post("/login", (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (err) return next(err);
		if (!user) return res.status(401).json({ message: info?.message || "Unauthorized" });
		req.logIn(user, (err) => {
			if (err) return next(err);
			res.json({ user: { _id: user._id, name: user.name, email: user.email } });
		});
	})(req, res, next);
});

// Logout route
router.post("/logout", (req, res) => {
	req.logout(() => {
		res.json({ message: "Logged out" });
	});
});

// Get current user
router.get("/me", (req, res) => {
	if (!req.user) return res.status(401).json({ message: "Not authenticated" });
	res.json({ user: req.user });
});

// ✅ This line fixes your issue
export default router;
