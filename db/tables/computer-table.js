'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/bangazon.sqlite');

const { generateComputers } = require('../faker/computers');

const { amounts: { numComputers } } = require('../faker/generatorAmounts.json');

let computers = generateComputers(numComputers);

module.exports = () => {

  db.serialize(function() {
    
    db.run(`DROP TABLE IF EXISTS computer`);
  
    db.run(`CREATE TABLE IF NOT EXISTS computer (
      id INTEGER PRIMARY KEY,
      purchase_date TEXT NOT NULL, 
      decommission_date TEXT,
      serial_number TEXT)`
    );
  
    computers.forEach( ({purchase_date, decommission_date, serial_number}) => {
      db.run(`INSERT INTO computer (purchase_date, decommission_date, serial_number) 
              VALUES ("${purchase_date}", "${decommission_date}", "${serial_number}")`);
    });
  
  });

};