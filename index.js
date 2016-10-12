const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const dbController = require('./dbController');

const jsonParser = bodyParser.json();
const app = express();

const allowCrossDomain = (req, res, next) => { // enable CORS
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.header('Access-Control-Max-Age', 10);
  // intercept OPTIONS method
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
};

app.use(allowCrossDomain);

app.use(jsonParser);

app.post('/db/createEvent', (req, res) => {
  console.log('at db/createEvent:', req.body);
  dbController.createEvent(req)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.post('/db/updateEvent', (req, res) => {
  dbController.updateEvent(req)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
})

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

app.get('/db/getAllHostEvents', (req, res) => {
  dbController.getAllHostEvents(req)
    .then((events) => {
      res.status(200).send(events);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get('/db/getTickets', (req, res) => {
  dbController.getTickets(req)
    .then((tickets) => {
      res.status(200).send(tickets);
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

app.post('/db/addEventToUser', (req, res) => {
  dbController.addEventToUser(req)
      .then((user) => {
        res.status(200).send(user);
      })
      .catch((err) => {
        res.status(500).send(err);
      })
})

const server = app.listen(config.DB_SERVER_PORT, () => {
  console.log('Running on', config.DB_SERVER_PORT);
});

module.exports = server;
