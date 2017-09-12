'use strict';

// generate a bunch of customers with Faker
const faker = require('faker');

module.exports.generateUsers = (numUsers) => {
  let users = [];

  for (let i = 0; i < numUsers; i++) {
    let first_name = faker.name.firstName();
    let last_name = faker.name.lastName();
    let phone_number = faker.phone.phoneNumberFormat();
    let email = faker.internet.email();
    let address_street = faker.address.streetAddress();
    let address_city = faker.address.city();
    let address_state = faker.address.state();
    let address_zip = faker.address.zipCode();

    users.push({
      first_name,
      last_name,
      phone_number,
      address_street,
      address_city,
      address_state,
      address_zip,
      email
    });
  }

  return users;
};
