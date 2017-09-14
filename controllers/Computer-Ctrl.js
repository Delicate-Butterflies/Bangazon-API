'use strict';

const { dbGetAllComputers } = require('../models/Computer');

module.exports.getComputers = (req, res, next) => {
  dbGetAllComputers()
  .then( (computers) => {
    res.status(200).json(computers);
  })
  .catch( (err) => {
    next(err);
  });
};