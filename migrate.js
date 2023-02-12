const { sequelize } = require("./database/connect")

// модели для синхронизации

const Users = require("./database/users")
// const Inspection = require("./database/inspection")

// синхронизация  бд c моделями
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("успешно update db ...")
  })
  .catch((err) => console.log(err))
