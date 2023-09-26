const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config'); // Ensure the path to your config.js file is correct

const Expense = sequelize.define('Expense', {
  // Define your model attributes here
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Expense;
