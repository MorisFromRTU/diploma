const express = require('express')
const lessonRouter = express.Router()
const { asyncHandler, requireToken } = require("../middleware/middleware");
const {authCheck} = require('../middleware/auth.middleware');
const {createLesson, createModule, getLesson, getLessons, createTask, getTask, solveTask} = require('../controllers/lesson.controllers');

lessonRouter.post("/createLesson", asyncHandler(createLesson));
lessonRouter.post("/createModule", asyncHandler(createModule));
lessonRouter.get("/lessons", asyncHandler(authCheck), asyncHandler(getLessons));
lessonRouter.get("/lesson", asyncHandler(authCheck), asyncHandler(getLesson));
lessonRouter.post("/createTask", asyncHandler(createTask));
lessonRouter.get("/task", asyncHandler(authCheck), asyncHandler(getTask));
lessonRouter.post("/solveTask", asyncHandler(authCheck), asyncHandler(solveTask));

module.exports = lessonRouter