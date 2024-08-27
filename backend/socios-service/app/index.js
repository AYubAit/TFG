const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const { collectDefaultMetrics, register } = require('prom-client');
const port = 3000;
AUTH_SERVICE_URI = "http://auth-service:5001";
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
const verifyToken = async (req, res, next) => {
  const token = req.headers['authorization'];

  // Permitir acceso sin autenticación al endpoint /metrics
  if (req.path === '/metrics') {
    return next();
  }



  if (!token) {
    return res.status(401).json({ msg: 'Missing token' });
  }

  try {
    const response = await axios.post(`${AUTH_SERVICE_URI}/auth/verify`, {}, {
      headers: { 'Authorization': token }
    });
    req.user = response.data.user;
    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Invalid token' });
  }
};



// Aplicar el middleware globalmente
/*
app.use((req, res, next) => {
  if (req.path !== '/valid/:id') {  // Excluir el endpoint  si es necesario 
      verifyToken(req, res, next);
  } else {
      next();
  }
});*/

const db = new sqlite3.Database('/db/socis.db');

// Inicialitzar la base de dades
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS Socis (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nom TEXT NOT NULL,
      telefon TEXT,
      quota REAL NOT NULL,
      categoria TEXT
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS Pagaments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      soci_id INTEGER NOT NULL,
      data TEXT NOT NULL,
      import REAL NOT NULL,
      FOREIGN KEY(soci_id) REFERENCES Socis(id)
    )
  `);
});

collectDefaultMetrics();


// Endpoint para exponer métricas
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  try {
    const metrics = await register.metrics();
    res.end(metrics);
  } catch (err) {
    res.status(500).end(err.message);
  }
});


// mostrar un mensaje y los nombres de las tablas existentes
app.get('/', (req, res) => {
  db.all(`SELECT name FROM sqlite_master WHERE type='table'`, [], (err, tables) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const tableNames = tables.map(table => table.name);
    res.send(`Este es el microservicio de gestión de socios. Tablas existentes: ${tableNames.join(', ')}`);
  });
});

// mostrar un mensaje y los nombres de las tablas existentes
app.get('/socis/:id', (req, res) => {
  db.all(`SELECT * FROM Socis WHERE id=?`, [req.params.id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
  
    res.json(rows);
  });
});


// mostrar un mensaje y los nombres de las tablas existentes
app.get('/socis', (req, res) => {
  db.all(`SELECT * FROM Socis`, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
  
    res.json(rows);
  });
});


// Ruta per obtenir socis amb les quotes pendents
app.get('/socisAmbCuotesPendents', (req, res) => {
  const year = req.query.year || new Date().getFullYear(); // Obtenim l'any dels paràmetres de consulta o utilitzem l'any actual per defecte
  db.all(
    `SELECT s.id AS Targeta, s.nom AS Nom, s.telefon AS Telefon, s.quota AS Quota,
      (12 * s.quota) - IFNULL((SELECT SUM(p.import) 
                               FROM Pagaments p 
                               WHERE p.soci_id = s.id AND strftime('%Y', p.data) = ?), 0) AS total_pendent, s.categoria AS Categoria
     FROM Socis s;`,
    [year],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    }
  );
});


// Ruta per crear un nou soci
app.post('/socis', (req, res) => {
  const { Nom, Telefon, Quota , Categoria } = req.body;

  if (!Nom || !Telefon || !Quota || !Categoria) {
    return res.status(400).json({ error: "Falten dades per crear el soci" });
  }

  const query = `INSERT INTO Socis (nom, telefon, quota, categoria) VALUES (?, ?, ?,?)`;
  db.run(query, [Nom, Telefon, Quota, Categoria], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, Nom, Telefon, Quota, Categoria });
  });
});



// Ruta per actualitzar un soci existent
app.put('/socis/', (req, res) => {

  const { Targeta, Nom, Telefon, Quota, Categoria } = req.body;

  if (!Targeta ||!Nom || !Telefon || !Quota || !Categoria) {
    return res.status(400).json({ error: "Falten dades per actualitzar el soci" });
  }

  const query = `UPDATE Socis SET nom = ?, telefon = ?, quota = ?, categoria = ? WHERE id = ?`;
  db.run(query, [Nom, Telefon, Quota, Categoria, Targeta], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Soci no trobat" });
    }
    res.json({ Targeta, Nom, Telefon, Quota, Categoria });
  });
});


// Ruta per eliminar un soci existent
app.delete('/socis/:id', (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM Socis WHERE id = ?`;
  db.run(query, id, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Soci no trobat" });
    }
    res.json({ message: "Soci eliminat correctament" });
  });
});

app.listen(port, () => {
  console.log(`Servidor escoltant a http://localhost:${port}`);
});