'use strict';

const { Router } = require('express');
const router = Router();

const { getAllOrders,
  getOneOrder,
  postOrder,
  putOrder,
  deleteOrder,
  getOrderProducts,
  putOrderProducts,
  deleteOrderProducts
} = require('../controllers/Order-Ctrl');

router.get('/orders', getAllOrders);
router.get('/orders/:id', getOrderProducts);
router.post('/orders', postOrder);
router.put('/orders/:id', putOrder);
router.delete('/orders/:id', deleteOrder);
// router.get('/orders/:id/products', getOrderProducts);
router.put('/orders/:id/products', putOrderProducts);
router.delete('/orders/:id/products', deleteOrderProducts);

module.exports = router;
