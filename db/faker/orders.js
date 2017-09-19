'use strict';

// using Faker to generate orders
const faker = require('faker');
const { amounts: { numOrders, numUsers, numPaymentTypes } } = require('./generatorAmounts.json');

module.exports.generateOrders = () => {
  let orders = [];

  for (let i = 0; i < numOrders; i++) {
    let order_date = faker.date.past().toISOString(); //generates an ISO formate date string
    let customer_user_id = Math.floor(Math.random() * numUsers) + 1;
    let payment_type_id = null;
    let closedOrderChance = Math.floor(Math.random() * 100);
    if (closedOrderChance > 50) {
      payment_type_id = Math.floor(Math.random() * numPaymentTypes) + 1;
    }

    orders.push({
      order_date,
      payment_type_id,
      customer_user_id
    });
  }
  return orders;
};
