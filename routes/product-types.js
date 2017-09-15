'use strict';

const { Router } = require('express');
const router = Router();

const { getSingleProductType, getProductType, postProductType, putProductType, deleteProductType } = require('../controllers/Product-Type-Ctrl');

router.get('/product-types', getProductType);
router.get('/product-types/:id', getSingleProductType);
router.post('/product-types', postProductType);
router.put('/product-types/:id', putProductType);
router.delete('/product-types/:id', deleteProductType);

module.exports = router;