'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/bangazon.sqlite');

module.exports.dbGetAllUsers = () => {
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
  }; 
  module.exports.dbGetOneUser = (id) => {
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
  };
  module.exports.dbPostUser = (req) => {
    let user = req.body;
    return new Promise( (resolve, reject) => {
      console.log("user",user);
      db.run(`INSERT INTO users(first_name, last_name, account_created_date, last_login_date, street_address, city_address, state_code, zip_code) VALUES('${user.first_name}', '${user.last_name}', '${user.account_created_date}', '${user.last_login_date}', '${user.street_address}',  '${user.city_address}', '${user.state_code}', '${user.zip_code}')`, (err, userData) => {
        if(err) {
          console.log("Error here: ", err.toString());
          reject(err);
        }
        else {
          console.log(userData);
          resolve("userData");
        }
      })
    })
  };

  module.exports.dbPutUser = (req, user_id) => {
    let user = req.body;
    return new Promise( (resolve, reject) => {
      let query = `UPDATE users SET `;
      let keys = (Object.keys(user));
      console.log("keys",keys);
      keys.forEach( (key) => {
        // console.log("user", user);
        console.log("item", key);
        console.log("user.item", user[key]);
        query += `"${key}" = "${user[key]}",`;
      }) 
      query = query.slice(0,-1);
      query += ` WHERE id = ${user_id}`;
      console.log(query);
      db.run(query, (err, userData) => {
        if(err) {
          console.log("Error here: ", err.toString());
          reject(err);
        }
        else {
          console.log(userData);
          resolve("userData");
        }
    })
  })
};
