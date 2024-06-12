const Sequelize = require("sequelize");
const { sequelize } = require("../dbindex.js");

class Token extends Sequelize.Model {}

Token.init(
  {
    id: {
      type: Sequelize.DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.DataTypes.UUIDV4,
    },
    refresh_token: {
      type: Sequelize.DataTypes.STRING(300),
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    underscored: true,
    modelName: "token",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Token;
