'use strict';

const { Router } = require('express');
const router = Router();

// const { } = require('../controllers/Product-Ctrl');

router.get('/product', getProducts);
router.get('/product/:id', getSingleProduct);
router.post('/product', postProduct);
router.put('/product/:id', putProduct);
router.delete('/product/:id', deleteProduct);

module.exports = router;