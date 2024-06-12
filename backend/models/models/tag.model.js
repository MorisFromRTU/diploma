const Sequelize = require("sequelize");
const { sequelize } = require("../dbindex.js");
const Question = require('./question.model');

class Tag extends Sequelize.Model { }

Tag.init(
    {
        title: {
            type: Sequelize.STRING(50),
            unique: true,
            primaryKey: true
        },
    },
    {
        sequelize: sequelize,
        underscored: true,
        modelName: "tag",
        timestamps: false,
        freezeTableName: true,
    }
);

Tag.hasMany(Question, { as: "tag_questions" });
Question.belongsTo(Tag, {
  foreignKey: "question_tag_title",
  as: "question_tag",
});

module.exports = Tag