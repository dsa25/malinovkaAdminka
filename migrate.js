const { sequelize } = require("./database/connect")

// модели для синхронизации:

// const Users = require("./database/users")
// const Inspections = require("./database/inspections")
// const Sectors = require("./database/sectors")
// const Versions = require("./database/versions")

// синхронизация  бд c моделями
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("успешно update db ...")
  })
  .catch((err) => console.log(err))
