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

let payments = generatePaymentTypes(users.length);
let orders = generateOrders(users.length, payments.length);
let products = generateProducts( productTypes.length, users.length);
//same process for Bangazon company info:
let employees = generateEmployees();
let departments = generateDepartments( employees.length);
let trainingPrograms = generateTrainingPrograms();
let computers = generateComputers();



const makeOrders = require('./table/order-table')
const makeProducts = require('./table/product-table')
const makeOrderProducts = require('./table/order-product-table')

// makeProducts(products)
// .then( (data) => {
//   console.log("Recieved products?: ", data)
// })

// makeOrders(orders)
// .then( (data) => {
//   console.log("Recieved orders?: ", data);
// })
// .catch( (err) => {
//   console.log("Erroooorrrr:",err);
// })

// makeOrderProducts(orders, products)
// .then( (data) => {
//   console.log("Recieved join table?: ", data);
// })