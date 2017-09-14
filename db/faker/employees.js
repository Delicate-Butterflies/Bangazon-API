'use strict';

// generate some employees with Faker
const faker = require('faker');
const { amounts: { numEmployees } } = require('./generatorAmounts.json');
const { amounts: { numDepartments } } = require('./generatorAmounts.json');

module.exports.generateEmployees = () => {
  let employees = [];

  for (let i = 0; i < numEmployees; i++) {
    let first_name = faker.name.firstName();
    let last_name = faker.name.lastName();
    let phone_number = faker.phone.phoneNumberFormat();
    let email = faker.internet.email();
    let job_title = faker.name.jobType();
    // assign employee to random department
    let department_id = Math.floor(Math.random() * numDepartments) + 1;
    let street_address = faker.address.streetAddress();
    let city_address = faker.address.city();
    let state_code = faker.address.stateAbbr();
    let zip_code = faker.address.zipCode();


    employees.push({
      first_name,
      last_name,
      phone_number,
      job_title,
      email,
      department_id,
      street_address,
      city_address,
      state_code,
      zip_code
    });
  }

  return employees;
};
