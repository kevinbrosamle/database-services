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
      eventContractAddress: req.body.contractAddress,
      eventCreateDateTime: req.body.createDateTime,
      eventStartDateTime: req.body.startDateTime,
      eventEndDateTime: req.body.endDateTime,
      description: req.body.description,
      addressLine1: req.body.addressLine1,
      addressLine2: req.body.addressLine2,
      city: req.body.city,
      state: req.body.state,
      zipPostalCode: req.body.zipPostalCode,
      country: req.body.country,
      image: req.body.image,
      price: req.body.price,
      quota: req.body.quota,
    })
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
        eventStartDateTime: {
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
