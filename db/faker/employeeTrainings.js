'use strict';

const { amounts: { numEmployees, numTrainingPrograms } } = require('./generatorAmounts.json');

module.exports.generateEmployeeTrainings = (trainingProgramsArray) => {

  let employeeTrainings = [];

  for (let i = 1; i <= numTrainingPrograms; i++) {

    let maxAttendance = trainingProgramsArray[i - 1].max_attendance;
    let attendance = Math.floor(Math.random() * maxAttendance) + 1;

    for (let j = 0; j < attendance; j++) {

      let employee_id = Math.floor(Math.random() * numEmployees) + 1;;

      employeeTrainings.push({
        program_id: i,
        employee_id
      });
    }

  }
  return employeeTrainings;
};
