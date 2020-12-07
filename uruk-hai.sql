DROP DATABASE IF EXISTS  uruk_hai_trackerDB;
CREATE DATABASE uruk_hai_trackerDB;
USE uruk_hai_trackerDB;

--Department--
CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
)