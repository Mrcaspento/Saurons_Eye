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
connection.connect(function(err){
    if(err) throw err;
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
                "Add role",
                "Add department",
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

         

function addRole() {
      
        connection.query('SELECT role, role.title AS Title, role.powerlvl AS Powerlvl FROM role', function (err, res) {
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
                }
            ]).then(function (res) {
                connection.query(
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
    };


module.exports = middleEarth();