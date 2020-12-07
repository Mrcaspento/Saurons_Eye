const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const promisemysql = require("promise-mysql");




const connectionProperties = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: " ",
    database: "middle_earthDB"
}




//CONNECTION
const connection = mysql.createConnection(connectionProperties);

//connection to database
connection.connect((err) => {
    if (err) throw err;
});
console.log("\n ONE RING TO RULE THEM ALL\n")
middleEarth();



function middleEarth() {

    // Prompt user to choose an option
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "MAIN MENU",
            choices: [
                "View all employees",
                "View all employees by role",
                "View all employees by department",
                "View all employees by manager", //The Nine Nazgûl
                "Add employee",
                "Add role",
                "Add department",
                "Update employee role",
                "Update employee manager",
                "Delete employee",
                "Delete role",
                "Delete department",
                "View department budgets"
            ]
        })
        .then((answer) => {

            // Switch case depending on user option
            switch (answer.action) {
                case "View all employees":
                    viewAllEmployees();
                    break;

                case "View all employees by department":
                    viewAllEmpByDept();
                    break;

                case "View all employees by role":
                    viewAllEmpByRole();
                    break;

                case "Add employee":
                    addEmployee();
                    break;

                case "Add department":
                    addDepartment();
                    break;
                case "Add role":
                    addRole();
                    break;
                case "Update employee role":
                    updateEmpRole(); //bonus
                    break;
                case "Update employee manager":
                    updateEmpMngr();//bonus
                    break;
                case "View all employees by manager":
                    viewAllEmpByMngr();//bonus
                    break;
                case "Delete employee":
                    deleteEmployee();//bonus
                    break;
                case "View department budgets":
                    viewDeptBudget();//bonus
                    break;
                case "Delete role":
                    deleteRole();//bonus
                    break;
                case "Delete department":
                    deleteDepartment();//bonus
                    break;
            }
        });
}
function viewAllEmployees() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ', e.lat_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;", function (err, res) {
        if (err) throw err
        console.table(res)
        middleEarth()
    })
}
