'use strict';

// using Faker to generate orders
const faker = require('faker');

module.exports.generateOrders = (usersLen, paymentTypesLen) => {
  let orders = [];

  for (let i = 0; i < 10; i++) {
    let order_date = faker.date.past(); //generates an ISO formate date
    let shipped = Math.floor(Math.random()); // 0 or 1
    let product_type_id = Math.floor(Math.random() * paymentTypesLen) + 1;
    let customer_user_id = Math.floor(Math.random() * usersLen) + 1;

    orders.push({
      order_date,
      shipped,
      product_type_id,
      customer_user_id
    });
  }
  return orders;
};
