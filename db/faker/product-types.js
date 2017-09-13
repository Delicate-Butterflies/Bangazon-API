'use strict';
// using Faker to generate a some product types
const faker = require('faker');
const { amounts: { numProductTypes } } = require('./generatorAmounts.json');

module.exports.generateTypes = () => {
  let types = [];

  for (let i = 0; i < numProductTypes; i++) {
    let name = faker.commerce.department();

    types.push({
      name
    });
  }
  return types;
};
