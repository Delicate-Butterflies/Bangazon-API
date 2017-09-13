'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/bangazon.sqlite');

const { generateEmployees } = require('../faker/employees');

const { amounts: { numEmployees } } = require('../faker/generatorAmounts.json');

let employees = generateEmployees(numEmployees);

module.exports = () => {

  db.serialize(function() {
    
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
  
  });

};