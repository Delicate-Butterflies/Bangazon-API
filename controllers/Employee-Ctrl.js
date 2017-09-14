'use strict';

const { dbGetAllEmployees, dbGetOneEmployee, dbPostEmployee } = require('../models/Employee');

module.exports.getEmployees = (req, res, next) => {
	dbGetAllEmployees()
	.then( (employees) => {
		res.status(200).json(employees);
	})
	.catch( (err) => {
		next(err);
	});
};

module.exports.getSingleEmployee = ({params: {id}}, res, next) => {
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
