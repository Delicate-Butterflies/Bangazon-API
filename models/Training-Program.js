'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/bangazon.sqlite');

module.exports = {
    dbGetAllTrainingPrograms: () => {
        return new Promise( (resolve, reject) => {
          db.all(`SELECT * FROM training_programs`, (err, trainingData) => {
            if(err) return reject(err);
            resolve(trainingData);
          });
        });
      },
      dbGetOneTrainingProgram: (id) => {
        return new Promise( (resolve, reject) => {
          db.get(`SELECT * FROM training_programs
                  WHERE id = ${id}`, (err, trainingData) => {
            if(err) return reject(err);
            resolve(trainingData);
          });
        });
      },
    dbPostTrainingProgram: (newTrainingProgram) => {
        return new Promise((resolve, reject) => {
            let { start_date, end_date, max_attendance, title } = newTrainingProgram;
            db.run(`INSERT INTO training_programs (start_date, end_date, max_attendance, title)
          VALUES ("${start_date}", "${end_date}", ${max_attendance}, "${title}")`, (err) => {
                if (err) return reject(err);
                resolve("New field inserted");
            });
        });
    },
    dbDeleteOneTrainingProgram: (id) => {
        return new Promise((resolve, reject) => {
          db.run(`DELETE FROM training_programs WHERE id = ${id}`, function(err) {
            if(err) return reject(err);
            resolve({message: "delete successful", rows_deleted: this.changes});
          });
        });
      },
      dbPutTrainingProgram: (req, training_program_id) => {
        let training_program = req.body;
        return new Promise( (resolve, reject) => {
          let query = `UPDATE training_programs SET `;
          let keys = (Object.keys(training_program));
          keys.forEach( (key) => {
            query += `"${key}" = "${training_program[key]}",`;
          });
          query = query.slice(0,-1);
          query += ` WHERE id = ${training_program_id}`;
          db.run(query, function(err) {
            if(err) {
              reject(err);
            }
            else {
              resolve({message: "training_program updated", rows_deleted: this.changes});
            }
          });
        });
      }
};