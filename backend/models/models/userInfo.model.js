const Sequelize = require("sequelize");
const { sequelize } = require("../dbindex.js");

class UserInfo extends Sequelize.Model { }

UserInfo.init(
    {
        userinfo_id: {
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
        },
        description: {
            type: Sequelize.STRING(500),
        },
        address: {
            type: Sequelize.STRING(100),
        },
        education_rating: {
            type: Sequelize.INTEGER,
        },
        education: {
            type: Sequelize.STRING(100)
        }
    },

    {
        sequelize: sequelize,
        underscored: true,
        modelName: "userInfo",
        timestamps: false,
        freezeTableName: true,
    }
);

module.exports = UserInfo