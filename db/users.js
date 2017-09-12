'use strict';

// generate a bunch of customers with Faker
const faker = require('faker');

module.exports.generateUsers = () => {
  let users = [];

  for (let i = 0; i < 10; i++) {
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let phoneNumber = faker.phone.phoneNumberFormat();
    let email = faker.internet.email();
    // let address_street = faker.address.streetAddress();
    // let address_city = faker.address.city();
    // let address_state = faker.address.state();
    // let address_zip = faker.address.zipCode();

    users.push({
      "first_name": firstName,
      "last_name": lastName,
      "phone": phoneNumber,
      // address_street,
      // address_city,
      // address_state,
      // address_zip,
      email
    });
  }

  return users;
};
