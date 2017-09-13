'use strict';

const { Router } = require('express');
const router = Router();

// const { } = require('../controllers/Training-Program-Ctrl');

router.get('/training-program', getTrainingPrograms);
router.get('/training-program/:id', getSingleTrainingProgram);
router.post('/training-program', postTrainingProgram);
router.put('/training-program/:id', putTrainingProgram);
router.delete('/training-program/:id', deleteTrainingProgram);

module.exports = router;