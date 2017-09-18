'use strict';

const { dbGetAllPaymentTypes, dbGetOnePaymentType, dbPutPaymentType, dbDeleteOnePaymentType, dbPostPaymentType } = require('../models/Payment-Type');

module.exports.getPaymentTypes = (req, res, next) => {
  dbGetAllPaymentTypes()
  .then(allPaymentTypesData => res.status(200).json(allPaymentTypesData))
  .catch( (err) => {
    next(err);
  });
};

module.exports.getSinglePaymentType = (req, res, next) => {
  let id = req.params.id;
  dbGetOnePaymentType(id)
  .then(singlePaymentTypeData => res.status(200).json(singlePaymentTypeData))
  .catch( (err) => {
    next(err);
  });
};

module.exports.putPaymentType = (req, res, next) => {
  let id = req.params.id;
  dbPutPaymentType(req, id)
  .then( (editedPaymentType) => {
    res.status(200).json(editedPaymentType);
  })
  .catch( (err) => {
    next(err);
  });
};

module.exports.deletePaymentType = (req, res, next) => {
  let id = req.params.id;
  dbDeleteOnePaymentType(id)
  .then(deleteConfirmation => res.status(200).json(deleteConfirmation))
  .catch( (err) => {
    next(err);
  });
};

module.exports.postPaymentType = (req, res, next) => {
  dbPostPaymentType(req.body)
	.then( (newPaymentType) => {
		res.status(200).json(newPaymentType);
	})
	.catch( (err) => {
		next(err);
	});
};