'use strict';
// using Faker to generate a some departments
const faker = require('faker');

const { amounts: {numEmployees, numTrainingPrograms}} = require('./generatorAmounts.json');

module.exports.generateEmployeeTrainings = () => {
  let employeeTrainings = [];

  for (let i = 1; i <= numTrainingPrograms; i++) {
    let employee_id = Math.floor(Math.random() * numEmployees) + 1;;

    employeeTrainings.push({
      program_id: i,
      employee_id
    });
  }
  return employeeTrainings;
};
