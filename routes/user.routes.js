const express = require('express');
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const { UserModel } = require('../model/user.model');
const jwt = require("jsonwebtoken");
const { auth } = require('../middleware/auth.middleware');

userRouter.get("/", auth, (req, res) => {
    res.send("User Route");
})

userRouter.post("/register", async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
        const existingUser = await UserModel.findOne({ email: email });
        if (existingUser) {
            return res.status(400).send({message: "Email already in use!" });
        }
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                res.status(400).json({ message: err });
            }
            else {
                const user = new UserModel({
                    username, email, password: hash, role
                })
                await user.save();
                res.status(201).json({ msg: "Registration Successfull" });
            }
        })
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
})

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userID: user._id, username: user.username }, "masai")
                    res.status(200).json({ msg: "Login Successfull", token })
                } else {
                    res.status(400).json({ message: "Try Again After Sometime" });
                }
            })
        }
        else {
            res.status(400).json({ message: "Login UnSuccessfull" });
        }
    } catch (error) {
        res.status(400).json({ message: error });
    }
})

module.exports = {
    userRouter
}