import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import jwt from "jsonwebtoken"
import secret from "../jwt-config"
import uuid from "uuid-v4"
import dotenv from "dotenv"
dotenv.config();

import Quiz from "../models/quiz"
import Leaderboard from "../models/leaderboard"

const app = module.exports = express.Router();

// Get All quiz questions
app.get("/get-quizzes", (req, res) => {
    Quiz.find({}, (err, data) => {
        res.status(201).send(data);
    });

});




app.get("/get-leaders", (req, res) => {
    Leaderboard.find({}, (err, data) => {
        if (err) throw err;
        res.status(201).send(data);
    });

});

// Create one quiz question 
app.post("/save-quiz", (req, res) => {
    const {
        quiz: quizData,
        user,
        token
    } = req.body;
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            res.status(401).send("Only authorized users can create quizzes");
        } else {
            const quiz = new Quiz({
                author: user,
                title: quizData.title,
                id: uuid(),
                questions: quizData.questions
            });
            quiz.save((err) => {
                if (err) throw err;
                res.status(201).send("Submission Success!");
            });

        }
    });

});

app.post("/submit-score", (req, res) => {
    const {
        user,
        score,
        id,
        quiz
    } = req.body;
    Leaderboard.findOne({
        id: id
    }, (err, leaderboard) => {
        if (err) throw err;
        if (!leaderboard) {
            leaderboard = new Leaderboard({
                id,
                quiz,
                leaders: [{
                    user,
                    score
                }]
            });
            leaderboard.save((err) => {
                if (err) throw err;
                res.status(201).send("score saved!");
            });
        } else {
            const checkLeaders = leaderboard.leaders.filter((leader) => leader.user === user);
            if (checkLeaders.length === 0) {
                leaderboard.leaders.push({
                    user,
                    score
                });
                leaderboard.save((err) => {
                    if (err) throw err;
                    res.status(201).send("score saved!");
                });
            } else {
                res.status(401).send("Only your first score counts for the leaderboard!");
            }
        }
    });

});