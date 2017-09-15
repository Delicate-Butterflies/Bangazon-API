'use strict';

const { Router } = require('express');
const router = Router();

const { getProducts, getSingleProduct, postProduct, putProduct, deleteProduct } = require('../controllers/Product-Ctrl');

router.get('/products', getProducts);
router.get('/products/:id', getSingleProduct);
router.post('/products', postProduct);
router.put('/products/:id', putProduct);
router.delete('/products/:id', deleteProduct);

module.exports = router;