'use strict';

const { Router } = require('express');
const router = Router();

// const { } = require('../controllers/Payment-Type-Ctrl');

router.get('/payment-type', getPaymentTypes);
router.get('/payment-type/:id', getSinglePaymentType);
router.post('/payment-type', postPaymentType);
router.put('/payment-type/:id', putPaymentType);
router.delete('/payment-type/:id', deletePaymentType);

module.exports = router;