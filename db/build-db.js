'use strict';

// will need to push this all to DB:
// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('db/mediaStore.sqlite');

const { generateTypes } = require('./faker/product-types');
const { generateUsers } = require('./faker/users');
const { generateProducts } = require('./faker/products');
const { generateEmployees } = require('./faker/employees');
const { generateDepartments } = require('./faker/departments');
const { generatePaymentTypes } = require('./faker/payment-types');
const { generateTrainingPrograms } = require('./faker/training-programs');
const { generateOrders } = require('./faker/orders');
const { generateComputers } = require('./faker/computers');

let productTypes = generateTypes();
let users = generateUsers();
// following depend on previously generated arrays:
let products = generateProducts(productTypes.length, users.length);
let payments = generatePaymentTypes(users.length);
let orders = generateOrders(users.length, payments.length);

// same process for Bangazon company info:
let employees = generateEmployees();
let departments = generateDepartments(employees.length);
let trainingPrograms = generateTrainingPrograms();
let computers = generateComputers();
