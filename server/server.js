import bodyParser from 'body-parser';
import express from 'express';
import sqlite3 from 'sqlite3';

import router from './routers/apiRouter.js';

export const db = new sqlite3.Database('./db.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});

const app = express();

const PORT = 3000;

app.use(bodyParser.json());

app.use('/api', router);

app.listen(PORT, () => {
  console.log('Server is running on port: ' + PORT);
});
