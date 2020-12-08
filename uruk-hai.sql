DROP DATABASE IF EXISTS  uruk_haitrackerDB;
CREATE DATABASE uruk_haitrackerDB;

USE uruk_haitrackerDB;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    powerlvl DECIMAL, -- salary --
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);
CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE CASCADE
);
-- Department seeds--
INSERT INTO departments (name)
VALUE ("Humans");
INSERT INTO departments (name)
VALUE ("Dwarfs");
INSERT INTO departments (name)
VALUE("Elfs");
INSERT INTO departments (name)
VALUE("Sauron");


-- employee role seeds-- -- manager --
INSERT INTO roles (title, powerlvl, department_id) 
VALUE ("Wizard", 900, 1);
INSERT INTO roles (title, powerlvl, department_id)
VALUE ("Spearmen", 20000, 3);
INSERT INTO roles (title, powerlvl, department_id) 
VALUE ("Elf Archer", 39500, 2);
INSERT INTO roles (title, powerlvl, department_id)
VALUE ("Halfling", 45000, 1);
INSERT INTO roles (title, powerlvl, department_id)
VALUE ("Fodder", 500 , 3);
INSERT INTO roles (title, powerlvl, department_id)
VALUE ("Uruk-hai", 19000, 4);


-- employee seeds --

INSERT INTO employees (first_name, last_name, manager_id, role_id)
VALUE ( "Frodo", "Baggins", 1, 1);
INSERT INTO employees (first_name, last_name, manager_id, role_id)
VALUE ("Saurman","Littleman", NULL, 2);
INSERT INTO employees (first_name, last_name, manager_id, role_id)
VALUE ("Nazgûl","SnappyDwarf", 2, 3);
INSERT INTO employees (first_name, last_name, manager_id, role_id)
VALUE ("Aragorn","KingOfKings", 1, 4);
INSERT INTO employees (first_name, last_name, manager_id, role_id)
VALUE ("Legolas","Bloom", 3, 5);
INSERT INTO employees (first_name, last_name, manager_id, role_id)
VALUE ("Gandalf","The Grey", 1, 6);


SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;


-- show ALL employees with roles --
-- INNER JOIN will only return all matching values from both tables --

SELECT first_name, last_name, manager_id, role_id
FROM employees
INNER JOIN roles ON employees.role_id = roles.id;



-- show ALL books, even if we don't know the author
-- RIGHT JOIN returns all of the values from the right table, and the matching ones from the left table
SELECT name
FROM departments
RIGHT JOIN departments ON roles.department_id = departments.id;