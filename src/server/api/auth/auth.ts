import argon2 from "argon2";
import { Router } from "express";
import passport from "passport";
import { EMAIL_REGEX } from "../../constants";
import users from "../../database/models/user";

const auth = Router();

auth.post("/login", async (req, res) => {
    passport.authenticate("local", (error, user, info) => {
        if (error) return res.json(error);

        if (!user) return res.redirect("/login");

        return req.logIn(user, (error) => {
            if (error) return res.json(error);

            return res.redirect("/home");
        });
    })(req, res);
});

auth.put("/signup", async (req, res) => {
    console.log(req.body);

    const { email, password, username } = req.body;

    if (!email || !EMAIL_REGEX.test(email))
        return res.status(400).json({
            message: "Invalid email.",
        });

    if (!password)
        return res.status(400).json({
            message: "No password was provided.",
        });

    if (password.length < 4)
        return res.status(400).json({
            message: "Password must be at least 4 characters.",
        });

    if (!username)
        return res.status(400).json({
            message: "No username was provided.",
        });

    const user = await users.findOne({
        email,
    });

    if (user)
        return res.status(400).json({
            message: "User already exists.",
        });

    const hashedPassword = await argon2.hash(password);

    await users.create({
        email,
        password: hashedPassword,
        username,
        avatar:
            "https://images-ext-2.discordapp.net/external/2dZVVL6feMSM7lxfFkKVW__LToSOzmToSEmocJV5vcA/https/cdn.discordapp.com/embed/avatars/0.png",
    });

    return res.status(200).json({
        message: "You have signed up!",
    });
});

export default auth;
