'use strict';
// using Faker to generate a some departments
const faker = require('faker');

const { amounts: {numEmployees, numComputers}} = require('./generatorAmounts.json');

module.exports.generateEmployeeComputers = () => {
  let employeeComputers = [];

  for (let i = 1; i <= numComputers; i++) {
    let employee_id = Math.floor(Math.random() * numEmployees) + 1;    
    let assign_date = faker.date.past().toISOString();
    //for testing return date will be start date + 30 days
    //TODO: make bulletproof way to ensure no overlapping timelines for the same computer
    let return_date = (faker.date.between(assign_date, faker.date.future()));

    if (new Date(return_date) > new Date()) {
      return_date = null;
    } else { 
      return_date = return_date.toISOString();
    }
    
    employeeComputers.push({
      employee_id,
      computer_id: i,
      assign_date,
      return_date
    });
  }
  return employeeComputers;
};
