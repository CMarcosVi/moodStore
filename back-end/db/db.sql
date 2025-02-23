CREATE DATABASE enmp;

USE enmp;

-- Tabela Users
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,  -- Garantindo que o nome seja único
    access VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    id_collaborator INT(4) NOT NULL,
    token VARCHAR(150),
    type_user ENUM('user', 'admin') NOT NULL
);

-- Tabela Products
CREATE TABLE Products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL, -- Corrigido de 'quantidy' para 'quantity'
    id_product INT NOT NULL UNIQUE
);

-- Tabela Teams
CREATE TABLE Teams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nameTeam VARCHAR(255) NOT NULL,
    teamArea TEXT NOT NULL,
    component1 VARCHAR(255),  -- Usando 'name' de Users
    component2 VARCHAR(255),  -- Usando 'name' de Users
    component3 VARCHAR(255),  -- Usando 'name' de Users
    component4 VARCHAR(255),  -- Usando 'name' de Users
    FOREIGN KEY (component1) REFERENCES Users(name),
    FOREIGN KEY (component2) REFERENCES Users(name),
    FOREIGN KEY (component3) REFERENCES Users(name),
    FOREIGN KEY (component4) REFERENCES Users(name)
);
