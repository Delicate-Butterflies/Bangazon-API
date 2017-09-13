'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/bangazon.sqlite');

const { generateEmployeeComputers } = require('../faker/employeeComputers');

const { amounts: { numEmployeeComputers, numEmployees, numComputers } } = require('../faker/generatorAmounts.json');

let employeeComputers = generateEmployeeComputers(numEmployeeComputers, numEmployees, numComputers);

module.exports = (employeeComputersArray) => {

  return new Promise((resolve, reject)=>{

    db.serialize(function() {
      
      db.run(`DROP TABLE IF EXISTS employeeComputer`);
    
      db.run(`CREATE TABLE IF NOT EXISTS employeeComputer (
        id INTEGER PRIMARY KEY,
        employee_id INT, 
        computer_id INT,
        assign_date TEXT,
        return_date TEXT)`
      );
    
      employeeComputersArray.forEach( ({employee_id, computer_id, assign_date, return_date}) => {
        db.run(`INSERT INTO employeeComputer (employee_id, computer_id, assign_date, return_date) 
                VALUES (${employee_id}, ${computer_id}, "${assign_date}", "${return_date}")`);
      });
  
      db.close();
  
      resolve('employeeComputer table created and populated');
    
    });

  });

};