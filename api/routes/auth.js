const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Register
router.post("/register", async (req, res) => {
	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPass = await bcrypt.hash(req.body.password, salt);
		const newUser = new User({
			username: req.body.username,
			email: req.body.email,
			password: hashedPass,
		});
		const user = await newUser.save();
		res.status(200).json(user);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Login
router.post("/login", async (req, res) => {
	try {
		const user = await User.findOne({ username: req.body.username });
		if (!user) {
			return res.status(404).json("Username is Wrong!");
		}

		const authenticated = await bcrypt.compare(
			req.body.password,
			user.password
		);
		console.log(authenticated, req.body.password.length, user.password.length);
		if (!authenticated) {
			return res.status(404).json("Password is Wrong!");
		}
            
            const { password, ...another } = user._doc;
		res.status(200).json(another);
	} catch (err) {
		res.status(400).json(err);
	}
});

module.exports = router;
