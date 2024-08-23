CREATE TABLE IF NOT EXISTS Socis (
  id INTEGER PRIMARY KEY,
  nom TEXT,
  telefon TEXT,
  quota REAL,
  categoria TEXT
);

CREATE TABLE IF NOT EXISTS Pagaments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  soci_id INTEGER,
  data TEXT,
  import REAL,
  FOREIGN KEY(soci_id) REFERENCES Socis(id)
);