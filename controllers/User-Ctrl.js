'use strict';

const { dbGetAllUsers, dbGetOneUser, dbPutUser  } = require('../models/User.js');

module.exports = {
  getUsers: (res, req, next) => {
  dbGetAllUsers()
  .then( (userData) => {
    console.log("recieved");
    res.status(200).json(userData);
  })
  .catch( (err) => 
    next(err));
  },

  getSingleUser: ({params: {id}}, req, next) => {
    dbGetOneUser(id)
    .then( (oneUserData) => {
      console.log(oneUserData);
      res.status(200).json(oneUserData);
    })
    .catch( (err) => 
    next(err));
  },

  putUser: ( req, res, next) => {
    let id = req.params.id;
    console.log("body??", req.body);
    console.log("id??", id);
    dbPutUser(id, req)
    .then( (editedUserData) => {
      console.log(editedUserData);
      res.status(200).json(editedUserData);
    })
    .catch( (err) => 
    next(err));
  }
};