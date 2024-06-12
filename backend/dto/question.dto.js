module.exports = class QuestionDto {
    title;
    description;
    user_login;
    question_id;
    comment_count;
    question_tag_title;
    constructor(model) {
        this.title = model.title;
        this.description = model.description;
        this.user_login = model.user_login
        this.question_id = model.question_id;
        this.comment_count = model.comment_count;
        this.tag = model.question_tag_title
    }
  };
  