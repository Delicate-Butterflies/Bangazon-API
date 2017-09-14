'use strict';

const { Router } = require('express');
const router = Router();

const { postTrainingProgram } = require('../controllers/Training-Program');

// router.get('/training-programs', getTrainingPrograms);
// router.get('/training-programs/:id', getSingleTrainingProgram);
router.post('/training-programs', postTrainingProgram);
// router.put('/training-programs/:id', putTrainingProgram);
// router.delete('/training-programs/:id', deleteTrainingProgram);

module.exports = router;