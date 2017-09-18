'use strict';

const {
  dbGetAllOrders,
  dbGetOneOrder,
  dbPostOrder,
  dbPutOrder,
  dbDeleteOrder
} = require('../models/Order.js');

const {
  dbPostOrderProduct,
  dbOrderProductsWithInfo,
  dbPutOrderProduct,
  dbDeleteOrderProduct
} = require('../models/Order-Product.js');

module.exports.getAllOrders = (req, res, next) => {
  dbGetAllOrders()
    .then((orders) => {
      res.status(200).json(orders);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.postOrder = (req, res, next) => {
  // TODO if open order exists for customer, can't do this - add to open order
  if (!req.body.customer_user_id) {
    next('no customer_id');
  }
  if (!req.body.product_id) {
    next('no product_id');
  }
  dbPostOrder(req.body)
    .then((order_id) => {
      dbPostOrderProduct(req.body, order_id)
        .then((data) => {
          res.status(200).json(data);
        })
        .catch((err) => {
          next(err);
        });
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
      console.log(data);
      res.status(200).json(data);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.getOneOrder = (req, res, next) => {
  dbGetOneOrder(req.params.id)
    .then((orderData) => {
      dbOrderProductsWithInfo(req.params.id)
        .then((orderProductsWithInfo) => {
          orderData.Products = [];
          orderProductsWithInfo.forEach((product) => {
            orderData.Products.push(product);
          });
          res.status(200).json(orderData);
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.putOrderProducts = (req, res, next) => {
  let { product_id, quantity } = req.body;
  dbDeleteOrderProduct(req.params.id, product_id)
    .then((data) => {
      dbPutOrderProduct(req.params.id, product_id, quantity)
        .then((data) => {
          res.status(200).json(data);
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => { next(err); });
};
