'use strict';
// using Faker to generate a some product types
const faker = require('faker');

module.exports.generateTypes = () => {
  let types = [];

  for (let i = 0; i < 10; i++) {
    let name = faker.commerce.department();

    types.push({
      name
    });
  }
  return types;
};
