const mysql = require("mysql");
const middleEarth = require("middleEarth")
const inquirer = require("inquirer");
const cTable = require('console.table');
const promisemysql = require("promise-mysql");



const connectionProperties = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "uruk_haitrackerdb"
}




//CONNECTION
const connection = mysql.createConnection(connectionProperties);

//connection to database
connection.connect(function(err){
    if(err) throw err;
    console.log("connected" + connection.threadId);
    afterConnection();
})

function afterConnection() {
    connection.query("SELECT * FROM ", function(err, res) {
      if (err) throw err;
      console.log(res);
      connection.end();
    });
  }

console.log("\n ONE RING TO RULE THEM ALL\n")


function viewAllEmployees() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role., department.name, CONCAT(e.first_name, ' ', e.lat_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;", function (err, res) {
        if (err) throw err;
        console.table(res);
        
    })
};



function viewAllRoles() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id =role.id;",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            middleEarth();
        })
};

function viewAllDepartments() {
    connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      middleEarth()
    })
  }




middleEarth();
