const { sequelize } = require("./connect")
const { Sequelize, DataTypes } = require("sequelize")

const Inspections = sequelize.define(
  "Inspections",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dateInspection: {
      type: DataTypes.STRING,
      allowNull: false
    },
    numberPU: {
      type: DataTypes.INTEGER,
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
    kpDay: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    kpNight: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    kpTotal: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    srcPhoto: {
      type: DataTypes.TEXT
    },
    notation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    active: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 1
    }
  },
  { timestamps: false }
)

module.exports = { Inspections }
