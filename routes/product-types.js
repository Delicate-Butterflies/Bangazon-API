'use strict';

const { Router } = require('express');
const router = Router();

// const { } = require('../controllers/Product-Type-Ctrl');

router.get('/product-type', getProductTypes);
router.get('/product-type/:id', getSingleProductType);
router.post('/product-type', postProductType);
router.put('/product-type/:id', putProductType);
router.delete('/product-type/:id', deleteProductType);

module.exports = router;