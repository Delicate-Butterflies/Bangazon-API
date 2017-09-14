'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../bangazon.sqlite');

module.exports = {
  dbGetAllUsers: () => {
    return new Promise( (resolve, reject) => {
      db.all(`SELECT * FROM users`, (err, userData) => {
        if(err) {
          console.log("Error: ", err.toString());
          reject(err);
        }
        else
          resolve(userData);
      })
    })
  }
}
