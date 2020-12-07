DROP DATABASE IF EXISTS  uruk_hai_trackerDB;
CREATE DATABASE uruk_hai_trackerDB;
USE uruk_hai_trackerDB;

--Department--
CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE role(
    id INIT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    powerlvl DECIMAL, --salary--
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id)
);
CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFRENCES  role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);
--Department seeds--
INSERT INTO department (name)
VALUE (1,"Humans");
INSERT INTO
VALUE (2,"Dwarfs");
INSERT INTO
VALUE(3,"Elfs");
INSERT INTO
VALUE(4,"Sauron");


--employee role seeds--
INSERT INTO role (title, powerlvl, department_id) --1--
VALUE ("Wizard", 900, 1);
INSERT INTO role (title, powerlvl, department_id)--2--
VALUE ("Spearmen", 20000, 3);
INSERT INTO role (title, powerlvl, department_id)--3--
VALUE ("Elf Archer", 39500, 2);
INSERT INTO role (title, powerlvl, department_id)--4--
VALUE ("Halfling", 45000, 1);
INSERT INTO role (title, powerlvl, department_id)--5--
VALUE ("Fodder", 500 , 3);
INSERT INTO role (title, powerlvl, department_id)--6--
VALUE ("Uruk-hai", 19000, 4);


--employee seeds

INSERT INTO role (first_name, last_name, manager_id, role_id)
VALUE ("Frodo","Baggins", 1, 1);
INSERT INTO role (first_name, last_name, manager_id, role_id)
VALUE ("Arwen","Littleman", 2, 1);
INSERT INTO role (first_name, last_name, manager_id, role_id)
VALUE ("Nazgûl", 39500, 4, 1);
INSERT INTO role (first_name, last_name, manager_id, role_id)
VALUE ("Aragorn", 45000, 1);
INSERT INTO role (first_name, last_name, manager_id, role_id)
VALUE ("Legolas", 39500 , 3);
INSERT INTO role (first_name, last_name, manager_id, role_id)
VALUE ("Gandalf", 120000, 1);
INSERT INTO role (first_name, last_name, manager_id, role_id)
VALUE ("kili", 19000, 2);