const Sequelize = require('sequelize');
const sequelize = require('../database');

const UserEvent = sequelize.define('userEvents', {
  eventID: {
    type: Sequelize.INTEGER,
  },
  username: {
    type: Sequelize.STRING,
  },
});

const syncUserEvent = () => {
  sequelize.authenticate().then(() => {
    // force: true will drop the table if it already exists
    UserEvent.sync().then(() => {
      // Table created
      // return Event.create({
      //   firstName: 'John',
      //   lastName: 'Hancock'
      // });
    });
  }).catch((err) => {
    console.log('Error:', err);
    setTimeout(syncUserEvent, 10000);
  });
}

syncUserEvent();

module.exports = UserEvent;