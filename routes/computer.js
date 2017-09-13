'use strict';

const { Router } = require('express');
const router = Router();

// const { } = require('../controllers/Computer-Ctrl');

router.get('/computer', getComputers);
router.get('/computer/:id', getSingleComputer);
router.post('/computer', postComputer);
router.put('/computer/:id', putComputer);
router.delete('/computer/:id', deleteComputer);

module.exports = router;