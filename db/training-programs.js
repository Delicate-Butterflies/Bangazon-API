'use strict';
// using Faker to generate a some departments
const faker = require('faker');

module.exports.generateTrainingPrograms = () => {
  let programs = [];

  for (let i = 0; i < 10; i++) {
    let start_date = faker.date.future();
    let end_date = null;
    end_date.setDate(start_date.getDate() + 14);
    console.log(end_date);
    let max_attendance = faker.random.number();
    let title = faker.company.

      programs.push({
        start_date,
        end_date,
        max_attendance,
        title
      });
  }
  return programs;
};
