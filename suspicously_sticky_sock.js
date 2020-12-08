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
                "View all employees",
                "View all employees by role", //
                "View all employees by department",
                "View all employees by manager", //The Nine Nazgûl
                "Add employee",
                "Add role",//finished
                "Add department",//finished
                "Update employee role"
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
            }
        })
}
function addDepartment() {
    connection.query('SELECT departments, departments.name AS Name', function (err, res) {
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

                    }, function(err) {
                        if(err) throw err;
                        console.table(val);
                        console.log('ERROR 404....sike it worked')
                        middleEarth();
                    }
                )
            })
    })
};
function viewAllEmployees(){
    connection.query('SELECT * FROM employees', function(err, val) {
        console.log('\n Roles for middleEarth \n');
        console.table(val);
    } )
}
function viewAllRoles(){

}
function viewAllDepartments(){
    connection.query('SELECT * FROM departments', function(err, val){
        console.log('\n Departments for middleEarth \n');
        console.table(val);
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
                    },function(err){
                        if(err) throw err
                        console.table(val);
                        middleEarth();
                    }
                )
            })
    });
};

function addEmployee() {

    connection.query('SELECT employees, employees.first_name AS FirstName, employees.last_name AS LastName, employees.manager_id AS Manager, employees.role_id AS Role FROM employees', function (err, res) {
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
                }, {
                    name: "Manager",
                    type: "list",
                    message: "Who is you manager?",
                }, {
                    name: "Role",
                    type: "choice",
                    message: "SAURON ASKS WHAT IS YOUR ROLE?"
                }
            ]).then(function (res) {
                connection.query(
                    "INSERT INTO employees SET ?",
                    {
                        first_name: res.FirstName,
                        last_name: res.LastName,
                        manager_id: res.Manager,
                        role_id: res.Role
                    },
                    function (err) {
                        if (err) throw err
                        console.table(res);
                        middleEarth();
                    }
                )
            });
    });
};


module.exports = middleEarth();