'use strict';

const { dbGetAllUsers, dbGetOneUser, dbPostUser, dbPutUser  } = require('../models/User.js');

module.exports.getUsers = (req, res, next) => {
  dbGetAllUsers()
  .then( (userData) => {
    console.log("recieved");
    res.status(200).json(userData);
  })
  .catch( (err) => 
    next(err));
  };

  module.exports.getSingleUser = ({params: {id}}, res, next) => {
    dbGetOneUser(id)
    .then( (oneUserData) => {
      // console.log(oneUserData);
      res.status(200).json(oneUserData);
    })
    .catch( (err) => 
    next(err));
  };

  module.exports.postUser = ( req, res, next) => {
    let id = req.params.id;
    dbPostUser(req)
    .then( (newUserData) => {
      console.log(newUserData);
      res.status(200).json(newUserData);
    })
    .catch( (err) => 
    next(err));
  }
  module.exports.putUser = ( req, res, next) => {
    let id = req.params.id;
    dbPutUser(req, id)
    .then( (editedUserData) => {
      console.log(editedUserData);
      res.status(200).json(editedUserData);
    })
    .catch( (err) => 
    next(err));
  }
