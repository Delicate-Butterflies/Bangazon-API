'use strict';

// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('db/mediaStore.sqlite');

const { generateTypes } = require('./product-types');
const { generateUsers } = require('./users');
const { generateProducts } = require('./products');
const { generateEmployees } = require('./employees');
const { generateDepartments } = require('./departments');
const { generatePaymentTypes } = require('./payment-types');

//create product types
let productTypes = generateTypes();
console.log('productTypes', productTypes);
// Create customer collection...
let users = generateUsers();
console.log('users', users);
// Then pass its length, and the product types' length, into the function to create products,
// so we can randomly assign customer and product type ids to each product
let products = generateProducts(productTypes.length, users.length);
console.log('products', products);

let employees = generateEmployees();
console.log('employees', employees);

let departments = generateDepartments(productTypes.length, users.length);
console.log('departments', departments);

let payments = generatePaymentTypes(users.length);
console.log('payments', payments);
