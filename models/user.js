const Sequelize = require('sequelize');
const sequelize = require('../database');

var User = null;

const syncUser = () => {
  sequelize.authenticate().then(() => {
    User = sequelize.define('user', {
      username: {
        type: Sequelize.STRING,
      },
    });

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
