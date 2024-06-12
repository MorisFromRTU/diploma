const Sequelize = require("sequelize");
const { sequelize } = require("../dbindex");
const Token = require('./token.model');
const UserInfo = require('./userInfo.model');
const Question = require('./question.model');
const Tag = require('./tag.model');

class User extends Sequelize.Model { }

User.init(
    {
        id: {
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
        },
        login: {
            type: Sequelize.STRING(15),
            allowNull: false,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING(50),
            allowNull: false,
            unique: true,
        },
    },

    {
        sequelize: sequelize,
        underscored: true,
        modelName: "user",
        timestamps: true,
        updatedAt: false,
        createdAt: 'registration_date',
    }
);

User.hasMany(Token, { foreignKey: "user_id" });
User.hasMany(UserInfo, { foreignKey: "user_id"});
User.hasMany(Question, { foreignKey: "user_id"});


module.exports = User