'use strict';
// using Faker to generate a some departments
const faker = require('faker');

module.exports.generateEmployeeComputers = (numEmployeeComputers, numEmployees, numComputers) => {
  let employeeComputers = [];

  for (let i = 0; i < numEmployeeComputers; i++) {
    let employee_id = Math.floor(Math.random() * numEmployees) + 1;    
    let computer_id = Math.floor(Math.random() * numComputers) + 1;
    let assign_date = faker.date.future().toISOString();
    //for testing return date will be start date + 30 days
    //TODO: make bulletproof way to ensure no overlapping timelines for the same computer
    let return_date = new Date(assign_date);
    return_date.setDate(return_date.getDate() + 30);
    return_date = return_date.toISOString();

    employeeComputers.push({
      employee_id,
      computer_id,
      assign_date,
      return_date
    });
  }
  return employeeComputers;
};
