'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/bangazon.sqlite');

const { generateDepartments } = require('../faker/departments');

const { amounts: { numDepartments, numEmployees } } = require('../faker/generatorAmounts.json');

let departments = generateDepartments(numDepartments, numEmployees);

module.exports = () => {

  db.serialize(function() {
    
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
  
  });

};