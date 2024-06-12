const Sequelize = require("sequelize");
const { sequelize } = require("../dbindex.js");

class Task extends Sequelize.Model { }

Task.init(
    {
        task_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        text: {
            type: Sequelize.STRING(3000),
        },
        code: {
            type: Sequelize.STRING(1500),
        },
        number: {
            type: Sequelize.INTEGER,
        }
    },
    {
        sequelize: sequelize,
        underscored: true,
        modelName: "task",
        timestamps: false,
        freezeTableName: true,
    }
);


module.exports = Task