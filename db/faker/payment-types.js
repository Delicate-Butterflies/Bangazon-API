'use strict';

// using Faker to generate a pile of product types and products
const faker = require('faker');
const { amounts: { numPaymentTypes, numUsers } } = require('./generatorAmounts.json');

module.exports.generatePaymentTypes = () => {
  let payments = [];

  for (let i = 0; i < numPaymentTypes; i++) {
    let customer_user_id = Math.floor(Math.random() * numUsers) + 1;
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
