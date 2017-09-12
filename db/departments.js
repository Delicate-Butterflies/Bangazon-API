'use strict';
// using Faker to generate a some departments
const faker = require('faker');

module.exports.generateDepartments = (employeeLength) => {
  let departments = [];

  for (let i = 0; i < 10; i++) {
    let supervisor_id = Math.floor(Math.random() * employeeLength) + 1;
    let budget = faker.commerce.price();
    let name = faker.lorem.sentence();

    departments.push({
      "supervisor_employee_id": supervisor_id,
      "expense_budget": budget,
      name
    });
  }
  return departments;
};
