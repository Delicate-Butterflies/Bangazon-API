'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('bangazon.sqlite', (err) => { 
    if(err) 
        console.log('Error:',err.toString());
    console.log('Connected');
});

module.exports = () => {
  db.run('CREATE TABLE user (id INTEGER PRIMARY KEY, first_name TEXT, last_name TEXT, account_created_date TEXT NOT NULL, last_login_date TEXT NOT NULL, street_address TEXT, city_address TEXT, state_code TEXT, zip_code INTEGER )', (err) => {
    if(err) console.log('Error:', err.toString());
  })
}