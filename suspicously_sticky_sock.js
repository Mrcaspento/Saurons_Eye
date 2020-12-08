const inquirer = require("inquirer")
const cTable = require('console.table');
const promisemysql = require("promise-mysql");
const mysql = require("mysql");
  middleEarth = () => {
    inquirer
        .prompt({

            name: "choices",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all employees",
                "View all employees by role", //
                "View all employees by department",
                "View all employees by manager", //The Nine Nazgûl
                "Add employee",
                "Add role",
                "Add department",
                "Update employee role",
            ]
        }).then( (val) => {
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
            }
        })
}
function addEmployee() {

    let roleArray = [];

    let managerArray = [];

    promisemysql.createConnection(connectionProperties).then((conn) => {
        return Promise.all([
            conn.query('SELECT id, title FROM role ORDER BY title ASC'),
            conn.query("SELECT employee.id, concat(employee.first_name,' ',employee.last_name) AS Employee FROM employee ORDER BY Employee ASC")
        ]);
    }).then(([roles, managers]) => {
        for (var i = 0; i < roles.length; i++) {
            roleArray.push(roles[i].title);
        }
        for (var j = 0; j < managers.length; i++) {
            managerArray.push(managers[j].Employee);
        }
        return Promise.all([roles, managers]);
    }).then(([roles, managers]) => {
        managerArray.unshift('--');
        inquirer.prompt([
            {
                name: "firstName",
                type: "input",
                message: "YOU SHALL NOT PASS WITHOUT YOUR FIRST NAME!",
                validate: function (input) {
                    if (input === "") {
                        console.log("**FOOL SAURON HAS CURRUPTED YOU**");
                        return false;
                    } else {
                        return true;
                    }
                }
            }, {
                name: "lastName",
                type: "input",
                message: "YOU SHALL NOT PASS WITHOUT YOUR LAST NAME!",
                validate: function (input) {
                    if (input === "") {
                        console.log("**FOOL SAURON HAS CURRUPTED YOU**");
                        return false;
                    } else {
                        return true;
                    }
                }

            }
        ])
    })
}

function addRole() {
    promisemysql.createConnection(connectionProperties).then((connection) => {

        connection.query('SELECT role.title AS Title, role.powerlvl AS Powerlvl FROM role', function (err, res) {
            inquirer.prompt([
                {
                    name: "Title",
                    type: "input",
                    message: "What is this fodder for the WarMachines Title?"
                }, {
                    name: "Powerlvl",
                    type: "input",
                    message: "Sauron says your PowerLvl is?"
                }
            ]).then(function (res) {
                conn.query(
                    "INSERT INTO role SET ?",
                    {
                        title: res.Title,
                        powerlvl: res.Powerlvl,
                    },
                    function (err) {
                        if (err) throw err
                        console.table(res);
                        middleEarth();
                    }
                )
            });
        });
    });
}

const viewAllDepartments = () => {
    const deptQuery = 'SELECT * FROM departments';
    connection.query(deptQuery, (err, results) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: 'deptChoice',
                type: 'list',
                choices: function () {
                    let choiceArray = results.map(choice => choice.department_name)
                    return choiceArray;
                },
                message: 'Select a Department to view:'
            }
        ]).then((answer) => {
            let chosenDept;
            for (let i = 0; i < results.length; i++) {
                if (results[i].department_name === answer.deptChoice) {
                    chosenDept = results[i];
                }
            }

            const query = 'SELECT e.id, e.first_name AS "First Name", e.last_name AS "Last Name", r.title AS "Title", d.department_name AS "Department", r.powerlvl AS "Powerlvl" FROM employees e INNER JOIN roles r ON r.id = e.role_id INNER JOIN departments d ON d.id = r.department_id WHERE ?;';
            connection.query(query, { department_name: chosenDept.department_name }, (err, res) => {
                if (err) throw err;
                console.log(' ');
                console.table(chalk.yellow(`All Employees by Department: ${chosenDept.department_name}`), res)
                middleEarth();
            })
        })
    })
}

module.exports = middleEarth();