'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/bangazon.sqlite');

module.exports. dbGetAllEmployees = () => {
	return new Promise( (resolve, reject) => {
		db.all(`SELECT * FROM employees`, (err, employeesData) => {
			if(err) reject(err);
			resolve(employeesData);
		});
	});
};

module.exports.dbGetOneEmployee = (id) => {
	return new Promise( (resolve, reject) => {
		db.get(`SELECT * FROM employees
						WHERE id = ${id}`, (err, employee) => {
			if (err) reject(err);
			resolve(employee);
		});
	});
};

module.exports.dbPostEmployee = (newEmployee) => {
	return new Promise( (resolve, reject) => {
		let { department_id, first_name, last_name, phone_number, job_title, street_address, city_address, state_code, zip_code } = newEmployee;
		db.run(`INSERT INTO employees(department_id, first_name, last_name, phone_number, job_title, street_address, city_address, state_code, zip_code)
			VALUES ("${department_id}", "${first_name}", "${last_name}", "${phone_number}", "${job_title}", "${street_address}", "${city_address}", "${state_code}", "${zip_code}")`, (err) => {
			if(err) reject(err);
			resolve("New field inserted");
		});
	});
};

module.exports.dbPutEmployee = (employee, employee_id) => {
	return new Promise( (resolve, reject) => {
		let query = `UPDATE employees SET `;
		let keys = (Object.keys(employee));
		keys.forEach( (key) => {
			if(key == "id")
        return reject("Cannot update id(primary key)");
      else
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