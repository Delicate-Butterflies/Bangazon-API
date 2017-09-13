'use strict';

// generate a bunch of customers with Faker
const faker = require('faker');
const { amounts: { numUsers } } = require('./generatorAmounts.json');

module.exports.generateUsers = () => {
  let users = [];

  for (let i = 0; i < numUsers; i++) {
    let first_name = faker.name.firstName();
    let last_name = faker.name.lastName();
    let account_created_date = faker.date.past().toISOString();
    let recent_date = faker.date.recent().toISOString();
    let last_login_date = faker.date.between(account_created_date, recent_date ).toISOString();
    let phone_number = faker.phone.phoneNumberFormat();
    let email = faker.internet.email();
    let address_street = faker.address.streetAddress();
    let address_city = faker.address.city();
    let address_state = faker.address.state();
    let address_zip = faker.address.zipCode();

    users.push({
      first_name,
      last_name,
      account_created_date,
      last_login_date,
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
