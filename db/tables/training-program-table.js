'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/bangazon.sqlite');

const { generateTrainingPrograms } = require('../faker/training-programs');

const { amounts: { numTrainingPrograms } } = require('../faker/generatorAmounts.json');

let trainingPrograms = generateTrainingPrograms(numTrainingPrograms);

module.exports = (trainingProgramArr) => {

  return new Promise((resolve,reject) => {

    db.serialize(function() {
      
      db.run(`DROP TABLE IF EXISTS training_program`);
    
      db.run(`CREATE TABLE IF NOT EXISTS training_program (
        id INTEGER PRIMARY KEY,
        start_date TEXT, 
        end_date TEXT,
        max_attendance INT,
        title TEXT)`
      );
    
      trainingProgramArr.forEach( ({start_date, end_date, max_attendance, title}) => {
        db.run(`INSERT INTO training_program (start_date, end_date, max_attendance, title) 
                VALUES ("${start_date}", "${end_date}", ${max_attendance}, "${title}")`);
      });

      db.close();

      resolve('training_program table created and populated');
    
    });

  });

};