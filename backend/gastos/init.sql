CREATE DATABASE IF NOT EXISTS gestioig;

USE gestioig;

CREATE TABLE IF NOT EXISTS Despesa (
  id_despesa INT PRIMARY KEY AUTO_INCREMENT,
  data DATE NOT NULL,
  import DECIMAL(10, 2) NOT NULL,
  categoria VARCHAR(255) NOT NULL,
  metode_pagament ENUM('efectiu', 'digital') NOT NULL,
  comentari TEXT,
  tiquet_adjunt VARCHAR(255),
  id_membre INT
);

CREATE TABLE IF NOT EXISTS Ingres (
  id_ingress INT PRIMARY KEY AUTO_INCREMENT,
  data DATE NOT NULL,
  import DECIMAL(10, 2) NOT NULL,
  font VARCHAR(255) NOT NULL,
  categoria VARCHAR(255) NOT NULL,
  comentari TEXT,
  metode_ingres ENUM('transferencia', 'efectivo', 'tpv') NOT NULL,
  id_membre INT
);
