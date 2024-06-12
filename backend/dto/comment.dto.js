module.exports = class QuestionDto {
    question_id;
    id;
    user_id;
    user_login;
    text;
    constructor(model) {
        this.question_id = model.question_id;
        this.id = model.id;
        this.user_id = model.user_id;
        this.user_login = model.user_login;
        this.text = model.text;
    }
  };
  