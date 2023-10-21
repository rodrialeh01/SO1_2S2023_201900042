CREATE DATABASE IF NOT EXISTS sistemanotas;

CREATE TABLE IF NOT EXISTS sistemanotas.alumno (
    id INT NOT NULL AUTO_INCREMENT,
    carnet BIGINT NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    curso VARCHAR(4) NOT NULL,
    nota INT NOT NULL,
    semestre VARCHAR(2),
    year INT,
    PRIMARY KEY (id)
);