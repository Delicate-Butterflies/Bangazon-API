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
  dbgetOrderProducts
} = require('../models/Order-Product.js');

const { dbGetSingleProduct } = require('../models/Product.js');

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
      res.status(200).json(data);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.getOrderProducts = (req, res, next) => {
  dbGetOneOrder(req.params.id)
    .then((orderData) => {
      // console.log('orderData', orderData);
      dbgetOrderProducts(req.params.id)
        .then((orderProducts) => {
          // console.log("orderProducts", orderProducts);
          orderData.Products = [];
          orderProducts.forEach((product) => {
            console.log(product);
            dbGetSingleProduct(product.product_id)
              .then((productData) => {
                orderData.Products.push({
                  "product_id": product.product_id,
                  "quantity": product.quantity,
                  "name": productData.title,
                  "price": productData.price
                });
              })
              .catch((err) => {
                next(err);
              });
          });
          console.log('final order data', orderData);
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
