const eventModel = require('./models/event.js');
const userModel = require('./models/user.js');
const Promise = require('bluebird');

const controller = {
  findEvent: req => new Promise((fulfill, reject) => {
    eventModel.findOne({
      where: {
        eventName: req.query.eventName,
      },
    }).then((event) => {
      if (event) {
        fulfill(event);
      } else {
        reject('No events found');
      }
    });
  }),
  createEvent: req => new Promise((fulfill, reject) => {
    eventModel.create({
      eventName: req.body.eventName,
      contractAddress: req.body.contractAddress,
      createDateTime: req.body.createDateTime,
      startDateTime: req.body.startDateTime,
      endDateTime: req.body.endDateTime })
    .then((event) => {
      console.log(`${event.eventName} added to DB`);
      fulfill(event);
    }).catch((err) => {
      reject(err);
    });
  }),
  getAllEvents: () => new Promise((fulfill, reject) => {
    eventModel.findAll({
      where: {
        startDateTime: {
          $gte: new Date(),
        },
      },
    }).then((events) => {
      if (events) {
        fulfill(events);
      } else {
        reject('No events found');
      }
    });
  }),
  findOrCreateUser: req => new Promise((fulfill, reject) => {
    userModel.findOrCreate({
      where: {
        username: req.body.username,
      },
    }).spread((user, created) => { // TODO: check for multiple users
      if (user) {
        fulfill(user);
      } else {
        reject('No user found');
      }
    });
  }),
};

module.exports = controller;
