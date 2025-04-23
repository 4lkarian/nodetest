import express from 'express';
import { pool } from './db.js';
import { PORT } from './config.js';

const app = express();


app.get('/', (req, res) => {
  res.send('Server live');
}
);
app.get('/ping', async (req, res) => {
    const resw = await pool.query('SELECT "hello world" AS result');
    console.log(resw);
    res.send('Server live');
  }
  );


app.listen(PORT);
console.log('Server is running on port ' + PORT); 


