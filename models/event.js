const Sequelize = require('sequelize');
const sequelize = require('../database');

const Event = sequelize.define('event', {
  eventName: {
    type: Sequelize.STRING,
  },
  eventContractAddress: {
    type: Sequelize.STRING,
  },
  eventCreateDateTime: {
    type: Sequelize.DATE,
  },
  eventStartDateTime: {
    type: Sequelize.DATE,
  },
  eventEndDateTime: {
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
  price: {
    type: Sequelize.FLOAT,
  },
  quota: {
    type: Sequelize.INTEGER,
  },
  hostname: {
    type: Sequelize.STRING
  },
  latitude: {
    type: Sequelize.DOUBLE,
  },
  longitude: {
    type: Sequelize.DOUBLE,
  },
});

const syncEvent = () => {
  sequelize.authenticate().then(() => {

    // force: true will drop the table if it already exists
    Event.sync().then(() => {
      // Table created
      // return Event.create({
      //   firstName: 'John',
      //   lastName: 'Hancock'
      // });
    });
  }).catch((err) => {
    console.log('Error:', err);
    setTimeout(syncEvent, 10000);
  });
};

syncEvent();

module.exports = Event;
