const eventModel = require('./models/event.js');
const userModel = require('./models/user.js');
const userEvent = require('./models/userEvent.js');
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
      hostname: req.body.hostname
    })
    .then((event) => {
      console.log(`${event.eventName} added to DB`);
      fulfill(event);
    }).catch((err) => {
      reject(err);
    });
  }),
  getAllEvents: (req) => new Promise((fulfill, reject) => {
    const eventName = req.query.eventName ? `%${req.query.eventName}%` : '%%'; // %% are wildcard
    eventModel.findAll({
      where: {
        eventStartDateTime: {
          $gte: new Date(),
        },
        eventName: {
          $ilike: eventName,
        }
      },
    }).then((events) => {
      if (events) {
        fulfill(events);
      } else {
        reject('No events found');
      }
    });
  }),
  getAllHostEvents: (req) => new Promise((fulfill, reject) => {
    const hostName = req.query.hostName;
    eventModel.findAll({
      where: {
        hostname: {
          $ilike: hostName,
        }
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
    console.log(req.body.data.username);
    userModel.findOrCreate({
      where: {
        username: req.body.data.username,
      },
    }).spread((user, created) => { // TODO: check for multiple users
      if (user) {
        fulfill(user);
      } else {
        reject('No user found');
      }
    });
  }),
  addEventToUser: req => new Promise((fulfill, reject) => {
    userEvent.create({
      username: req.body.username,
      eventID: req.body.eventID,
      userWalletAddress: req.body.address,
    })
    .then((userEvent) => {
      console.log(`${userEvent} added to DB`);
      fulfill(event);
    }).catch((err) => {
      reject(err);
    });
  }),
  getTickets: (req) => new Promise((fulfill, reject) => {
    const userName = req.query.userName;
    userEvent.findAll({
      where: {
        username: {
          $ilike: userName,
        }
      },
    }).then((tickets) => {
      return Promise.map(tickets, function(ticket) {
        let test = eventModel.findOne({
          where: {
            id: ticket.eventID,
          },
        }).then((result) => {
          result.dataValues.userWalletAddress = ticket.userWalletAddress;
          return result;
        });
        return test;
      })
    })
    .then((result) => {
      if (result) {
        fulfill(result);
      } else {
        reject('No events found');
      }
    });
   }) 
};

module.exports = controller;
