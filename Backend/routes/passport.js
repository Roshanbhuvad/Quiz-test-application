const express = require("express");
const passport = require("passport");
const GitHubStrategy = require("passport-github2");
const TwitterStrategy = require("passport-twitter");
const jwt = require("jsonwebtoken")
const secret = require("../jwt-config")

const User = require("../models/users")

const app = module.exports = express.Router();

function createToken(username) {
    return jwt.sign({
        user: username
    }, secret, {
        expiresIn: 60 * 60
    })
}

passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_PROD
    },
    function (accessToken, refreshToken, profile, done) {
        User.findOne({
            id: profile.id
        }, function (err, user) {
            if (err) {
                return done(err)
            }

            if (!user) {
                user = new User({
                    id: profile.id,
                    username: profile.displayName,
                });
                user.save(function (err) {
                    if (err) console.log(err);
                    return done(err, user);
                });
            } else {
                return done(err, user);
            }
        });
    }
));

app.get("/auth/github", passport.authenticate("github"));

// github callback

app.get("/auth/github/callback", passport.authenticate("github", {
        failureRedirect: "/login"
    }),
    function (req, res) {
        res.redirect("/account");
    });

app.post("/verify", function (req, res) {
    if (req.isAuthenticated()) {
        res.status(201).send({
            id_token: createToken(req.user.username),
            user: req.user.username
        });
    } else {
        res.redirect("/login")
    }
});

// handle logout in passport

app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/")
});