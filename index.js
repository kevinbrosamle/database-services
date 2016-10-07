const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const dbController = require('./dbController');

const jsonParser = bodyParser.json();
const app = express();

app.use(jsonParser);

app.post('/db/createEvent', (req, res) => {
  dbController.createEvent(req)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
});

app.get('/db/findEvent', (req, res) => {
  dbController.findEvent(req)
    .then((event) => {
      res.status(200).send(event);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get('/db/getAllEvents', (req, res) => {
  dbController.getAllEvents(req)
    .then((events) => {
      res.status(200).send(events);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.post('/db/findOrCreateUser', (req, res) => {
  dbController.findOrCreateUser(req)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
});

const server = app.listen(config.DB_SERVER_PORT, () => {
  console.log('Running on', config.DB_SERVER_PORT);
});

module.exports = server;
