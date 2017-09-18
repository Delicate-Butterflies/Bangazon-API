'use strict';

const { dbGetAllPaymentTypes,
        dbGetOnePaymentType,
        dbDeleteOnePaymentType,
        dbPostPaymentType } = require('../models/Payment-Type');

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

module.exports.deletePaymentType = ({params: {id}}, res, next) => {
  dbDeleteOnePaymentType(id)
  .then(deleteConfirmation => res.status(200).json(deleteConfirmation))
  .catch(err => next(err));
};

module.exports.postPaymentType = (req, res, next) => {
  // console.log('req.body', req.body);
  dbPostPaymentType(req.body)
	.then( (paymentType) => {
		res.status(200).json(paymentType);
	})
	.catch( (err) => {
		next(err);
	});
};