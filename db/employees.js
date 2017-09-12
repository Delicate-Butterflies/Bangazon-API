'use strict';

// generate a bunch of customers with Faker
const faker = require('faker');

module.exports.generateCustomers = () => {
  let customers = [];

  for (let i = 0; i < 25; i++) {
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let phoneNumber = faker.phone.phoneNumberFormat();
    let email = faker.internet.email();
    //let department_id = ();


    customers.push({
      "first_name": firstName,
      "last_name": lastName,
      "phone": phoneNumber,
      email,
      //department id
    });
  }

  return customers;
};
