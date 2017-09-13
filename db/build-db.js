'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/bangazon.sqlite');

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

let productTypes = generateTypes();
let users = generateUsers();
// following depend on previously generated arrays:
let products = generateProducts(productTypes.length, users.length);
let payments = generatePaymentTypes(users.length);
let orders = generateOrders(users.length, payments.length);
//same process for Bangazon company info:
let employees = generateEmployees();
let departments = generateDepartments(employees.length);
let trainingPrograms = generateTrainingPrograms();
let computers = generateComputers();
let employeeTrainings = generateEmployeeTrainings(trainingPrograms);
let employeeComputers = generateEmployeeComputers();


db.serialize(function() {
  
  //begin employee table creation

  db.run(`DROP TABLE IF EXISTS employee`);
  
  db.run(`CREATE TABLE IF NOT EXISTS employee (
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

  employees.forEach( ({department_id, first_name, last_name, phone_number, job_title, street_address, city_address, state_code, zip_code}) => {
    db.run(`INSERT INTO employee (department_id, first_name, last_name, phone_number, job_title, street_address, city_address, state_code, zip_code) 
            VALUES (${department_id}, "${first_name}", "${last_name}", "${phone_number}", "${job_title}", "${street_address}", "${city_address}", "${state_code}", ${zip_code})`);
  });

  // begin training_program table creation

  db.run(`DROP TABLE IF EXISTS training_program`);
  
  db.run(`CREATE TABLE IF NOT EXISTS training_program (
    id INTEGER PRIMARY KEY,
    start_date TEXT, 
    end_date TEXT,
    max_attendance INT,
    title TEXT)`
  );

  trainingPrograms.forEach( ({start_date, end_date, max_attendance, title}) => {
    db.run(`INSERT INTO training_program (start_date, end_date, max_attendance, title) 
            VALUES ("${start_date}", "${end_date}", ${max_attendance}, "${title}")`);
  });

  // begin department table creation

  db.run(`DROP TABLE IF EXISTS department`);
  
  db.run(`CREATE TABLE IF NOT EXISTS department (
    id INTEGER PRIMARY KEY,
    supervisor_employee_id INT, 
    expense_budget INT NOT NULL,
    name TEXT NOT NULL)`
  );

  departments.forEach( ({supervisor_employee_id, expense_budget, name}) => {
    db.run(`INSERT INTO department (supervisor_employee_id, expense_budget, name) 
            VALUES (${supervisor_employee_id}, ${expense_budget}, "${name}")`);
  });

  // begin computer table creation

  db.run(`DROP TABLE IF EXISTS computer`);
  
  db.run(`CREATE TABLE IF NOT EXISTS computer (
    id INTEGER PRIMARY KEY,
    purchase_date TEXT NOT NULL, 
    decommission_date TEXT,
    serial_number TEXT)`
  );

  computers.forEach( ({purchase_date, decommission_date, serial_number}) => {
    db.run(`INSERT INTO computer (purchase_date, decommission_date, serial_number) 
            VALUES ("${purchase_date}", "${decommission_date}", "${serial_number}")`);
  });

  // begin employeeTraining table creation

  db.run(`DROP TABLE IF EXISTS employeeTraining`);
  
  db.run(`CREATE TABLE IF NOT EXISTS employeeTraining (
    id INTEGER PRIMARY KEY,
    program_id INT, 
    employee_id INT)`
  );

  employeeTrainings.forEach( ({program_id, employee_id}) => {
    db.run(`INSERT INTO employeeTraining (program_id, employee_id) 
            VALUES (${program_id}, ${employee_id})`);
  });

  // begin employeeComputer table creation

  db.run(`DROP TABLE IF EXISTS employeeComputer`);
  
  db.run(`CREATE TABLE IF NOT EXISTS employeeComputer (
    id INTEGER PRIMARY KEY,
    employee_id INT, 
    computer_id INT,
    assign_date TEXT,
    return_date TEXT)`
  );

  employeeComputers.forEach( ({employee_id, computer_id, assign_date, return_date}) => {
    db.run(`INSERT INTO employeeComputer (employee_id, computer_id, assign_date, return_date) 
            VALUES (${employee_id}, ${computer_id}, "${assign_date}", "${return_date}")`);
  });
  
});