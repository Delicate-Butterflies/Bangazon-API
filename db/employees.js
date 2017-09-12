'use strict';

// generate some employees with Faker
const faker = require('faker');

module.exports.generateEmployees = () => {
  let employees = [];

  for (let i = 0; i < 10; i++) {
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let phoneNumber = faker.phone.phoneNumberFormat();
    let email = faker.internet.email();
    let jobTitle = faker.name.jobType();
    //there are 10 departments currently, assign the employee to one
    let department_id = Math.floor(Math.random() * 10) + 1;


    employees.push({
      "first_name": firstName,
      "last_name": lastName,
      "phone": phoneNumber,
      "job_title": jobTitle,
      email,
      department_id
    });
  }

  return employees;
};
