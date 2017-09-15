'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/bangazon.sqlite');

module.exports.dbGetAllPaymentTypes = () => {
  return new Promise( (resolve, reject) => {
    db.all(`SELECT * FROM payment_types`, (err, allPaymentTypesData) => {
      if(err) reject(err);
      resolve(allPaymentTypesData);
    });
  });
};

module.exports.dbGetOnePaymentType = (id) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM payment_types WHERE id = ${id}`, (err, singlePaymentTypeData) => {
      if(err) reject(err);
      resolve(singlePaymentTypeData);
    });
  });
};