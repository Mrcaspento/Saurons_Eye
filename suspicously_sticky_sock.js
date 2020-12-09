const inquirer = require("inquirer")
const mysql = require("mysql");


const connectionProperties = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "uruk_haitrackerdb"
}

//CONNECTION
const connection = mysql.createConnection(connectionProperties);
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected" + connection.threadId);
})

console.log("\n ONE RING TO RULE THEM ALL\n")

middleEarth = () => {
    inquirer
        .prompt({

            name: "choices",
            type: "list",
            message: "what would you like to do?",
            choices: [
                "View all employees",//finished
                "View all employees by role", //finshed
                "View all employees by department",//finished
                "Add employee",//finished
                "Add role",//finished
                "Add department",//finished
                "Update employee role",
                "Toss the ring in to the volcano"//finihsed
            ]
        }).then((val) => {
            // Switch case depending on user option

            switch (val.choices) {
                case "View all employees":
                    viewAllEmployees();
                    break;

                case "View all employees by department":
                    viewAllDepartments();
                    break;

                case "View all employees by role":
                    viewAllRoles();
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
                    updateEmployeeRole();
                    break;
                case "Toss the ring in to the volcano":
                    endLotr();
                    break;
            }
        })
}
function addDepartment() {
    connection.query('SELECT departments, departments.name AS Name', function (err, val) {
        inquirer
            .prompt([
                {
                    name: 'departments',
                    type: 'input',
                    message: "what department would you like to add"
                }
            ]).then(val => {
                console.log(`adding ${val.departments} to the table`)
                connection.query(
                    "INSERT INTO departments SET ?",
                    {
                        name: val.departments

                    }, function (err) {
                        if (err) throw err;
                        console.table(val);
                        console.log('ERROR 404....sike it worked')
                        middleEarth();
                    }
                )
            })
    })
};
function viewAllEmployees() {
    connection.query('SELECT * FROM employees', function (err, val) {
        console.log('\n Employees for middleEarth \n');
        console.table(val);
        middleEarth();
    })
}
function viewAllRoles() {
    connection.query('SELECT * FROM roles', function (err, val) {
        console.log('\n Roles for middleEarth \n');
        console.table(val);
        middleEarth();
    })
}

function viewAllDepartments() {
    connection.query('SELECT * FROM departments', function (err, val) {
        console.log('\n Departments for middleEarth \n');
        console.table(val);
        middleEarth();
    })
}
function addRole() {
    connection.query('SELECT roles, roles.title AS Title, roles.powerlvl AS Powerlvl FROM roles,', function (err, res) {
        inquirer
            .prompt([
                {
                    name: "Title",
                    type: "input",
                    message: "What is this fodder for the WarMachines Title?"
                }, {
                    name: "Powerlvl",
                    type: "input",
                    message: "Sauron says your PowerLvl is?"
                }, {
                    type: "list",
                    message: "What department do they belong to ?",
                    name: 'departments',
                    choices: ["Humans", "Dwarfs", "Elfs", "Sauron"]
                }
            ]).then(val => {
                switch (val.departments) {
                    case 'Humans':
                        val.departments = 1;
                        break;
                    case 'Dwarfs':
                        val.departments = 2;
                        break;
                    case 'Elfs':
                        val.departments = 3;
                        break;
                    case 'Sauron':
                        val.departments = 4;
                        break;
                }
                console.log('adding role')
                connection.query(
                    "INSERT INTO roles SET ?",
                    {
                        title: val.Title,
                        powerlvl: val.Powerlvl,
                        department_id: val.Department
                    }, function (err) {
                        if (err) throw err
                        console.table(val);
                        middleEarth();
                    }
                )
            })
    });
};

function addEmployee() {

    connection.query('SELECT employees, employees.first_name AS FirstName, employees.last_name AS LastName, employees.manager_id AS Manager employees.role_id AS Role FROM employees', function (err, res) {
        inquirer
            .prompt([
                {
                    name: "FirstName",
                    type: "input",
                    message: "What is this fodders first name?"
                }, {
                    name: "LastName",
                    type: "input",
                    message: "What is this fodders Last name?"
                },{
                    name: "Manager",
                    type: "input",
                    message:"who manages this fool?(number 1-4)",
                    
                },{
                    name: "Role",
                    type: "list",
                    message: "SAURON ASKS WHAT IS YOUR ROLE?",
                    choices: ["Wizard", "Spearmen","Elf Archer", "Halfling", "Fodder", "Uruk-hai"]
                }
            ]).then(val => {
                console.log('roles being drawn')
                switch (val.Role){
                    case 'Wizard':
                        val.Role = 1;
                        break;
                    case 'Spearmen':
                        val.Role = 2;
                        break;
                    case 'Elf Archer':
                        val.Role = 3;
                        break;
                    case 'Halfling':
                        val.Role = 4;
                        break;
                    case 'Fodder':
                        val.Role = 5;
                        break;
                    case 'Uruk-hai':
                        val.Role = 6;
                        break;
                }
                connection.query(
                    "INSERT INTO employees SET ?",
                    {
                        first_name: val.FirstName,
                        last_name: val.LastName,
                        role_id: val.role,
                        manager_id: val.Manager
                    },
                    function (err) {
                        if (err) throw err
                        console.table(val);
                        middleEarth();
                    }
                )
            });
    });
};
function updateEmployeeRole() {
    let allemployees = [];
    connection.query('SELECT * FROM employees', function (err, val) {
        if(err) throw err;
        const roleTable = val.map(role => {return {name: role.title, val: role.id}})
        for (var i = 0; i < val.length; i++) {
            let updateEmployee =
                val[i].id + " " + val[i].first_name + " " + val[i].last_name;
            allemployees.push(updateEmployee)
            console.log('you made it without any errs');
        } inquirer
            .prompt([
                {
                    type: "list",
                    name: "updateEmployeeRole",
                    message: "Select the someone from the Garrison to update role!",
                    choices: allemployees
                },
                {
                    type: "list",
                    name: "newEmployeeRole",
                    choices: ["Wizard", "Spearmen","Elf Archer", "Halfling", "Fodder", "Uruk-hai"],
                    message: "**SAURON DEMANDS YOU CHANGE ROLES PICK OR DO NOT PASS!**"
                }
            ]).then(val => {
                console.log('switching roles')
                switch (val.newEmployeeRole){
                    case 'Wizard':
                        val.newEmployeeRole = 1;
                        break;
                    case 'Spearmen':
                        val.newEmployeeRole = 2;
                        break;
                    case 'Elf Archer':
                        val.newEmployeeRole = 3;
                        break;
                    case 'Halfling':
                        val.newEmployeeRole = 4;
                        break;
                    case 'Fodder':
                        val.newEmployeeRole = 5;
                        break;
                    case 'Uruk-hai':
                        val.newEmployeeRole = 6;
                        break;
                }
                console.log(`Changing to ${val.newEmployeeRole} role..\n`);
                connection.query("UPDATE employees SET role_id = ? WHERE id = ?",[
                    {
                        role_id: val.role
                    },
                ],function(err){
                    if(err) throw err
                    console.table(val);
                    middleEarth();
                })
            }
            )
    })
}
endLotr = () => {
    connection.end()
    console.log("YOU WILL PERISH HOBBIT!!!")
}
module.exports = middleEarth();
