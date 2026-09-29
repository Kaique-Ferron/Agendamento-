create database if not exits agendamentos;

use agendamentos;

create table usuarios(
    id int AUTO_INCREMENT primary key,
    nome VARCHAR(255) not null unique,
    procedimento varchar (255) not null,
    dia date not null,
    hora time not null,
    create_at timestamp default current_timestamp,
)