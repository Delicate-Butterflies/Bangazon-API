'use strict';

const { Router } = require('express');
const router = Router();

const { getPaymentTypes,
        getSinglePaymentType,
        putPaymentType,
        deletePaymentType,
        postPaymentType } = require('../controllers/Payment-Type-Ctrl');

router.get('/payment-types', getPaymentTypes);
router.get('/payment-types/:id', getSinglePaymentType);
router.put('/payment-types/:id', putPaymentType);
router.post('/payment-types', postPaymentType);
router.delete('/payment-types/:id', deletePaymentType);

module.exports = router;