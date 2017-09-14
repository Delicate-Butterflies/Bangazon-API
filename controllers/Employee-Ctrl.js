'use strict';

const { } = require('../models/Employee');

module.exports.getEmployees = (req, res, next) => {
	dbGetAllEmployees()
	.then( (employees) => {
		res.status(200).json(employees);
	})
	.catch( (err) => {
		next(err);
	});
};

