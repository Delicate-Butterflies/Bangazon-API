'use strict';

const { dbGetAllEmployees, dbGetOneEmployee, dbPostEmployee, dbPutEmployee } = require('../models/Employee');

module.exports.getEmployees = (req, res, next) => {
	dbGetAllEmployees()
	.then( (employees) => {
		res.status(200).json(employees);
	})
	.catch( (err) => {
		next(err);
	});
};

module.exports.getSingleEmployee = (req, res, next) => {
	let id = req.params.id;
	dbGetOneEmployee(id)
	.then( (employee) => {
		res.status(200).json(employee);
	})
	.catch( (err) => {
		next(err);
	});
};

module.exports.postEmployee = (req, res, next) => {
	dbPostEmployee(req.body)
	.then( (employees) => {
		res.status(200).json(employees);
	})
	.catch( (err) => {
		next(err);
	});
};

module.exports.putEmployee = (req, res, next) => {
	dbPutEmployee(req.body, req.params.id)
	.then( (employees) => {
		res.status(200).json(employees);
	})
	.catch( (err) => {
		next(err);
	});
};
