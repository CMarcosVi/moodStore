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


-- TESTE

INSERT INTO Users (name, access, email, password, id_collaborator, token, type_user)
VALUES 
('Alice Oliveira', 'Full', 'alice@exemplo.com', 'senha123', 1001, null, 'admin'),
('Bob Silva', 'Partial', 'bob@exemplo.com', 'senha456', 1002, 'token_456', 'user'),
('Carlos Santos', 'Full', 'carlos@exemplo.com', 'senha789', 1003, 'token_789', 'admin');

INSERT INTO Products (name, quantity, id_product)
VALUES 
('Produto A', 100, 101),
('Produto B', 50, 102),
('Produto C', 200, 103);


INSERT INTO Teams (nameTeam, teamArea, component1, component2, component3, component4)
VALUES 
('Equipe de Desenvolvimento', 'Desenvolvimento de software', 'Alice Oliveira', 'Bob Silva', 'Carlos Santos', NULL),
('Equipe de Marketing', 'Promoção e comunicação', 'Bob Silva', 'Carlos Santos', 'Alice Oliveira', NULL);
