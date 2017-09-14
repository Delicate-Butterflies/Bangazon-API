'use strict';

const { dbGetAllOrders, dbGetOneOrder } = require('../models/Order.js');

module.exports.getOrders = (req, res, next) => {
  dbGetAllOrders()
    .then((orders) => {
      res.status(200).json(orders);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.getOneOrder = ({ params: { id } }, res, next) => {
  dbGetOneOrder(id)
    .then((order) => {
      res.status(200).json(order);
    })
    .catch((err) => {
      next(err);
    });
};
