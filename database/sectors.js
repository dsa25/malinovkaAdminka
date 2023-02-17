const { sequelize } = require("./connect")
const { Sequelize, DataTypes } = require("sequelize")

const Sectors = sequelize.define(
  "Sectors",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    persNum: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nameVillage: {
      type: DataTypes.STRING,
      allowNull: false
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false
    },
    houseNum: {
      type: DataTypes.STRING,
      allowNull: false
    },
    litera: {
      type: DataTypes.STRING,
      allowNull: false
    },
    numberPU: {
      type: DataTypes.STRING,
      allowNull: false
    },
    typePU: {
      type: DataTypes.STRING,
      allowNull: false
    },
    datePU: {
      type: DataTypes.STRING,
      allowNull: false
    },
    active: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  },
  { timestamps: false }
)

module.exports = { Sectors }
