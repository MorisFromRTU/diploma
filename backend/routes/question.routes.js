const express = require('express')
const questionRouter = express.Router()
const { asyncHandler, requireToken } = require("../middleware/middleware");
const {authCheck} = require('../middleware/auth.middleware');
const {createQuestion, getQuestions, getTags, deleteQuestion, getQuestion, createComment, deleteComment} = require('../controllers/question.controllers');

questionRouter.post("/createQuestion", asyncHandler(authCheck), asyncHandler(createQuestion));
questionRouter.get("/questions", asyncHandler(getQuestions));
questionRouter.get("/question", asyncHandler(getQuestion));
questionRouter.get("/tags", asyncHandler(authCheck), asyncHandler(getTags));
questionRouter.delete("/question", asyncHandler(authCheck), asyncHandler(deleteQuestion));
questionRouter.post("/createComment", asyncHandler(authCheck), asyncHandler(createComment));
questionRouter.delete("/deleteComment", asyncHandler(authCheck), asyncHandler(deleteComment));

module.exports = questionRouter