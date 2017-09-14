'use strict';

const { Router } = require('express');
const router = Router();

// const { } = require('../controllers/Order-Ctrl');

router.get('/order', getOrders);
router.get('/order/:id', getSingleOrder);
router.post('/order', postOrder);
router.put('/order/:id', putOrder);
router.delete('/order/:id', deleteOrder);

module.exports = router;