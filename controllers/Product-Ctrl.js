'use strict';

const { dbGetAllProducts, dbGetSingleProduct, dbPostProduct, dbPutProduct, dbDeleteProduct } = require('../models/Product');

module.exports.getProducts = (req, res, next) => {
  dbGetAllProducts()
  .then( (products) => {
    res.status(200).json(products);
  })
  .catch( (err) => {
    next(err);
  });
};

module.exports.getSingleProduct = (req, res, next) => {
  let id = req.params.id;
  dbGetSingleProduct(id)
  .then( (product) => {
    res.status(200).json(product);
  })
  .catch( (err) => {
    next(err);
  });
};

module.exports.postProduct = (req, res, next) => {
  dbPostProduct(req.body)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.deleteProduct = (req, res, next) => {
  let id = req.params.id;
  dbDeleteProduct(id)
  .then((deleteConfirmation) => {
    res.status(200).json(deleteConfirmation);
  })
  .catch( (err) => {
    next(err);
  });
};

module.exports.putProduct = (req, res, next) => {
  let id = req.params.id;
  dbPutProduct(req, id)
  .then( (editedProduct) => {
    res.status(200).json(editedProduct);
  })
  .catch( (err) =>
  next(err));
};