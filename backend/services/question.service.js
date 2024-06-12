const User = require("../models/models/user.model");
const userService = require("./user.service");
const UserDto = require("../dto/user.dto");
const QuestionDto = require("../dto/question.dto");
const CommentDto = require("../dto/comment.dto");
const ApiError = require("../exceptions/api-error");
const Question = require("../models/models/question.model");
const Tag = require("../models/models/tag.model");
const Comment = require("../models/models/comment.model");

class QuestionService {
  async getAllQuestions() {
    const questions = await Question.findAll();
    console.log(questions)
    return questions;
  }

  async getQuestion(question_id){
    const question = await Question.findByPk(question_id);
    if (!question){
      throw ApiError.BadRequest(
        `вопроса с id ${question_id} не существует`
      );
    }
    let comments = await Comment.findAll({where : {question_id}})
    let questionDto = new QuestionDto(question);
    const com_count = await Comment.count({  where: { question_id }});
    questionDto.comment_count = com_count;
    return {
      question: questionDto,
      comments: comments,
    };
  }

  async createQuestion(user_id, title, description, com_count, tag){
    let check_tag = await Tag.findByPk(tag);
    if (!check_tag) {
        throw ApiError.BadRequest(
          `тэга ${check_tag} не существует`
        );
      }
    let user = await User.findByPk(user_id);
    if (!user) {
      throw ApiError.BadRequest(
        `пользователя с  ${user_id} не существует`
      );
    }
    let question = await Question.create({
        user_id: user_id,
        user_login: user.dataValues.login,
        title: title,
        description: description,
        comment_count: com_count,
        tagTitle: tag,
        question_tag_title: tag,
      });
    const questionDto = new QuestionDto(question);
    return {
        question: questionDto,
        author: user_id
    };
  }

  async deleteQuestion(user_id, question_id){
    let question = await Question.findByPk(question_id)
    if (!question) {
        throw ApiError.BadRequest(
          `вопроса ${question} не существует`
        );
    }
    if (question.dataValues.user_id != user_id) {
        throw ApiError.BadRequest(
          `удалять можно только свои вопросы`
        );
    }
    question.destroy();
  }

  async createComment(user_id, user_login, question_id, text){
    let user = await User.findByPk(user_id);
    if (!user) {
      throw ApiError.BadRequest(
        `пользователя с  ${user_id} не существует`
      );
    }

    let comment = await Comment.create({
      user_id: user_id,
      text: text,
      question_id: question_id,
      user_login: user_login
    });

    let question = await Question.findOne({ where: { question_id } });
    if (!question) {
      throw ApiError.BadRequest(
        `вопрос с таким question_id ${question} не был найден`
      );
    }
    const questionDto = new QuestionDto(question);
    await question.update({ comment_count: questionDto.comment_count + 1 }, { where: question_id });  
    const commentDto = new CommentDto(comment);
    return {
        comment: commentDto,
    };
  }

  async deleteComment(user_id, question_id, comment_id){
    let comment = await Comment.findByPk(comment_id)
    if (!comment_id) {
        throw ApiError.BadRequest(
          `комментария ${comment_id} не существует`
        );
    }
    if (comment.dataValues.user_id != user_id) {
        throw ApiError.BadRequest(
          `удалять можно только свои вопросы`
        );
    }
    let question = await Question.findOne({ where: { question_id } });
    if (!question) {
      throw ApiError.BadRequest(
        `вопрос с таким question_id ${question} не был найден`
      );
    }
    const questionDto = new QuestionDto(question);
    await question.update({ comment_count: questionDto.comment_count - 1 }, { where: question_id });  
    comment.destroy();
  }
}

module.exports = new QuestionService();
