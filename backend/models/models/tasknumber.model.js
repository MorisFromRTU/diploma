const Sequelize = require("sequelize");
const { sequelize } = require("../dbindex.js");
const Task = require('./task.model');

class TaskNumber extends Sequelize.Model { }

TaskNumber.init(
    {
        task_number: {
            type: Sequelize.INTEGER,
            unique: true,
            primaryKey: true
        },
    },
    {
        sequelize: sequelize,
        underscored: true,
        modelName: "taskNumber",
        timestamps: false,
        freezeTableName: true,
    }
);

TaskNumber.hasOne(Task, {
    foreignKey: 'task_number'
  });

module.exports = TaskNumber