'use strict';

const { dbGetAllComputers, dbGetOneComputer } = require('../models/Computer');

module.exports.getComputers = (req, res, next) => {
  dbGetAllComputers()
  .then( (computers) => {
    res.status(200).json(computers);
  })
  .catch( (err) => {
    next(err);
  });
};

module.exports.getSingleComputer = ({params: {id}}, res, next) =>{
  dbGetOneComputer(id)
  .then( (computer) => {
    res.status(200).json(computer);
  })
  .catch( (err) => {
    next(err);
  });
};