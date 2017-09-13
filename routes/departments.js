
'use strict';

const { Router } = require('express');
const router = Router();

// const { } = require('../controllers/Department-Ctrl');

router.get('/department', getDepartments);
router.get('/department/:id', getSingleDepartment);
router.post('/department', postDepartment);
router.put('/department/:id', putDepartment);

module.exports = router;