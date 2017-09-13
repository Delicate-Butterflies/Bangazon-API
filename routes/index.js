'use strict';

const { Router } = require('express');
const router = Router();

router.use(require('./api/v1/employee'));
router.use(require('./api/v1/department'));
router.use(require('./api/v1/computer'));
router.use(require('./api/v1/training-program'));
router.use(require('./api/v1/user'));
router.use(require('./api/v1/product-type'));
router.use(require('./api/v1/product'));
router.use(require('./api/v1/order'));
router.use(require('./api/v1/payment-type'));

// employee (GET, POST, PUT)
// department (GET, POST, PUT)
// computer (GET, POST, PUT, DELETE)
// training program (GET, POST, PUT, DELETE)
// user (GET, POST, PUT)
// product type (GET, POST, PUT, DELETE)
// product (GET, POST, PUT, DELETE)
// order (GET, POST, PUT, DELETE)
// payment type (GET, POST, PUT, DELETE)

module.exports = router;