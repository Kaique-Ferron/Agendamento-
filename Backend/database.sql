CREATE DATABASE IF NOT EXISTS agendamentos;

USE agendamentos;

CREATE TABLE usuarios(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL UNIQUE,
    procedimento VARCHAR(255) NOT NULL,
    dia DATE NOT NULL,
    hora TIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Corrigido: 'created_at' e sem vírgula no final
);
