const Sequelize = require("sequelize");
const { sequelize } = require("../dbindex.js");

class Module extends Sequelize.Model { }

Module.init(
    {
        module_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        text: {
            type: Sequelize.STRING(3000),
        },
        code: {
            type: Sequelize.STRING(1500)
        }
    },
    {
        sequelize: sequelize,
        underscored: true,
        modelName: "module",
        timestamps: false,
        freezeTableName: true,
    }
);


module.exports = Module