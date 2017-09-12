'use strict';
// using Faker to generate a some product types
const faker = require('faker');

module.exports.generateTypes = (numProductTypes) => {
  let types = [];

  for (let i = 0; i < numProductTypes; i++) {
    let name = faker.commerce.department();

    types.push({
      name
    });
  }
  return types;
};
