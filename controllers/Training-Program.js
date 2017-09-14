'use strict';

const { dbPostTrainingProgram } = require('../models/Training-Program');

module.exports.postTrainingProgram = (req, res, next) => {
    dbPostTrainingProgram(req.body)
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((err) => {
            next(err);
        });
};