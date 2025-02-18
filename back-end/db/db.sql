CREATE DATABASE enmp;

USE enmp;

CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    access VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    id_collaborator int(4) NOT NULL,
    type_user ENUM('user', 'admin') NOT NULL
);