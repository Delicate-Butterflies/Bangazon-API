'use strict';

const { Router } = require('express');
const router = Router();

router.use(require('./employees'));
router.use(require('./departments'));
router.use(require('./computers'));
router.use(require('./users'));
router.use(require('./training-programs'));
router.use(require('./payment-types'));

// router.use(require('./product-types'));
// router.use(require('./products'));
// router.use(require('./orders'));

router.get('/', (req, res) => {
    res.json({
        "employees": "GET or POST api/v1/employees",
        "employee": "GET or PUT api/v1/employees/:id",
        "departments": "GET or POST api/v1/departments",
        "department": "GET or PUT api/v1/departments/:id",
        "computers": "GET or POST api/v1/computers",
        "computer": "GET, PUT or DELETE api/v1/computers/:id",
        "training-programs": "GET or POST api/v1/training-programs",
        "training-program": "GET, PUT or DELETE api/v1/training-programs/:id",
        "users": "GET or POST api/v1/users",
        "user": "GET or PUT api/v1/users/:id",
        "product-types": "GET or POST api/v1/product-types",
        "product-type": "GET, PUT or DELETE api/v1/product-types/:id",
        "products": "GET or POST api/v1/products",
        "product": "GET, PUT or DELETE api/v1/products/:id",
        "orders": "GET or POST api/v1/orders",
        "order": "GET, PUT or DELETE api/v1/orders/:id",
        "payment-types": "GET or POST api/v1/payment-types",
        "payment-type": "GET, PUT or DELETE api/v1/payment-types/:id"
    });
});

module.exports = router;