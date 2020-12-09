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

app.get('/api/v1/friends', (req, res) => {
  Friend
    .find()
    .then(friends => res.send(friends));
});

app.get('/api/v1/friends/:id', (req, res) => {
  Friend
    .findById(req.params.id)
    .then(friend => res.send(friend));
});

app.put('/api/v1/friends/:id', (req, res) => {
  Friend
    .update(req.params.id, req.body)
    .then(friend => res.send(friend));
});

app.delete('/api/v1/friends/:id', (req, res) => {
  Friend
    .delete(req.params.id)
    .then(friend => res.send(friend));
});

module.exports = app;
