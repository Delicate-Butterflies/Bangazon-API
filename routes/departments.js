
'use strict';

const { Router } = require('express');
const router = Router();

const { getDepartments, getSingleDepartment, postDepartment, putDepartment } = require('../controllers/Department-Ctrl');

router.get('/departments', getDepartments);
router.get('/departments/:id', getSingleDepartment);
router.post('/departments', postDepartment);
router.put('/departments/:id', putDepartment);

module.exports = router;