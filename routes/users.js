'use strict';

const { Router } = require('express');
const router = Router();

const { getUsers, getSingleUser, postUser, putUser, getUserOrders } = require('../controllers/User-Ctrl');

router.get('/users', getUsers);
router.get('/users/:id', getSingleUser);
router.post('/users', postUser);
router.put('/users/:id', putUser);
router.get('/users/:id/orders', getUserOrders);

module.exports = router;