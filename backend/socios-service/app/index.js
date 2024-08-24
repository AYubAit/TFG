const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const { collectDefaultMetrics, register }  = require('prom-client');
const port = 3000;
AUTH_SERVICE_URI= "http://auth-service:5001";
app.use(express.json());
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
app.use((req, res, next) => {
  if (req.path !== '/valid/:id') {  // Excluir el endpoint  si es necesario 
      verifyToken(req, res, next);
  } else {
      next();
  }
});

const db = new sqlite3.Database('/db/socis.db');

// Inicialitzar la base de dades
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS Socis (
      id INTEGER PRIMARY KEY,
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
  const { soci_id, data, importe } = req.body;
  db.run(`INSERT INTO Pagaments (soci_id, data, import) VALUES (?, ?, ?)`,
    [soci_id, data, importe],
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
// Ruta para verificar si un socio existe por ID
app.get('/valid/:id', (req, res) => {
  const { id } = req.params;
  db.get(`SELECT COUNT(*) AS count FROM Socis WHERE id = ?`, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (row.count > 0) {
      return res.status(200).json({ error: err.message });
    } else {
      return res.status(400).json({ error: err.message });
    }
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
      const totalPagat = pagaments.reduce((acc, pagament) => acc + pagament.importe, 0);
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