module.exports = class QuestionDto {
    lesson_id;
    text;
    code;
    constructor(model) {
        this.lesson_id = model.lesson_id;
        this.text = model.text;
        this.code = model.code
    }
  };
  