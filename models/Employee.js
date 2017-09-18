'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/bangazon.sqlite');

module.exports. dbGetAllEmployees = () => {
	return new Promise( (resolve, reject) => {
		db.all(`SELECT e.id, d.name department, e.first_name, e.last_name, e.phone_number, e.job_title, e.street_address, e.city_address, e.state_code, e.zip_code
						FROM employees e
						JOIN departments d
						WHERE e.department_id = d.id`, (err, employeesData) => {
			if(err) return reject(err);
			resolve(employeesData);
		});
	});
};

module.exports.dbGetOneEmployee = (id) => {
	return new Promise( (resolve, reject) => {
		db.get(`SELECT e.id, d.name department, e.first_name, e.last_name, e.phone_number, e.job_title, e.street_address, e.city_address, e.state_code, e.zip_code
						FROM employees e
						JOIN departments d
						WHERE e.department_id = d.id
						AND e.id = ${id}`, (err, employee) => {
			if (err) return reject(err);
			resolve(employee);
		});
	});
};

module.exports.dbPostEmployee = (newEmployee) => {
	return new Promise( (resolve, reject) => {
		let { department_id, first_name, last_name, phone_number, job_title, street_address, city_address, state_code, zip_code } = newEmployee;
		db.run(`INSERT INTO employees(department_id, first_name, last_name, phone_number, job_title, street_address, city_address, state_code, zip_code)
			VALUES ("${department_id}", "${first_name}", "${last_name}", "${phone_number}", "${job_title}", "${street_address}", "${city_address}", "${state_code}", "${zip_code}")`, (err) => {
			if(err) return reject(err);
			resolve("New field inserted");
		});
	});
};

module.exports.dbPutEmployee = (employee, employee_id) => {
	return new Promise( (resolve, reject) => {
		let query = `UPDATE employees SET `;
		let keys = (Object.keys(employee));
		keys.forEach( (key) => {
			query += `"${key}" = "${employee[key]}",`;
		});
		query = query.slice(0,-1);
		query += ` WHERE id = ${employee_id}`;
		db.run(query, function(err) {
			if(err) reject(err);
			resolve({message: "employee updated", rows_updated: this.changes});
		});
	});
};