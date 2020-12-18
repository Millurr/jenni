const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const User = require("../models/userModel");
const { json } = require('express');

// User registers account checks for password validations and hashes password securely
router.post("/register", async (req, res) => {
    try {
        let {email, password, passwordCheck, displayName} = req.body;

        //validate
        if (!email || !password || !passwordCheck)
            return res.status(400).json({msg: "Not all fields have been entered."});
        
        if (password.length < 5)
            return res.status(400).json({msg: "The password needs to be at least 5 characters long."});

        if (password !== passwordCheck)
            return res.status(400).json({msg: "The password does not equal password check"});

        const existingUser = await User.findOne({email: email});
        if (existingUser)
            return res.status(400).json({msg: "Account with this email already exists"});

        if (!displayName)
            displayName = email;

        const salt = await bcrypt.genSalt();
        const passHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            password: passHash,
            displayName
        });
        const savedUser = await newUser.save();
        res.json(savedUser);

    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

// User logs and and returns valid credentials
router.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;

        //validate
        if (!email || !password)
            return res.status(400).json({msg: "Not all fields have been entered."});

        const user = await User.findOne({ email: email });

        if (!user)
            return res.status(400).json({msg: "Email not registered."});

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch)
            return res.status(400).json({msg: "Invalid credentials."});
            
        const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN);
        res.json({
            token,
            user: {
                id: user._id,
                displayName: user.displayName,
                level: user.level
            },
        });

    }catch (err){
        res.status(500).json({ error: err.message });
    }
});

// Check for a valid token
router.post("/tokenIsValid", async (req, res) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.json(false);

        const verified = jwt.verify(token, process.env.JWT_TOKEN);
        if (!verified) return res.json(false);

        const user = await User.findById(verified.id);
        if (!user) return res.json(false);

        return res.json(true);
    }catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// For a user to change password at their own discrestion
router.post("/changepass", async (req, res) => {
    try {
        const {id, password, newPassword, newPasswordCheck} = req.body;
        const user = await User.findById({_id: id});

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch)
            return res.status(400).json({msg: "Invalid password."});

        //validate
        if (!newPassword || !newPasswordCheck)
            return res.status(400).json({msg: "Not all fields have been entered."});
        
        if (newPassword.length < 5)
            return res.status(400).json({msg: "The password needs to be at least 5 characters long."});

        if (newPassword !== newPasswordCheck)
            return res.status(400).json({msg: "The password does not equal password check"});

        const salt = await bcrypt.genSalt();
        const passHash = await bcrypt.hash(newPassword, salt);

        user.password = passHash;

        await user.save();

        res.json({
            displayName: user.displayName,
            id: user._id,
            level: user.level,
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Reset password to a hardcoded value for user to log in and reset
router.put("/resetpassword", auth, async(req, res) => {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_TOKEN);
    if (!verified) return res.json(false);

    const level = req.header('level');
    if (level !== "4") return res.status(400).json({msg: "You do not have valid permissions."});

    const user = await User.findById({_id: req.body.id});

    if (!user) return res.status(400).json({msg: "User not found."});

    let password = "passwd123";

    const salt = await bcrypt.genSalt();
    const passHash = await bcrypt.hash(password, salt);

    user.password = passHash;

    const updatedUser = await user.save();

    res.json({
        "message": "Password has been updated for " + updatedUser.displayName
    })
});

// Returns all users for an admin to modify and monitor accounts
router.get('/getallusers', auth, async(req, res) => {

    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_TOKEN);
    if (!verified) return res.json(false);

    const level = req.header('level');
    if (level !== "4") return res.status(400).json({msg: "You do not have valid permissions."});

    const users = await User.find().select('-password');
    res.json(users);
})

// Returns the logged in user
router.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user);
    
    res.json({
        displayName: user.displayName,
        id: user._id,
        level: user.level,
    });
});

// Deletes the currently logged in user
router.delete("/delete", auth, async(req, res) => {
    try {
        const deleteUser = await User.findByIdAndDelete(req.user);
        res.json(deleteUser);
    }catch(err) {

    }
});

router.delete("/asadmin/delete", async(req, res) => {

    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_TOKEN);
    if (!verified) return res.json(false);

    const level = req.header('level');
    if (level !== "4") return res.status(400).json({msg: "You do not have valid permissions."});

    const deleteUser = await User.findByIdAndDelete(req.body.id);

    res.json(deleteUser);
});

module.exports = router;