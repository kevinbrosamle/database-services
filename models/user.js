const Sequelize = require('sequelize');
const sequelize = require('../database');

const User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
  },
});

const syncUser = () => {
  sequelize.authenticate().then(() => {
    // force: true will drop the table if it already exists
    User.sync().then(() => {
      // Table created
      // return Event.create({
      //   firstName: 'John',
      //   lastName: 'Hancock'
      // });
    });
  }).catch((err) => {
    console.log('Error:', err);
    setTimeout(syncUser, 10000);
  });
}

syncUser();

module.exports = User;
