'use strict';

const { Router } = require('express');
const router = Router();

// const { } = require('../controllers/User-Ctrl');

router.get('/user', getUsers);
router.get('/user/:id', getSingleUser);
router.post('/user', postUser);
router.put('/user/:id', putUser);

module.exports = router;