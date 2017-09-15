'use strict';

const { Router } = require('express');
const router = Router();

const { getSingleProductType, getProductType, postProductType, putProductType, deleteProductType } = require('../controllers/Product-Type-Ctrl');

router.get('/product-type', getProductType);
router.get('/product-type/:id', getSingleProductType);
router.post('/product-type', postProductType);
router.put('/product-type/:id', putProductType);
router.delete('/product-type/:id', deleteProductType);

module.exports = router;