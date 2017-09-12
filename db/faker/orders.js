'use strict';

// using Faker to generate orders
const faker = require('faker');

module.exports.generateOrders = (numOrders, usersLen, paymentTypesLen) => {
  let orders = [];

  for (let i = 0; i < numOrders; i++) {
    let order_date = faker.date.past().toISOString(); //generates an ISO formate date string
    let product_type_id = Math.floor(Math.random() * paymentTypesLen) + 1;
    let customer_user_id = Math.floor(Math.random() * usersLen) + 1;

    orders.push({
      order_date,
      product_type_id,
      customer_user_id
    });
  }
  return orders;
};
