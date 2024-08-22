const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

app.use(express.json());

const db = new sqlite3.Database('/db/socis.db');

// Inicialitzar la base de dades
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS Socis (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nom TEXT,
      telefon TEXT,
      quota REAL,
      categoria TEXT
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS Pagaments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      soci_id INTEGER,
      data TEXT,
      import REAL,
      FOREIGN KEY(soci_id) REFERENCES Socis(id)
    )
  `);
});

// Ruta per registrar un nou soci
app.post('/socis', (req, res) => {
  const { nom, telefon, quota, categoria } = req.body;
  db.run(`INSERT INTO Socis (nom, telefon, quota, categoria) VALUES (?, ?, ?, ?)`,
    [nom, telefon, quota, categoria],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID });
    }
  );
});

// Ruta per registrar un pagament
app.post('/pagaments', (req, res) => {
  const { soci_id, data, import } = req.body;
  db.run(`INSERT INTO Pagaments (soci_id, data, import) VALUES (?, ?, ?)`,
    [soci_id, data, import],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID });
    }
  );
});

// Ruta per obtenir tots els socis
app.get('/socis', (req, res) => {
  db.all(`SELECT * FROM Socis`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Ruta per obtenir un soci per ID
app.get('/socis/:id', (req, res) => {
  const { id } = req.params;
  db.get(`SELECT * FROM Socis WHERE id = ?`, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(row);
  });
});

// Ruta per obtenir les quotes pagades i pendents d'un soci
app.get('/socis/:id/quotes', (req, res) => {
  const { id } = req.params;
  db.all(`SELECT * FROM Pagaments WHERE soci_id = ?`, [id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const pagaments = rows;
    db.get(`SELECT quota FROM Socis WHERE id = ?`, [id], (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      const quota = row.quota;
      const totalPagat = pagaments.reduce((acc, pagament) => acc + pagament.import, 0);
      const totalPendents = quota - totalPagat;
      res.json({
        pagaments,
        totalPagat,
        totalPendents
      });
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor escoltant a http://localhost:${port}`);
});