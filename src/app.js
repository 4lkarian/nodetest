import express from 'express';
import { pool } from './db.js';
import { PORT } from './config.js';

const app = express();


app.get('/', (req, res) => {
  //res.send('Server live');
  res.redirect('/index.html');
}
);
app.get('/ping', async (req, res) => {
    const resw = await pool.query('SELECT * FROM alumnos');
if(resw.length>0){
  res.send("conectado");
}
    console.log(resw);
    //res.send('Server live');
  }
  );

app.get('/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM alumnos');
    
    // Verificamos si hay resultados
    if (result.length > 0) {
      // Enviamos los resultados como JSON
      res.json(result);
    } else {
      // Si no hay resultados, enviamos un mensaje adecuado
      res.status(404).json({ message: 'No se encontraron alumnos' });
    }
  } catch (error) {
    // Manejo de errores
    console.error('Error al consultar la base de datos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});


app.listen(PORT);
console.log('Server is running on port ' + PORT); 

