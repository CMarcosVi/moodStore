CREATE DATABASE enmp;

USE enmp;

-- Tabela Users
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,  -- Nome do usuário
    access VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(60) UNIQUE NOT NULL UNIQUE,
    password VARCHAR(25) NOT NULL,
    id_collaborator INT NOT NULL UNIQUE,  -- Definindo 'id_collaborator' como único
    token VARCHAR(255) UNIQUE,  -- Maior tamanho para tokens
    type_user ENUM('user', 'admin') NOT NULL,
    wage FLOAT NOT NULL,
    position VARCHAR(255) NOT NULL,
);

-- Tabela Products
CREATE TABLE Products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    id_product INT UNIQUE NOT NULL.  -- id_product único
    price_for_unit INT NOT NULL
);

-- Tabela Teams
CREATE TABLE Teams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nameTeam VARCHAR(255) NOT NULL,
    teamArea TEXT NOT NULL,
    component1 INT,  -- Usando 'id_collaborator' de Users
    component2 INT,  -- Usando 'id_collaborator' de Users
    component3 INT,  -- Usando 'id_collaborator' de Users
    component4 INT,  -- Usando 'id_collaborator' de Users
    FOREIGN KEY (component1) REFERENCES Users(id_collaborator),
    FOREIGN KEY (component2) REFERENCES Users(id_collaborator),
    FOREIGN KEY (component3) REFERENCES Users(id_collaborator),
    FOREIGN KEY (component4) REFERENCES Users(id_collaborator)
);

-- TESTE

-- Inserindo usuários com senha criptografada
INSERT INTO Users (name, access, email, password, id_collaborator, token, type_user)
VALUES 
('Alice Oliveira', 'Full', 'alice@exemplo.com', '$2b$10$RjfaFa8j5I1OlY.EeghD9uZRfrzvWl1NFM2I.yXzY3wMXaqEGaVeC', 1001, NULL, 'admin'),
('Bob Silva', 'Partial', 'bob@exemplo.com', '$2b$10$Dcdh1.G6jo1FcT3dfq6Edkpht0hFVabJ3fV0tkv2weOhbRs2IoaE.', 1002, 'token_456', 'user'),
('Carlos Santos', 'Full', 'carlos@exemplo.com', '$2b$10$GbVjghHpVOTM07JQna.kU7cqe98VA1nCckmpUl9u5pzyFkDQZx2Q.', 1003, 'token_789', 'admin');

-- Inserindo produtos
INSERT INTO Products (name, quantity, id_product)
VALUES 
('Produto A', 100, 101),
('Produto B', 50, 102),
('Produto C', 200, 103);

-- Inserindo equipes, agora com 'id_collaborator' de Users
INSERT INTO Teams (nameTeam, teamArea, component1, component2, component3, component4)
VALUES 
('Equipe de Desenvolvimento', 'Desenvolvimento de software', 1001, 1002, 1003, NULL),
('Equipe de Marketing', 'Promoção e comunicação', 1002, 1003, 1001, NULL);
