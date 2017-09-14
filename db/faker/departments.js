'use strict';
// using Faker to generate a some departments
const faker = require('faker');
const { amounts: { numDepartments, numEmployees } } = require('./generatorAmounts.json');

module.exports.generateDepartments = () => {
  let departments = [];

  //number of departments changes, must change corresponding value in employees.js department declaration
  //TODO - make a variable/argument for generation in both files
  for (let i = 0; i < numDepartments; i++) {
    let supervisor_employee_id = Math.floor(Math.random() * numEmployees) + 1;
    let expense_budget = faker.commerce.price() * 10;
    let name = faker.name.jobArea();

    departments.push({
      supervisor_employee_id,
      expense_budget,
      name
    });
  }
  return departments;
};
