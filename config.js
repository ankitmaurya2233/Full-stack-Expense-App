const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: '1234',
  database: 'expense_tracker_db',
});

module.exports = sequelize;
