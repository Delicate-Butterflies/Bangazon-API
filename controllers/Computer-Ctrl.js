'use strict';

const { dbGetAllComputers,
        dbGetOneComputer,
        dbDeleteOneComputer,
        dbPostComputer,
        dbPutComputer } = require('../models/Computer');

const { dbDeleteEmployeeComputers } = require('../models/Employee-Computer');

module.exports.getComputers = (req, res, next) => {
  dbGetAllComputers()
  .then( (computers) => {
    res.status(200).json(computers);
  })
  .catch( (err) => {
    next(err);
  });
};

module.exports.getSingleComputer = ({params: {id}}, res, next) =>{
  dbGetOneComputer(id)
  .then( (computer) => {
    res.status(200).json(computer);
  })
  .catch( (err) => {
    next(err);
  });
};

module.exports.deleteComputer = ({params: {id}}, res, next) => {
  dbDeleteOneComputer(id)
  .then((deleteConfirmation) => {
    res.status(200).json(deleteConfirmation);
  })
  .catch( (err) => {
    next(err);
  });
};

module.exports.postComputer = (req, res, next) => {
  dbPostComputer(req.body)
	.then( (computer) => {
		res.status(200).json(computer);
	})
	.catch( (err) => {
		next(err);
	});
};

module.exports.putComputer = (req, res, next) => {
  let id = req.params.id;
  dbPutComputer(req, id)
  .then( (editedComputerData) => {
    res.status(200).json(editedComputerData);
  })
  .catch( (err) => 
  next(err));
};