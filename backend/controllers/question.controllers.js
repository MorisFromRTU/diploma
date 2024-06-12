const e = require("express");
const Question = require("../models/models/token.model");
const User  = require("../models/models/user.model");
const ApiError = require("../exceptions/api-error");
const questionService = require("../services/question.service");
const tagService = require("../services/tag.service");

async function createQuestion(req, res, next) {
  try {
    const { title, description, tag } = req.body;
    if (!req.query.user_id) {
      return ApiError.BadRequest(`user_id ${user_id} не обнаружено`)
    }
    const com_count =  0;
    const newQuestion = await questionService.createQuestion(req.query.user_id, title, description, com_count, tag);
    if (!newQuestion){
        return ApiError.IncorrectInputError();
      }
    res.json(newQuestion);
  } catch (error) {
    console.log(error)
    next(error);
  }
}

async function getQuestions(req, res, next) {
    try {
      const questions = await questionService.getAllQuestions();
      return res.json(questions);
    } catch (error) {
      next(error);
    }
}

async function getQuestion(req, res, next){
  try{
    const question = await questionService.getQuestion(req.query.question_id);
    return res.json(question);
  }catch(error){
    next(error);
  }
}

async function getTags(req, res, next) {
    try {
      const tags = await tagService.getTags();
      return res.json(tags);
    } catch (error) {
      next(error);
    }
}

async function deleteQuestion(req, res, next) {
    try{
      const question = await questionService.deleteQuestion(req.query.user_id, req.query.question_id);
      return(res.json({"message" : "вопрос успешно удалён"}));
    } catch (error) {
      next(error);
    }
}

async function createComment(req, res, next) {
  try{
    const { question_id , text } = req.body;
    const comment = await questionService.createComment(req.query.user_id, req.query.user_login, question_id, text )
    return res.json(comment)
  }catch(error){
    next(error)
  }
}

async function deleteComment(req, res, next) {
  try{
    const comment = await questionService.deleteComment(req.query.user_id, req.query.question_id, req.query.comment_id)
    return(res.json({"message" : "комментарий успешно удалён"}));
  } catch (error) {
    next(error);
  }
}
  
module.exports = {
    createQuestion,
    getQuestions,
    getQuestion,
    getTags,
    deleteQuestion,
    createComment,
    deleteComment
}
