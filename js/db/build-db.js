'use strict';

//will need to push this all to DB:
// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('db/mediaStore.sqlite');

const { generateTypes } = require('./product-types');
const { generateUsers } = require('./users');
const { generateProducts } = require('./products');
const { generateEmployees } = require('./employees');
const { generateDepartments } = require('./departments');
const { generatePaymentTypes } = require('./payment-types');
const { generateTrainingPrograms } = require('./training-programs');
const { generateOrders } = require('./orders');
const { generateComputers } = require('./computers');
//for each table, generate the number specified in generatorAmounts.json
const { amounts: {
  numComputers,
  numDepartments,
  numEmployees,
  numOrders,
  numPaymentTypes,
  numProductTypes,
  numProducts,
  numTrainingPrograms,
  numUsers
} } = require('./generatorAmounts.json');

//first argument will be the above return from amounts json
//create product types
let productTypes = generateTypes(numProductTypes);
// Create user collection...
let users = generateUsers(numUsers);
// Pass the users' length and the product types' length, (along with generator amount) into the function to create products, so we can randomly assign customer and product type ids to each product
let products = generateProducts(numProducts, productTypes.length, users.length);
let payments = generatePaymentTypes(numPaymentTypes, users.length);
let orders = generateOrders(numOrders, users.length, payments.length);

//same process for Bangazon company info:
let employees = generateEmployees(numEmployees);
let departments = generateDepartments(numDepartments, employees.length);
let trainingPrograms = generateTrainingPrograms(numTrainingPrograms);
let computers = generateComputers(numComputers);
