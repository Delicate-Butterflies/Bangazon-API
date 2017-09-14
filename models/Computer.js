'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/bangazon.sqlite');

module.exports = {
  dbGetAllComputers: () => {
    return new Promise( (resolve, reject) => {
      db.all(`SELECT * FROM computers`, (err, computersData) => {
        if(err) return reject(err);
        resolve(computersData); 
      });
    });
  },
  dbGetOneComputer: (id) => {
    return new Promise( (resolve, reject) => {
      db.get(`SELECT * FROM computers
              WHERE id = ${id}`, (err, computerData) => {
        if(err) return reject(err);
        resolve(computerData); 
      });
    });
  },
  dbDeleteOneComputer: (id) => {
    return new Promise((resolve, reject) => {
      console.log('test sql query', `DELETE FROM computers WHERE id = ${id}`);
      db.run(`DELETE FROM computers WHERE id = ${id}`, function(err) {
        if(err) return reject(err);
        resolve({message: "delete successful", rows_deleted: this.changes});
      });
    });
  }
}
