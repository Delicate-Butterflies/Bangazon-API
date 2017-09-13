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

// first argument will be the above return from amounts json
// create product types
let productTypes = generateTypes();
// Create user collection...
let users = generateUsers();
// Pass the users' length and the product types' length, (along with generator amount) into the function to create products, so we can randomly assign customer and product type ids to each product

let payments = generatePaymentTypes(numPaymentTypes, users.length);
let orders = generateOrders(numOrders, users.length, payments.length);
let products = generateProducts(numProducts, productTypes.length, users.length);
//same process for Bangazon company info:
let employees = generateEmployees(numEmployees);
let departments = generateDepartments(numDepartments, employees.length);
let trainingPrograms = generateTrainingPrograms(numTrainingPrograms);
let computers = generateComputers(numComputers);

const createProduct = require('./table/product');

createProduct(products)
// .then( (data) => {
//   console.log("resolved data", data);
// })
