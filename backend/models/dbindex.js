const dbConfig = require("../config/db.config")
const Sequelize = require('sequelize')
//Объект, отвечающий за настройки для подключения к базе данных
const sequelize = new Sequelize(dbConfig)

//Объект базы данных, который содержит в себе все нужные параметры и модели данных
const initDB = async () => {
  try {
    await sequelize.authenticate()
    //await sequelize.dropSchema('public', {})
    //await sequelize.createSchema('public', {})
    await sequelize.sync()
    console.log('Sequelize was initialized')
  } catch (error) {
    console.log(error)
    process.exit()
  }
};

module.exports = {
  sequelize,
  initDB,
};