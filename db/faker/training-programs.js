'use strict';
// using Faker to generate a some departments
const faker = require('faker');
const { amounts: { numTrainingPrograms } } = require('./generatorAmounts.json');

module.exports.generateTrainingPrograms = () => {
  let programs = [];

  for (let i = 0; i < numTrainingPrograms; i++) {
    let start_date = faker.date.future().toISOString();
    //end date will be start date + 14 days
    let end_date = new Date(start_date);
    end_date.setDate(end_date.getDate() + 14);
    end_date = end_date.toISOString();
    let max_attendance = Math.floor(faker.random.number() / 1000);
    let title = faker.company.bs();

    programs.push({
      start_date,
      end_date,
      max_attendance,
      title
    });
  }
  return programs;
};
