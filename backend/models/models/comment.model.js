const Sequelize = require("sequelize");
const { sequelize } = require("../dbindex");
const Question = require('./question.model');
class Comment extends Sequelize.Model { }

Comment.init(
    {
        id: {
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
        },
        text: {
            type: Sequelize.STRING(300),
            allowNull: false,
        },
        user_id: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        user_login: {
            type: Sequelize.STRING,
        }
    },

    {
        sequelize: sequelize,
        underscored: true,
        modelName: "comment",
        timestamps: true,
        updatedAt: false,
        createdAt: 'creation_date',
    }
);


module.exports = Comment