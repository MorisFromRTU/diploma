const Sequelize = require("sequelize");
const { sequelize } = require("../dbindex.js");
const Comment = require("./comment.model.js");

class Question extends Sequelize.Model { }

Question.init(
    {
        question_id: {
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
        },
        title: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        description: {
            type: Sequelize.STRING(1500),
        },
        comment_count: {
            type: Sequelize.INTEGER,
        },
        user_login: {
            type: Sequelize.STRING(30),

        }
    },

    {
        sequelize: sequelize,
        underscored: true,
        modelName: "question",
        timestamps: false,
        freezeTableName: true,
    }
);

Question.hasMany(Comment, { foreignKey: "question_id"});

module.exports = Question