CREATE DATABASE IF NOT EXISTS votaciones CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

USE votaciones;

CREATE TABLE IF NOT EXISTS votacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descripcion VARCHAR(200) NOT NULL,
    fecha_inicio DATETIME NOT NULL,
    fecha_fin DATETIME NOT NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS pregunta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    texto VARCHAR(200) NOT NULL,
    votacion_id INT NOT NULL,
    FOREIGN KEY (votacion_id) REFERENCES votacion(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS opcion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    texto VARCHAR(200) NOT NULL,
    pregunta_id INT NOT NULL,
    FOREIGN KEY (pregunta_id) REFERENCES pregunta(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS respuesta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    texto VARCHAR(200) NOT NULL,
    pregunta_id INT NOT NULL,
    usuario_id INT NOT NULL,
    fecha_respuesta DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pregunta_id) REFERENCES pregunta(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;