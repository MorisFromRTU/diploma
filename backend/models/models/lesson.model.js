const Sequelize = require("sequelize");
const { sequelize } = require("../dbindex.js");
const Module = require("./module.model.js");


class Lesson extends Sequelize.Model { }

Lesson.init(
    {
        lesson_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: sequelize,
        underscored: true,
        modelName: "lesson",
        timestamps: false,
        freezeTableName: true,
    }
);

Lesson.hasMany(Module, { foreignKey: "lesson_id"});

module.exports = Lesson