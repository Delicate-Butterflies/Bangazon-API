'use strict';

const { Router } = require('express');
const router = Router();

const { getAllOrders,
  getOneOrder,
  postOrder,
  putOrder,
  deleteOrder,
  getOrderProducts
} = require('../controllers/Order-Ctrl');

router.get('/orders', getAllOrders);
router.get('/orders/:id', getOneOrder);
router.post('/orders', postOrder);
router.put('/orders/:id', putOrder);
router.delete('/orders/:id', deleteOrder);
router.get('/orders/:id/products', getOrderProducts);

module.exports = router;
