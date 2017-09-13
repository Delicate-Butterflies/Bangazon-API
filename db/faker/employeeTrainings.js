'use strict';
// using Faker to generate a some departments
const faker = require('faker');

module.exports.generateEmployeeTrainings = (numEmployeeTrainings, numEmployees, numTrainingPrograms) => {
  let employeeTrainings = [];

  for (let i = 0; i < numEmployeeTrainings; i++) {
    let program_id = Math.floor(Math.random() * numTrainingPrograms) + 1;;
    let employee_id = Math.floor(Math.random() * numEmployees) + 1;;

    employeeTrainings.push({
      program_id,
      employee_id
    });
  }
  return employeeTrainings;
};
