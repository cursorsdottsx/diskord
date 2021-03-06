import argon2 from "argon2";
import passport from "passport";
import { Strategy } from "passport-local";
import { EMAIL_REGEX } from "../../constants";
import users from "../../database/models/user";

passport.serializeUser<string>(async (user, done) => {
    //@ts-ignore
    return done(undefined, user.email);
});

passport.deserializeUser<string>(async (email, done) => {
    try {
        const user = await users.findOne({
            email,
        });

        if (user) return done(undefined, user);

        return done(undefined, false);
    } catch (e) {
        console.log(e);
        return done(e, false);
    }
});

passport.use(
    new Strategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        async (email, password, done) => {
            try {
                if (!EMAIL_REGEX.test(email))
                    return done({ message: "Invalid email." }, undefined, { message: "Invalid email." });

                const user = await users.findOne({
                    email,
                });

                if (!user) return done({ message: "User doesn't exist." }, undefined, { message: "User doesn't exist." });

                if (!(await argon2.verify(user.password, password)))
                    return done({ message: "Password is incorrect." }, undefined, { message: "Password is incorrect." });

                return done(undefined, user);
            } catch (e) {
                console.log(e);
                return done(e, undefined);
            }
        }
    )
);
