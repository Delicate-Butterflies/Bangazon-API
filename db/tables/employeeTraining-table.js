'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/bangazon.sqlite');

const { generateEmployeeTrainings } = require('../faker/employeeTrainings');

const { amounts: { numEmployeeTrainings, numEmployees, numTrainingPrograms } } = require('../faker/generatorAmounts.json');

let employeeTrainings = generateEmployeeTrainings(numEmployeeTrainings, numEmployees, numTrainingPrograms);

module.exports = (employeeTrainingsArray) => {

  return new Promise((resolve, return reject)=>{

    db.serialize(function () {

      db.run(`DROP TABLE IF EXISTS employeeTraining`);

      db.run(`CREATE TABLE IF NOT EXISTS employeeTraining (
        id INTEGER PRIMARY KEY,
        program_id INT,
        employee_id INT)`
      );

      employeeTrainingsArray.forEach(({ program_id, employee_id }) => {
        db.run(`INSERT INTO employeeTraining (program_id, employee_id)
                VALUES (${program_id}, ${employee_id})`);
      });

      db.close();

      resolve('employeeTraining table created and populated');

    });

  });

};
