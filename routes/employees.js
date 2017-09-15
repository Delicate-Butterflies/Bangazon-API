'use strict';

const { Router } = require('express');
const router = Router();

const { getEmployees, getSingleEmployee, postEmployee, putEmployee } = require('../controllers/Employee-Ctrl');

router.get('/employees', getEmployees);
router.get('/employees/:id', getSingleEmployee);
router.post('/employees', postEmployee);
router.put('/employees/:id', putEmployee);

module.exports = router;