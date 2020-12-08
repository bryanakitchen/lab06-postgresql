const express = require('express');
const app = express();
const Friend = require('./models/Friend');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.post('/api/v1/friends', (req, res) => {
  Friend
    .insert(req.body)
    .then(friend => res.send(friend));
});

module.exports = app;
