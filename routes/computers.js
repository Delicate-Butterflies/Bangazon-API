'use strict';

const { Router } = require('express');
const router = Router();

const { getComputers, getSingleComputer, deleteComputer } = require('../controllers/Computer-Ctrl');

router.get('/computers', getComputers);
router.get('/computers/:id', getSingleComputer);
// router.post('/computers', postComputer);
// router.put('/computers/:id', putComputer);
router.delete('/computers/:id', deleteComputer);

module.exports = router;