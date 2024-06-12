module.exports = {
    host: "localhost",
    port: 5432,
    dialect: "postgres",
    database: "junstudy",
    username: "postgres",
    password: "MORISGRISHA",
    models: [__dirname + "/models/*.model.*"],
    define: {
      freeTableName: true,
    },
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}
