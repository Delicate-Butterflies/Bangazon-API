'use strict';

// using Faker to generate a pile of product types and products
const faker = require('faker');

module.exports.generatePaymentTypes = () => {
  let payments = [];

  for (let i = 0; i < 10; i++) {
    let customer_user_id = Math.floor(Math.random()) + 1;
    let type = faker.finance.accountName();
    let account_number = faker.finance.account();

    payments.push({
      customer_user_id,
      type,
      account_number
    });
  }
  return payments;
};
