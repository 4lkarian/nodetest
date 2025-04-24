import express from 'express';
import { pool } from './db.js';
import { PORT } from './config.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware para servir archivos estáticos


app.get('/', (req, res) => {
  res.send('Api En estado activo.');
  ///res.sendFile(__dirname+'/index.html');
  //res.redirect('/index.html');
});

// Redirigir a la página HTML
app.get('/home', function (req, res) {
  res.sendFile(__dirname + '/index.html'); // Asegúrate de que este archivo exista
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

app.post('/add/:usid/:name/:edad/:cal', (req, res) => {
    const { id, nombre, edad, cal } = req.params;
    db.query('INSERT INTO alumnos (id, nombre, edad,cal) VALUES (?, ?, ?,?)', [id, nombre, edad, cal], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'Item creado', id: result.insertId });
    });
  });

app.get('/alumno/:id', (req, res)=> {
const { id } = req.params;
  const result = await pool.query('SELECT * FROM alumnos WHERE id = ?', [id], (err, result)=>{
    if(err){
      return res.status(500).json({ error: err.message });
    }if(result.length === 0){
      return res.status(404).json({ message: 'Item No encontrado'});
    }
    res.json(result[0]);
  });
});


app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});

