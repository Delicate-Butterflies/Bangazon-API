'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/bangazon.sqlite');
db.run('PRAGMA foreign_keys = ON');

module.exports.dbGetAllComputers = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM computers`, (err, computersData) => {
      if (err) return reject(err);
      resolve(computersData);
    });
  });
};

module.exports.dbGetOneComputer = (id) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM computers
            WHERE id = ${id}`, (err, computerData) => {
        if (err) return reject(err);
        resolve(computerData);
      });
  });
};

module.exports.dbDeleteOneComputer = (id) => {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM computers WHERE id = ${id}`, function (err) {
      if (err) return reject(err);
      resolve({ message: "delete successful", rows_deleted: this.changes });
    });
  });
};

module.exports.dbPostComputer = (newComputer) => {
  return new Promise((resolve, reject) => {
    let { purchase_date, decommission_date, serial_number } = newComputer;
    db.run(`INSERT INTO computers(purchase_date, decommission_date, serial_number)
            VALUES ("${purchase_date}", "${decommission_date}", "${serial_number}")`, function (err) {
        if (err) return reject(err);
        resolve({ message: "new computer added", new_computer_id: this.lastID });
      });
  });
};

module.exports.dbPutComputer = (req, computer_id) => {
  let computer = req.body;
  return new Promise((resolve, reject) => {
    let query = `UPDATE computers SET `;
    let keys = (Object.keys(computer));
    keys.forEach((key) => {
      query += `"${key}" = "${computer[key]}",`;
    });
    query = query.slice(0, -1);
    query += ` WHERE id = ${computer_id}`;
    db.run(query, function (err) {
      if (err) {
        reject(err);
      }
      else {
        resolve({ message: "computer updated", rows_updated: this.changes });
      }
    });
  });
};
