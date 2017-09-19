'use strict';

const { Router } = require('express');
const router = Router();

router.use(require('./employees'));
router.use(require('./departments'));
router.use(require('./computers'));
router.use(require('./users'));
router.use(require('./training-programs'));
router.use(require('./payment-types'));
router.use(require('./products'));
router.use(require('./product-types'));
router.use(require('./orders'));

router.get('/', (req, res) => {
  res.json({
    "employees": "GET or POST api/v1/employees",
    "employee": "GET or PUT api/v1/employees/:id",
    "employeeBody": {
      "id": "INT: include on PUT only",
      "department_id": "INT",
      "first_name": "TEXT: NOT NULL",
      "last_name": "TEXT: NOT NULL",
      "phone_number": "TEXT",
      "job_title": "TEXT",
      "street_address": "TEXT",
      "city_address": "TEXT",
      "state_code": "TEXT",
      "zip_code": "INT"
    },
    "departments": "GET or POST api/v1/departments",
    "department": "GET or PUT api/v1/departments/:id",
    "departmentBody": {
      "id": "INT: include on PUT only",
      "supervisor_employee_id": "INT",
      "expense_budget": "INT: NOT NULL",
      "name": "TEXT: NOT NULL"
    },
    "computers": "GET or POST api/v1/computers",
    "computer": "GET, PUT or DELETE api/v1/computers/:id",
    "computerBody": {
      "id": "INT: on put only",
      "purchase_date": "TEXT NOT NULL",
      "decommission_date": "TEXT",
      "serial_number": "TEXT NOT NULL"
    },
    "training-programs": "GET or POST api/v1/training-programs",
    "training-program": "GET, PUT or DELETE api/v1/training-programs/:id",
    "trainingProgramBody": {
      "id": "INT: include on PUT only",
      "start_date": "TEXT",
      "end_date": "TEXT",
      "max_attendance": "INT",
      "title": "TEXT"
    },
    "users": "GET or POST api/v1/users",
    "user": "GET or PUT api/v1/users/:id",
    "userBody": {
      "id": "INT: put only",
      "first_name": "TEXT",
      "last_name": "TEXT",
      "account_created_date": "TEXT NOT NULL",
      "last_login_date": "TEXT NOT NULL",
      "street_address": "TEXT",
      "city_address": "TEXT",
      "state_code": "TEXT",
      "zip_code": "TEXT"
    },
    "product-types": "GET or POST api/v1/product-types",
    "product-type": "GET, PUT or DELETE api/v1/product-types/:id",
    "productTypeBody": {
      "id": "INT: PUT only",
      "name": "TEXT"
    },
    "products": "GET or POST api/v1/products",
    "product": "GET, PUT or DELETE api/v1/products/:id",
    "productBody": {
      "id": "INT: PUT only",
      "product_type_id": "INTEGER",
      "price": "REAL",
      "title": "TEXT",
      "description": "TEXT",
      "original_quantity": "INTEGER",
      "seller_user_id": "INTEGER"
    },
    "orders": "GET or POST api/v1/orders",
    "order": "GET, PUT or DELETE api/v1/orders/:id",
    "orderBody": {
      "id": "INT",
      "product_id": "INT: required for POST",
      "quantity": "INT: optional for POST, defaults to 1",
      "customer_user_id": "INTEGER: required for POST",
      "payment_type_id": "INTEGER: PUT - completes/close order",
      "order_date": "TEXT: PUT only include on payment update/order close",
      "Products": "GET only - an array of products on the order"
    },
    "products on specific order": "GET, PUT api/v1/orders/:id/products",
    "orderProductsBody": {
      "product_id": "INT: required on POST/PUT",
      "quantity": "INT: optional on POST/PUT, 1 by default; total quantity (not # added to current); 0 to remove product",
      "title": "TEXT: GET only",
      "price": "REAL: GET only"
    },
    "payment-types": "GET or POST api/v1/payment-types",
    "payment-type": "GET, PUT or DELETE api/v1/payment-types/:id",
    "paymentTypeBody": {
      "id": "INT: PUT only",
      "customer_user_id": "INTEGER",
      "type": "TEXT",
      "account_number": "INTEGER"
    },
    "inactive-customers": "GET api/v1/users/?active=false"
  });
});

module.exports = router;
