const Sequelize = require('sequelize');
const sequelize = require('../database');

const UserEvents = sequelize.define('userEvents', {
  eventID: {
    type: Sequelize.INTEGER,
  },
  username: {
    type: Sequelize.STRING,
  },
});