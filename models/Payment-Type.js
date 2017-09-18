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

module.exports.dbPutPaymentType = (req, payment_type_id) => {
  let payment_type = req.body;
  return new Promise( (resolve, reject) => {
    let query = `UPDATE payment_types SET `;
    let keys = (Object.keys(payment_type));
    keys.forEach( (key) => {
      query += `"${key}" = "${payment_type[key]}",`;
    });
    query = query.slice(0,-1);
    query += ` WHERE id = ${payment_type_id}`;
    db.run(query, function(err) {
      if(err) {
        reject(err);
      }
      else {
        resolve({message: "payment_type updated", rows_deleted: this.changes});
      }
    });
  });
};