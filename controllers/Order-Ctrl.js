'use strict';

const { dbGetAllOrders, dbGetOneOrder, dbPostOrder, dbPutOrder, dbDeleteOrder, dbCreateNewOrder } = require('../models/Order.js');

module.exports.getAllOrders = (req, res, next) => {
  dbGetAllOrders()
    .then((orders) => {
      res.status(200).json(orders);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.getOneOrder = (req, res, next) => {
  dbGetOneOrder(req.params.id)
    .then((order) => {
      res.status(200).json(order);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.postOrder = (req, res, next) => {
  dbPostOrder(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.putOrder = (req, res, next) => {
  dbPutOrder(req.params.id, req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.deleteOrder = (req, res, next) => {
  dbDeleteOrder(req.params.id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      next(err);
    });
};
