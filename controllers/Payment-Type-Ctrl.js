'use strict';

const { dbGetAllPaymentTypes,
        dbGetOnePaymentType } = require('../models/Payment-Type');

module.exports.getPaymentTypes = (req, res, next) => {
  dbGetAllPaymentTypes()
  .then(allPaymentTypesData => res.status(200).json(allPaymentTypesData))
  .catch(err => next(err));
};

module.exports.getSinglePaymentType = ({params: {id}}, res, next) => {
  dbGetOnePaymentType(id)
  .then(singlePaymentTypeData => res.status(200).json(singlePaymentTypeData))
  .catch(err => next(err));
};