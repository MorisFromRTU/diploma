module.exports = class TaskDto {
    number;
    text;
    code;
    constructor(model) {
        this.task_number = model.number;
        this.text = model.text;
        this.code = model.code
    }
  };
  