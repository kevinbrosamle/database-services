const Sequelize = require('sequelize');

const connectionString = `postgres://${process.env.DATABASEUSER || 'postgres'}:${process.env.DATABASEPASSWORD || 'password'}@${process.env.DATABASEADDRESS + process.env.DATABASEPORT || 'localhost:5432'}/tickether`;
console.log('connection string is: ', connectionString);
const sequelize = new Sequelize(connectionString);
sequelize
  .authenticate()
  .then((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Connection has been established successfully.');
    }
  })
  .catch((err) => {
    console.log('Unable to connect to the database:', err);
    setTimeout(connectDb, 10000); // try to reconnect after 10s
  });
}

connectDb();

module.exports = sequelize;
