// const mysql = require("mysql2/promise")
// require("dotenv").config()

const sqlite3 = require("sqlite3")
const { open } = require("sqlite")

const { Sequelize, DataTypes } = require("sequelize")

const file_db_sqlite = "./database/malina.db"

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     dialect: "mysql",
//     host: "localhost",
//   }
// )

// const pool = mysql.createPool({
//   connectionLimit: 5,
//   host: "localhost",
//   database: process.env.DB_NAME,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
// })

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: file_db_sqlite
})

const opn = async () => {
  return open({
    filename: file_db_sqlite,
    driver: sqlite3.Database
  })
}

module.exports = {
  //   pool,
  opn,
  sequelize
}
