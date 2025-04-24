import express from 'express';
import { pool } from './db.js';
import { PORT } from './config.js';
import path from 'path';

const app = express();

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Server live');
});

// Redirigir a la página HTML
app.get('/redirect', (req, res) => {
  res.redirect('/index.html'); // Asegúrate de que este archivo exista
});

// O puedes redirigir a otra página
app.get('/pagina', (req, res) => {
  res.redirect('/pagina.html'); // Asegúrate de que este archivo exista
});

app.get('/ping', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM alumnos');
    
    if (result.length > 0) {
      res.json(result);
    } else {
      res.status(404).json({ message: 'No se encontraron alumnos' });
    }
  } catch (error) {
    console.error('Error al consultar la base de datos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});

