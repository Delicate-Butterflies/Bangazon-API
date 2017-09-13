'use strict';

// using Faker to generate a pile of product types and products
const faker = require('faker');
const { amounts: { numComputers } } = require('./generatorAmounts.json');

module.exports.generateComputers = () => {
  let computers = [];

  for (let i = 0; i < numComputers; i++) {
    let purchase_date = faker.date.past().toISOString();
    let decommission_date = faker.date.future().toISOString();
    let serial_number = faker.random.uuid();

    computers.push({
      purchase_date,
      decommission_date,
      serial_number
    });
  }
  return computers;
};
