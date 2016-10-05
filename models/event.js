const Sequelize = require('sequelize');
const sequelize = require('../database');

const Event = sequelize.define('event', {
  eventName: {
    type: Sequelize.STRING,
  },
  contractAddress: {
    type: Sequelize.STRING,
  },
  createDateTime: {
    type: Sequelize.DATE,
  },
  startDateTime: {
    type: Sequelize.DATE,
  },
  endDateTime: {
    type: Sequelize.DATE,
  },
  description: {
    type: Sequelize.STRING,
  },
  addressLine1: {
    type: Sequelize.STRING,
  },
  addressLine2: {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING,
  },
  state: {
    type: Sequelize.STRING,
  },
  zipPostalCode: {
    type: Sequelize.STRING,
  },
  country: {
    type: Sequelize.STRING,
  },
  image: {
    type: Sequelize.STRING,
  },
});

// force: true will drop the table if it already exists
Event.sync().then(() => {
  // Table created
  // return Event.create({
  //   firstName: 'John',
  //   lastName: 'Hancock'
  // });
});

module.exports = Event;
