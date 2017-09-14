'use strict';

const { Router } = require('express');
const router = Router();

const { getEmployees } = require('../controllers/Employee-Ctrl');

router.get('/employee', getEmployees);
router.get('/employee/:id', getSingleEmployee);
router.post('/employee', postEmployee);
router.put('/employee/:id', putEmployee);

module.exports = router;