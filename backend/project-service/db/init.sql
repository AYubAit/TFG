CREATE TABLE IF NOT EXISTS Projecte (
    id_projecte SERIAL PRIMARY KEY,
    nom_projecte VARCHAR(100),
    descripcio TEXT,
    data_inici DATE,
    data_final DATE,
    estat VARCHAR(50),
    pressupost NUMERIC,
    total_recaptat NUMERIC
);

CREATE TABLE IF NOT EXISTS Donacio (
    id_donacio SERIAL PRIMARY KEY,
    id_projecte INT REFERENCES Projecte(id_projecte),
    import NUMERIC,
    data DATE,
    id_donant INT
);
