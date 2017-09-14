'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/bangazon.sqlite');

module.exports = {
	dbGetAllEmployees: () => {
		return new Promise( (resolve, reject) => {
			db.all(`SELECT e.id, d.name department, e.first_name, e.last_name, e.phone_number, e.job_title, e.street_address, e.city_address, e.state_code, e.zip_code
							FROM employee e, department d
							WHERE e.department_id = d.id`, (err, employeesData) => {
				if(err) return reject(err);
				resolve(employeesData);
			});
		});
	}

}
