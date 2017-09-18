# Bangazon API
Bangazon-corp's employees, products and users database. Users can GET/POST/PUT information from and to the database and DELETE from the database for selected categories.


## Table of Contents

1. [Software Requirements](#software-requirements)
1. [Installation](#installation)
1. [Get Started](#get-started)
1. [Helper Applications](#helper-applications)
1. [Usage Directions](#usage-directions)
1. [Third Party Libraries](#third-party-libraries)
1. [Contribute to API](#contribute-to-api)


## Software Requirements
- [NodeJs](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)


## Installation
- to clone the project down, run  ```git clone [repo link]```
- run ```npm install``` from the root of the directory to install all of the dependencies


## Get Started
- set up the database using ```npm run db:reset``` command in terminal
- create your own .env file at the root of the project using the .env.example file as a guide
- run ```nodemon app.js``` from the terminal


## Helper Applications
- [DB Browser for SQLite](http://sqlitebrowser.org/) to work directly with database without command line
- [Postman](https://www.getpostman.com/) to use PUT/POST/DELETE http verbs


## Usage directions
- go to ```api/v#/``` to view route and method layout, see additional details below

### Enitity Relationship Diagram

![Bangazon API ERD](https://lh3.googleusercontent.com/qyP1et2iZMeIMztBnn6heq3L1W-51a2XY-7exajJX7ucXuQB_UspDysxH1Bf_Lo-imAGevneUz0yLiTx=w2550-h1398-rw)

### Request Methods


### Employees
- verbs supported: GET, POST, PUT
- example body:
```
{
	"id": "INT: include on PUT only",
	"department_id": "INT",
	"first_name": "TEXT: NOT NULL",
	"last_name": "TEXT: NOT NULL",
	"phone_number": "TEXT",
	"job_title": "TEXT",
	"street_address": "TEXT",
	"city_address": "TEXT",
	"state_code": "TEXT",
	"zip_code": "INT"
}
```

### Departments
- verbs supported: GET, POST, PUT
- example body:
```
{
"id": "INT: include on PUT only",
"supervisor_employee_id": "INT",
"expense_budget": "INT: NOT NULL",
"name": "TEXT: NOT NULL"
}
```

### Computers
- verbs supported: GET, POST, PUT, DELETE
> NOTE: deleting a computer will delete the associated entry on the employeeComputer join table
- example body:
```
{
"id": "INT: on put only",
"purchase_date": "TEXT NOT NULL",
"decommission_date": "TEXT",
"serial_number": "TEXT NOT NULL"
}
```

### Training-Programs
- verbs supported: GET, POST, PUT, DELETE
> NOTE: deleting a training program will delete the associated entry on the employeeTraining join table
- example body:
```
{
"id": "INT: include on PUT only",
"start_date": "TEXT",
"end_date": "TEXT",
"max_attendance": "INT",
"title": "TEXT"
}
```

### Users
- verbs supported: GET, POST, PUT
- example body:
```
{
"id": "INT: put only",
"first_name": "TEXT",
"last_name": "TEXT",
"account_created_date": "TEXT NOT NULL",
"last_login_date": "TEXT NOT NULL",
"street_address": "TEXT",
"city_address": "TEXT",
"state_code": "TEXT",
"zip_code": "TEXT"
}
```

### Product Types
- verbs supported: GET, POST, PUT, DELETE
NOTE: you cannot delete a product type if there are products associated with that product type
- example body:
```
{
"id": "INT: PUT only",
"name": "TEXT"
}
```

### Products
- verbs supported: GET, POST, PUT, DELETE
> NOTE: deleting a product will delete the associated entry on the orderProduct join table
- example body:
```
{
"id": "INT: PUT only",
"product_type_id": "INTEGER",
"price": "REAL",
"title": "TEXT",
"description": "TEXT",
"original_quantity": "INTEGER",
"seller_user_id": "INTEGER"
}
```

### Orders
- verbs supported: GET, POST, PUT, DELETE
> NOTE: deleting an order will delete the associated entry/entries on the orderProduct join table
- example body:
```
{
"id": "INT: PUT only",
"customer_user_id": "INTEGER",
"payment_type_id": "INTEGER",
"order_date": "TEXT"
}
```

### Detailed Orders
- verbs supported: GET, PUT, DELETE
> NOTE: ```api/v1/orders/:id/products```
> NOTE: deleting a detailed order will delete the associated entry on the orderProduct join table
- example body:
```
{
"orderBody(above)": "GET only",
"product_id": "INT: required on POST/PUT/DELETE",
"quantity": "INT: optional on POST/PUT/DELETE, 1 by default"
}
```


### Payment Types
- verbs supported: GET, POST, PUT, DELETE
- example body:
```
{
"id": "INT: PUT only",
"customer_user_id": "INTEGER",
"type": "TEXT",
"account_number": "INTEGER"
}
```

### Inactive Customers
- verbs supported: GET
- route: ```api/v1/users/?active=false```


## Third Party Libraries
- [express](https://www.npmjs.com/package/express)
- [sqlite3](https://www.npmjs.com/package/sqlite3)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [body-parser-json](https://www.npmjs.com/package/body-parser-json)


## Credits
### Project Manager
- [Jufe Brown-Tsai](https://github.com/Jufebrown)

### API Developers
- [Megan Brown](https://github.com/megbrown)
- [Arwa Kuterwadliwala](https://github.com/Arwask)
- [Jon Roberts](https://github.com/thejonroberts)
- [Sam Baker](https://github.com/SamBDev)
- [Josh Lloyd](https://github.com/joshualloyd)


## Contribute to API
- use [airbnb style](https://github.com/airbnb/javascript)
- follow template for PR requests
- tab size 2

&copy; 2017 Delicate-Butterflys