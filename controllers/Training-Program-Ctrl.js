'use strict';

const { dbGetAllTrainingPrograms, dbGetOneTrainingProgram, dbPostTrainingProgram, dbDeleteOneTrainingProgram, dbPutTrainingProgram } = require('../models/Training-Program');

module.exports.getTrainingPrograms = (req, res, next) => {
  dbGetAllTrainingPrograms()
  .then( (trainingPrograms) => {
    res.status(200).json(trainingPrograms);
  })
  .catch( (err) => {
    next(err);
  });
};

module.exports.getSingleTrainingProgram = (req, res, next) =>{
  let id = req.params.id;
  dbGetOneTrainingProgram(id)
  .then( (oneTrainingProgram) => {
    res.status(200).json(oneTrainingProgram);
  })
  .catch( (err) => {
    next(err);
  });
};

module.exports.postTrainingProgram = (req, res, next) => {
  dbPostTrainingProgram(req.body)
    .then((newTrainingProgram) => {
      res.status(200).json(newTrainingProgram);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.deleteTrainingProgram = (req, res, next) => {
  let id = req.params.id;
  dbDeleteOneTrainingProgram(id)
  .then((deleteConfirmation) => {
    res.status(200).json(deleteConfirmation);
  })
  .catch( (err) => {
    next(err);
  });
};

module.exports.putTrainingProgram = (req, res, next) => {
  let id = req.params.id;
  dbPutTrainingProgram(req, id)
  .then( (editedTrainingProgram) => {
    res.status(200).json(editedTrainingProgram);
  })
  .catch( (err) =>
  next(err));
};