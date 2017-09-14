'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/bangazon.sqlite');

module.exports = {
  dbGetAllUsers: () => {
    return new Promise( (resolve, reject) => {
      db.all(`SELECT * FROM users`, (err, userData) => {
        if(err) {
          console.log("Error: ", err.toString());
          reject(err);
        }
        else
          console.log(userData);
          resolve(userData);
      })
    })
  },
  dbGetOneUser: (id) => {
    return new Promise( (resolve, reject) => {
      db.all(`SELECT * FROM users WHERE id = ${id}`, (err, userData) => {
        if(err) {
          console.log("Error: ", err.toString());
          reject(err);
        }
        else
          console.log(userData);
          resolve(userData);
      })
    })
  },
  dbPutUser: (id, req) => {
    console.log("req", req.body);
    return new Promise( (resolve, reject) => {
    //   db.run(`UPDATE users
    //           SET `, (err, userData) => {
    //     if(err) {
    //       console.log("Error: ", err.toString());
    //       reject(err);
    //     }
    //     else
    //       console.log(userData);
          resolve("userData");
    //   })
    // })
  })
}
}
