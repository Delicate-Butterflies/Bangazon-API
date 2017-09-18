'use strict';

const { dbGetAllProductTypes, dbGetOneProductType, dbPostProductType, dbPutProductType, dbDeleteProductType  } = require('../models/Product-Type.js');

module.exports.getProductTypes = (req, res, next) => {
  dbGetAllProductTypes()
  .then( (ProductTypeData) => {
    res.status(200).json(ProductTypeData);
  })
  .catch( (err) =>
    next(err));
  };

module.exports.getSingleProductType = (req, res, next) => {
  let id = req.params.id;
  dbGetOneProductType(id)
  .then( (oneProductTypeData) => {
    res.status(200).json(oneProductTypeData);
  })
  .catch( (err) =>
    next(err));
};

module.exports.postProductType = (req, res, next) => {
  let id = req.params.id;
  dbPostProductType(req)
  .then( (newProductTypeData) => {
    res.status(200).json(newProductTypeData);
  })
  .catch( (err) =>
    next(err));
};
module.exports.putProductType = (req, res, next) => {
  let id = req.params.id;
  dbPutProductType(req, id)
  .then( (editedProductTypeData) => {
    res.status(200).json(editedProductTypeData);
  })
  .catch( (err) =>
    next(err));
};
module.exports.deleteProductType = (req, res, next) => {
  let id = req.params.id;
  dbDeleteProductType(id)
  .then( (deletedProductTypeData) => {
    res.status(200).json(deletedProductTypeData);
  })
  .catch( (err) =>
    next(err));
};