DROP DATABASE IF EXISTS  uruk_hai_trackerDB;
CREATE DATABASE uruk_hai_trackerDB;
USE uruk_hai_trackerDB;

-- Department --
CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE role(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    powerlvl DECIMAL, -- salary --
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id)
);
CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE
    FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE CASCADE
);
-- Department seeds--
INSERT INTO department (name)
VALUE ("Humans");
INSERT INTO department (name)
VALUE ("Dwarfs");
INSERT INTO department (name)
VALUE("Elfs");
INSERT INTO department (name)
VALUE("Sauron");


-- employee role seeds-- -- manager --
INSERT INTO role (title, powerlvl, department_id) 
VALUE ("Wizard", 900, 1);
INSERT INTO role (title, powerlvl, department_id)
VALUE ("Spearmen", 20000, 3);
INSERT INTO role (title, powerlvl, department_id) 
VALUE ("Elf Archer", 39500, 2);
INSERT INTO role (title, powerlvl, department_id)
VALUE ("Halfling", 45000, 1);
INSERT INTO role (title, powerlvl, department_id)
VALUE ("Fodder", 500 , 3);
INSERT INTO role (title, powerlvl, department_id)
VALUE ("Uruk-hai", 19000, 4);


-- employee seeds --

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ( "Frodo", "Baggins", 1, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Saurman","Littleman", NULL, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Nazgûl","SnappyDwarf", 2, 3);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Aragorn","KingOfKings", 1, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Legolas","Bloom", 3, 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Gandalf","The Grey", 1, 6);


SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
