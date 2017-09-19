'use strict';

const { dbGetAllUsers, dbGetOneUser, dbPostUser, dbPutUser, dbGetInactiveUsers } = require('../models/User.js');

module.exports.getUsers = (req, res, next) => {
  let q = req.query;
  (q.active == 'false' ? dbGetInactiveUsers() : dbGetAllUsers())
  .then( (users) => {
    res.status(200).json(users);
  })
  .catch( (err) =>
    next(err));
  };

  module.exports.getSingleUser = (req, res, next) => {
    let id = req.params.id;
    dbGetOneUser(id)
    .then( (oneUserData) => {
      res.status(200).json(oneUserData);
    })
    .catch( (err) =>
      next(err));
  };

  module.exports.postUser = (req, res, next) => {
    let id = req.params.id;
    dbPostUser(req)
    .then( (newUserData) => {
      res.status(200).json(newUserData);
    })
    .catch( (err) =>
      next(err));
  };
  module.exports.putUser = (req, res, next) => {
    let id = req.params.id;
    dbPutUser(req, id)
    .then( (editedUserData) => {
      res.status(200).json(editedUserData);
    })
    .catch( (err) =>
      next(err));
  };

  module.exports.getUserOrders = (req, res, next) => {
    let id = req.params.id;
    let q = req.query;
    (q.active == 'open' ? dbGetUserOpenOrders() : dbGetUserOrders())
    .then((userOrderData) => {
      res.status(200).json(userOrderData);
    })
    .catch((err)=>{
      next(err)
    });
  };
