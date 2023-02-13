const { sequelize } = require("./connect")
const { Sequelize, DataTypes } = require("sequelize")

const Users = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    fio: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  { timestamps: false }
)

module.exports = { Users }
