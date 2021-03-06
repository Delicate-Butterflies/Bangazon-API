'use strict';

const { dbGetAllDepartments, dbGetOneDepartment, dbPostDepartment, dbPutDepartment } = require('../models/Department');

module.exports.getDepartments = (req, res, next) => {
	dbGetAllDepartments()
	.then( (departments) => {
		res.status(200).json(departments);
	})
	.catch( (err) => {
		next(err);
	});
};

module.exports.getSingleDepartment = (req, res, next) => {
	let id = req.params.id;
	dbGetOneDepartment(id)
	.then( (department) => {
		res.status(200).json(department);
	})
	.catch( (err) => {
		next(err);
	});
};

module.exports.postDepartment = (req, res, next) => {
	dbPostDepartment(req.body)
	.then( (newDepartment) => {
		res.status(200).json(newDepartment);
	})
	.catch( (err) => {
		next(err);
	});
};

module.exports.putDepartment = (req, res, next) => {
	dbPutDepartment(req.body, req.params.id)
	.then( (editedDepartments) => {
		res.status(200).json(editedDepartments);
	})
	.catch( (err) => {
		next(err);
	});
};