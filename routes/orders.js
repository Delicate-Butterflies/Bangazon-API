'use strict';

const { Router } = require('express');
const router = Router();

// const { } = require('../controllers/Order-Ctrl');

router.get('/order', dbGetAllOrders);
router.get('/order/:id', dbGetOneOrder);
router.post('/order', postOrder);
router.put('/order/:id', putOrder);
router.delete('/order/:id', deleteOrder);

module.exports = router;
