'use strict';

const { Router } = require('express');
const router = Router();

const { getUsers, getSingleUser, postUser, putUser } = require('../controllers/User-Ctrl');

router.get('/users', getUsers);
router.get('/users/:id', getSingleUser);
router.post('/users', postUser);
router.put('/users/:id', putUser);
module.exports = router;