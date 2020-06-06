const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');

const vkRouter = require('./routes/vk');

const app = express();

app.use(logger('dev'));
app.use(express.json());

app.use('/vk', vkRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({message: err.message || 'Internal error'});
});

module.exports = app;
