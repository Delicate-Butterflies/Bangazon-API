'use strict';

const { Router } = require('express');
const router = Router();

const { getAllOrders, getOneOrder } = require('../controllers/Order-Ctrl');

router.get('/order', getAllOrders);
router.get('/order/:id', getOneOrder);
// router.post('/order', postOrder);
// router.put('/order/:id', putOrder);
// router.delete('/order/:id', deleteOrder);

module.exports = router;
