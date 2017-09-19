'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('bangazon.sqlite');

module.exports = (productType) => {
	return new Promise((resolve, reject) => {
		db.serialize(() => {
			db.run(`DROP TABLE IF EXISTS product_type`);

			db.run(`CREATE TABLE product_type (
            id INTEGER PRIMARY KEY,
            name TEXT)`);
			productType.forEach((type) => {
				db.run(`INSERT INTO product_type(name)
                  VALUES('${type.name}')`, function (err, data) {
						if (err) return reject(err);
						resolve("Done");
					});
			});
		});
	});
};
