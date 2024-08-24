const express = require('express');
const prometheus = require('prom-client');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');

const app = express();
const port = config.port;
// Crear un contador
const counter = new prometheus.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
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
      const response = await axios.post(`${process.env.AUTH_SERVICE_URI}/auth/verify`, {}, {
          headers: { 'Authorization': token }
      });
      req.user = response.data.user;
      next();
  } catch (error) {
      return res.status(401).json({ msg: 'Invalid token' });
  }
};

// Aplicar el middleware globalmente
app.use(verifyToken);
app.use(bodyParser.json());

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware para contar solicitudes
app.use((req, res, next) => {
  counter.inc();
  next();
});

// Endpoint para métricas
app.get('/metrics', (req, res) => {
  res.set('Content-Type', prometheus.register.contentType);
  res.end(prometheus.register.metrics());
});


app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});