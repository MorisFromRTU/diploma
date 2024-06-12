const e = require("express");
const Module = require("../models/models/module.model");
const Lesson  = require("../models/models/lesson.model");
const ApiError = require("../exceptions/api-error");
const lessonService = require("../services/lesson.service");

async function createLesson(req, res, next) {
  try {
    const { title} = req.body;
    const newLesson = await lessonService.createLesson(title);
    if (!newLesson){
        return ApiError.IncorrectInputError();
    }
    res.json(newLesson);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function getLessons(req, res, next) {
    try {
      const lessons = await lessonService.getAllLessons();
      return res.json(lessons);
    } catch (error) {
      next(error);
    }
}

async function getLesson(req, res, next){
  try{
    const lesson = await lessonService.getLesson(req.query.lesson_id);
    return res.json(lesson);
  }catch(error){
    next(error);
  }
}


async function createModule(req, res, next) {
  try{
    const { lesson_id , text, code } = req.body;
    const module = await lessonService.createModule(lesson_id, text, code);
    if (!module){
        return ApiError.IncorrectInputError();
    }
    return res.json(module)
  }catch(error){
    next(error)
  }
}
  async function getTask(req, res, next){
    try{
      const task = await lessonService.getTask(req.query.task_id);
      return res.json(task);
    }catch(error){
      next(error);
    }
  }
  
  
  async function createTask(req, res, next) {
    try{
      const { task_number , text, code } = req.body;
      const task = await lessonService.createTask(task_number, text, code);
      if (!task){
          return ApiError.IncorrectInputError();
      }
      return res.json(task)
    }catch(error){
      next(error)
    }    
  }

  async function solveTask(req, res, next) {
    try{
      const task = await lessonService.solveTask(req.query.task_id, req.body.code);
      if (!task){
          return ApiError.IncorrectInputError();
      }
      return res.json(task)
    }catch(error){
      next(error)
    }    
  }
  
module.exports = {
    createLesson,
    getLessons,
    getLesson,
    createModule,
    getTask,
    createTask,
    solveTask,
}
