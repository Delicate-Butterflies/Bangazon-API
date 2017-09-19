'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('bangazon.sqlite');

module.exports = (orders) => {
	return new Promise((resolve, reject) => {
		db.serialize(() => {
			db.run(`DROP TABLE IF EXISTS orders`, function (err) {
				if (err) return reject(err);
			});
			db.run(`CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY,
            customer_user_id INTEGER,
            payment_type_id INTEGER,
            order_date TEXT, FOREIGN KEY(customer_user_id) REFERENCES user(id))`, function (err) {
					if (err) return reject(err);
				});
			orders.forEach((order) => {
				db.run(`INSERT INTO orders(customer_user_id, payment_type_id, order_date)
                  VALUES('${order.customer_user_id}', '${order.payment_type_id}', '${order.order_date}')`, function (err, data) {
						if (err) {
							reject(err);
						}
						else
							resolve("Done");
					});
			});
		});
	});
};
