'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('bangazon.sqlite', (err) => {
    if (err)
        console.log('Error:', err.toString());
    console.log('Connected');
});

module.exports = (users) => {
    return new Promise((resolve, return reject) => {
        db.serialize(() => {
            db.run(`DROP TABLE IF EXISTS user`);
            db.run(`CREATE TABLE user (
            id INTEGER PRIMARY KEY,
            first_name TEXT,
            last_name TEXT,
            account_created_date TEXT NOT NULL,
            last_login_date TEXT NOT NULL,
            street_address TEXT,
            city_address TEXT,
            state_code TEXT,
            zip_code TEXT )`);
            users.forEach((user) => {
                db.run(`INSERT INTO user(first_name, last_name, account_created_date, last_login_date, street_address, city_address, state_code, zip_code)
                  VALUES('${user.first_name}', '${user.last_name}', '${user.account_created_date}', '${user.last_login_date}', '${user.address_street}',  '${user.address_city}', '${user.address_state}', '${user.address_zip}')`, (err, data) => {
                        if (err)
                            console.log(err.toString());
                        resolve("Done");
                    });
            });
        });
    })
}
