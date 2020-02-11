require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');

const app = express();
const JSONBodyParser = express.json();
const knex = require('knex');
const CommentsService = require('./CommentsService');


const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'dev';
app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

require('dotenv').config();
const knexInstance = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL
});

app.get('/api/comments', (req,res, next) => {
  CommentsService.getAllComments(knexInstance).then(data => {
    res.status(200).json(data);
  }).catch(next);
});

app.post('/api/comments', JSONBodyParser, (req, res, next) => {
  const { username, comment, date } = req.body;
  CommentsService.postComment(knexInstance, username, comment, date).then(data => {
    res.status(201).json(data);
  }).catch(next);
});

app.use(function errorHandler(error, req, res, next ){
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message : 'server error' } };
  } else {
    console.error(error);
    response = { message: error.message, error }
  }
  res.status(500).json(response);
});

module.exports = app;