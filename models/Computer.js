'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/bangazon.sqlite');

module.exports = {
  dbGetAllComputers: () => {
    return new Promise( (resolve, reject) => {
      //TODO: don't forget that the table will change
      db.all(`SELECT * FROM computer`, (err, computersData) => {
        if(err) return reject(err);
        resolve(computersData); 
      });
    });
  },
  dbGetOneComputer: (id) => {
    return new Promise( (resolve, reject) => {
      //TODO: don't forget that the table will change
      db.get(`SELECT * FROM computer
              WHERE id = ${id}`, (err, computerData) => {
        if(err) return reject(err);
        resolve(computerData); 
      });
    });
  }
}
