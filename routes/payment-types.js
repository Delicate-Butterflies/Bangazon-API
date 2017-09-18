'use strict';

const { Router } = require('express');
const router = Router();

const { getPaymentTypes,
        getSinglePaymentType,
        deletePaymentType,
        postPaymentType } = require('../controllers/Payment-Type-Ctrl');

router.get('/payment-types', getPaymentTypes);
router.get('/payment-types/:id', getSinglePaymentType);
router.post('/payment-types', postPaymentType);
// router.put('/payment-type/:id', putPaymentType);
router.delete('/payment-types/:id', deletePaymentType);

module.exports = router;