'use strict';

// using Faker to generate a pile of product types and products
const faker = require('faker');

module.exports.generateProducts = (numProducts, typesLen, customersLen) => {
  let products = [];

  for (let i = 0; i < numProducts; i++) {
    let title = faker.commerce.productName();
    let price = faker.commerce.price();
    let description = faker.lorem.sentence();
    let type_id = Math.floor(Math.random() * typesLen) + 1;
    let seller_user_id = Math.floor(Math.random() * customersLen) + 1;
    let original_quantity = Math.floor((faker.random.number()) / 1000);

    products.push({
      title,
      price,
      description,
      type_id,
      seller_user_id,
      original_quantity
    });
  }
  return products;
};
