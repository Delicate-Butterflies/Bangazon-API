'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/bangazon.sqlite');

module.exports = {
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
    //     getOne: (id) => {
    //         return new Promise((resolve, reject) => {
    //             db.get(`SELECT shows.*, directors.name AS director
    //               FROM shows
    //               JOIN directors ON director_id = directors.dir_id
    //               WHERE show_id = ${id}`, (err, show) => {
    //                 if (err) return reject(err);
    //                 resolve(show);
    //             });
    //         });
    //     }
};