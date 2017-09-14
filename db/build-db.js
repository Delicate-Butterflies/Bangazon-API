'use strict';

// set up sqlite3 database
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/bangazon.sqlite');

// pull in functions to generate fake data:
const { generateTypes } = require('./faker/product-types');
const { generateUsers } = require('./faker/users');
const { generateProducts } = require('./faker/products');
const { generateEmployees } = require('./faker/employees');
const { generateDepartments } = require('./faker/departments');
const { generatePaymentTypes } = require('./faker/payment-types');
const { generateTrainingPrograms } = require('./faker/training-programs');
const { generateOrders } = require('./faker/orders');
const { generateComputers } = require('./faker/computers');
const { generateEmployeeTrainings } = require('./faker/employeeTrainings');
const { generateEmployeeComputers } = require('./faker/employeeComputers');

// generate arrays of faked data
let productTypes = generateTypes();
let users = generateUsers();
// following depend on previously generated arrays:
let products = generateProducts();
let payments = generatePaymentTypes();
let orders = generateOrders();
// same process for Bangazon company info:
let employees = generateEmployees();
let departments = generateDepartments();
let trainingPrograms = generateTrainingPrograms();
let computers = generateComputers();
//pass trainingPrograms into join table generation
let employeeTrainings = generateEmployeeTrainings(trainingPrograms);
let employeeComputers = generateEmployeeComputers();

db.serialize(function () {

  // COMPANY DB INFO
  // begin employee table creation
  db.run(`DROP TABLE IF EXISTS employees`);

  db.run(`CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY,
    department_id INT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone_number TEXT,
    job_title TEXT,
    street_address TEXT,
    city_address TEXT,
    state_code TEXT,
    zip_code INT)`
  );

  employees.forEach(({ department_id, first_name, last_name, phone_number, job_title, street_address, city_address, state_code, zip_code }) => {
    db.run(`INSERT INTO employees (department_id, first_name, last_name, phone_number, job_title, street_address, city_address, state_code, zip_code)
            VALUES (${department_id}, "${first_name}", "${last_name}", "${phone_number}", "${job_title}", "${street_address}", "${city_address}", "${state_code}", ${zip_code})`);
  });

  // begin training_program table creation
  db.run(`DROP TABLE IF EXISTS training_programs`);

  db.run(`CREATE TABLE IF NOT EXISTS training_programs (
    id INTEGER PRIMARY KEY,
    start_date TEXT,
    end_date TEXT,
    max_attendance INT,
    title TEXT)`
  );

  trainingPrograms.forEach(({ start_date, end_date, max_attendance, title }) => {
    db.run(`INSERT INTO training_programs (start_date, end_date, max_attendance, title)
            VALUES ("${start_date}", "${end_date}", ${max_attendance}, "${title}")`);
  });

  // begin department table creation
  db.run(`DROP TABLE IF EXISTS departments`);

  db.run(`CREATE TABLE IF NOT EXISTS departments (
    id INTEGER PRIMARY KEY,
    supervisor_employee_id INT,
    expense_budget INT NOT NULL,
    name TEXT NOT NULL)`
  );

  departments.forEach(({ supervisor_employee_id, expense_budget, name }) => {
    db.run(`INSERT INTO departments (supervisor_employee_id, expense_budget, name)
            VALUES (${supervisor_employee_id}, ${expense_budget}, "${name}")`);
  });

  // begin computer table creation
  db.run(`DROP TABLE IF EXISTS computers`);

  db.run(`CREATE TABLE IF NOT EXISTS computers (
    id INTEGER PRIMARY KEY,
    purchase_date TEXT NOT NULL,
    decommission_date TEXT,
    serial_number TEXT)`
  );

  computers.forEach(({ purchase_date, decommission_date, serial_number }) => {
    db.run(`INSERT INTO computers (purchase_date, decommission_date, serial_number)
            VALUES ("${purchase_date}", "${decommission_date}", "${serial_number}")`);
  });

  // begin employeeTraining table creation
  db.run(`DROP TABLE IF EXISTS employeesTrainings`);

  db.run(`CREATE TABLE IF NOT EXISTS employeesTrainings (
    id INTEGER PRIMARY KEY,
    program_id INT,
    employee_id INT)`
  );

  employeeTrainings.forEach(({ program_id, employee_id }) => {
    db.run(`INSERT INTO employeesTrainings (program_id, employee_id)
            VALUES (${program_id}, ${employee_id})`);
  });

  // begin employeeComputer table creation
  db.run(`DROP TABLE IF EXISTS employeesComputers`);

  db.run(`CREATE TABLE IF NOT EXISTS employeesComputers (
    id INTEGER PRIMARY KEY,
    employee_id INT,
    computer_id INT,
    assign_date TEXT,
    return_date TEXT)`
  );

  employeeComputers.forEach(({ employee_id, computer_id, assign_date, return_date }) => {
    db.run(`INSERT INTO employeesComputers (employee_id, computer_id, assign_date, return_date)
            VALUES (${employee_id}, ${computer_id}, '${assign_date}', '${return_date}')`);
  });

  // CUSTOMER DB INFO
  // orders:
  db.run(`DROP TABLE IF EXISTS orders`);

  db.run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY,
    customer_user_id INTEGER,
    payment_type_id INTEGER,
    order_date TEXT, FOREIGN KEY(customer_user_id) REFERENCES user(id) )`
  );

  orders.forEach(({ customer_user_id, payment_type_id, order_date }) => {
    db.run(`INSERT INTO orders (customer_user_id, payment_type_id, order_date)
            VALUES('${customer_user_id}', '${payment_type_id}', '${order_date}')`);
  });

  // payment types table
  db.run(`DROP TABLE IF EXISTS payment_types`);

  db.run(`CREATE TABLE payment_types (
    id INTEGER PRIMARY KEY,
    customer_user_id INTEGER,
    type TEXT,
    account_number TEXT, FOREIGN KEY(customer_user_id) REFERENCES user(id))`
  );

  payments.forEach(({ customer_user_id, type, account_number }) => {
    db.run(`INSERT INTO payment_types(customer_user_id, type, account_number)
            VALUES('${customer_user_id}', '${type}', '${account_number}')`);
  });

  // // product
  db.run(`DROP TABLE IF EXISTS products`);

  db.run(`CREATE TABLE IF NOT EXISTS products(
    id INTEGER PRIMARY KEY,
    product_type_id INTEGER,
    price REAL,
    title TEXT,
    description TEXT,
    original_quantity INTEGER,
    seller_user_id INTEGER,
    FOREIGN KEY(seller_user_id) REFERENCES product_type(id))`
  );

  products.forEach(({ type_id, price, title, description, original_quantity, seller_user_id }) => {
    db.run(`INSERT INTO products(product_type_id, price, title, description, original_quantity, seller_user_id)
            VALUES('${type_id}', '${price}', '${title}', '${description}', '${original_quantity}', '${seller_user_id}')`);
  });

  // users table
  db.run(`DROP TABLE IF EXISTS users`);

  db.run(`CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    account_created_date TEXT NOT NULL,
    last_login_date TEXT NOT NULL,
    street_address TEXT,
    city_address TEXT,
    state_code TEXT,
    zip_code TEXT )`);

  users.forEach(({ first_name, last_name, account_created_date, last_login_date, address_street, address_city, address_state, address_zip }) => {
    db.run(`INSERT INTO users (first_name, last_name, account_created_date, last_login_date, street_address, city_address, state_code, zip_code)
            VALUES("${first_name}", "${last_name}", '${account_created_date}', '${last_login_date}', "${address_street}",  "${address_city}", '${address_state}', '${address_zip}')`);
  });

  // product types table
  db.run(`DROP TABLE IF EXISTS product_types`);

  db.run(`CREATE TABLE product_types (
          id INTEGER PRIMARY KEY,
          name TEXT)`);

  productTypes.forEach(({ name }) => {
    db.run(`INSERT INTO product_types (name)
            VALUES('${name}')`);
  });

  // ordersProducts table
  db.run(`DROP TABLE IF EXISTS ordersProducts`);

  db.run(`CREATE TABLE ordersProducts (
          id INTEGER PRIMARY KEY,
          product_id INTEGER NOT NULL,
          order_id INTEGER NOT NULL,
          FOREIGN KEY(product_id) REFERENCES product(id),
          FOREIGN kEY(order_id) REFERENCES orders(id))`);

  const { amounts: { maxQuantity } } = require('./faker/generatorAmounts.json');
  orders.forEach((order, index) => {
    let order_id = index + 1;
    // choose one product out of the total number of products
    let randomProduct = Math.floor(Math.random() * products.length) + 1;
    // randomize the quantity ordered between 1 and an upper limit, from generatorAmounts.json
    let qty = Math.floor(Math.random() * maxQuantity) + 1;
    for (let i = 0; i < qty; i++) {
      db.run(`INSERT INTO ordersProducts (product_id, order_id)
            VALUES('${randomProduct}', ${order_id})`);
    }
  });

});
