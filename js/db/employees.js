'use strict';

// generate some employees with Faker
const faker = require('faker');

module.exports.generateEmployees = (numEmployees) => {
  let employees = [];

  for (let i = 0; i < numEmployees; i++) {
    let first_name = faker.name.firstName();
    let last_name = faker.name.lastName();
    let phone_number = faker.phone.phoneNumberFormat();
    let email = faker.internet.email();
    let job_title = faker.name.jobType();
    //there are 10 departments currently, assign the employee to one
    let department_id = Math.floor(Math.random() * 10) + 1;
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
