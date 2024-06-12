const ModuleDto = require("../dto/module.dto");
const TaskDto = require("../dto/task.dto");
//const CommentDto = require("../dto/comment.dto");
const ApiError = require("../exceptions/api-error");
const Lesson = require("../models/models/lesson.model");
const Module = require("../models/models/module.model");
const Task = require("../models/models/task.model");
const TaskNumber = require("../models/models/tasknumber.model");

class LessonSerivce {
  async getAllLessons() {
    const lessons = await Lesson.findAll();
    console.log(lessons)
    return lessons;
  }

  async getLesson(lesson_id){
    const lesson = await Lesson.findByPk(lesson_id);
    if (!lesson){
      throw ApiError.BadRequest(
        `урока с id ${lesson_id} не существует`
      );
    }
    let modules = await Module.findAll({where : {lesson_id}});
    const lessons = await Lesson.findAll();
    return {
        lesson: lesson,
        modules: modules,
        lessons: lessons
    };
  }

  async createLesson(title){
    let lesson = await Lesson.create({
        title: title,
      });
    return {
        lesson: lesson,
    };
  }

  async createModule(lesson_id, text, code){
    let lesson = await Lesson.findByPk(lesson_id);
    if (!lesson) {
      throw ApiError.BadRequest(
        `урока с  ${lesson_id} не существует`
      );
    }

    let module = await Module.create({
      lesson_id: lesson_id,
      text: text,
      code: code,
    });

    const moduleDto = new ModuleDto(module);
    return {
        module: moduleDto,
    };
  }

  async createTask(task_number, text, code){
    let task = await TaskNumber.findOne({ where: { task_number } });
    if (task) {
      throw ApiError.BadRequest(
        `задача с таким номером ${task_number} уже существует`
      );
    };

    task = await Task.create({
      number: task_number,
      text: text,
      code: code,
    });

    let tasknumber = await TaskNumber.create({
      task_number: task_number,
    })

    const taskDto = new TaskDto(task);
    return {
        task: taskDto,
    };
  }

  async getTask(task_id){
    const task = await Task.findByPk(task_id);
    if (!task){
      throw ApiError.BadRequest(
        `задачи с id ${task_id} не существует`
      );
    }
    const task_numbers = await TaskNumber.findAll();
    const taskDto = new TaskDto(task);
    return {
        task: taskDto,
        task_numbers: task_numbers
    };
  }

  async solveTask(task_id, code){
    const task = await Task.findByPk(task_id);
    if (!task){
      throw ApiError.BadRequest(
        `задачи с id ${task_id} не существует`
      );
    }
    let answer = 'Задача решена верно';
    return {
      answer: answer,
    }
  }

}

module.exports = new LessonSerivce();
