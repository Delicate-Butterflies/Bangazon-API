'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/bangazon.sqlite');

module.exports.dbGetAllDepartments = () => {
	return new Promise((resolve, reject) => {
		db.all(`SELECT d.id, e.first_name supervisor_first_name, e.last_name supervisor_last_name, d.expense_budget, d.name
						FROM departments d
						JOIN employees e
						WHERE d.supervisor_employee_id = e.id`, (err, departmentsData) => {
				if (err) return reject(err);
				resolve(departmentsData);
			});
	});
};

module.exports.dbGetOneDepartment = (id) => {
	return new Promise((resolve, reject) => {
		db.get(`SELECT d.id, e.first_name supervisor_first_name, e.last_name supervisor_last_name, d.expense_budget, d.name
						FROM departments d
						JOIN employees e
						WHERE d.supervisor_employee_id = e.id
						AND d.id = ${id}`, (err, department) => {
				if (err) return reject(err);
				resolve(department);
			});
	});
};

module.exports.dbPostDepartment = (newDepartment) => {
	return new Promise((resolve, reject) => {
		let { supervisor_employee_id, expense_budget, name } = newDepartment;
		db.run(`INSERT INTO departments(supervisor_employee_id, expense_budget, name)
			VALUES ("${supervisor_employee_id}", "${expense_budget}", "${name}")`, (err) => {
				if (err) return reject(err);
				resolve("New field inserted");
			});
	});
};

module.exports.dbPutDepartment = (department, department_id) => {
	return new Promise((resolve, reject) => {
		let query = `UPDATE departments SET `;
		let keys = (Object.keys(department));
		keys.forEach((key) => {
			query += `"${key}" = "${department[key]}",`;
		});
		query = query.slice(0, -1);
		query += ` WHERE id = ${department_id}`;
		db.run(query, function (err) {
			if (err) return reject(err);
			resolve({ message: "department updated", rows_updated: this.changes });
		});
	});
};
