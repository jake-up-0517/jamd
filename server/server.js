import bodyParser from 'body-parser';
import express from 'express';
import sqlite3 from 'sqlite3';
import mongoose from 'mongoose';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

// import data from '../utils/data.js';

import router from './routers/apiRouter.js';

export const db = new sqlite3.Database('./db.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to SQlite!');
});

// const insert = (arr) => {
//   const result = [];
//   const maxLat = 30.5;
//   const minLat = 29.5;
//   const maxLong = -97.5;
//   const minLong = -98.5;
//   arr.forEach((el) => {
//     const obj = {
//       id: el.id,
//       first_name: el.first_name,
//       last_name: el.last_name,
//       email: el.email,
//       latitude: Math.random() * (maxLat - minLat) + minLat,
//       longitude: Math.random() * (maxLong - minLong) + minLong,
//     };
//     result.push(obj);
//   });
//   return result;
// };

// insert(data).forEach((el) => {
//   db.run(
//     'INSERT INTO users (first_name, last_name, email, latitude, longitude) VALUES (?, ?, ?, ?, ?)',
//     [el.first_name, el.last_name, el.email, el.latitude, el.longitude]
//   );
// });

const mongoConnection = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://jc47882:RumHam47882!@cluster1.xasp6tn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1'
    );
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};
mongoConnection();

const app = express();
const server = createServer(app);

app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

const PORT = 3000;

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('message', (message) => {
    console.log('message:', message);
    io.emit('message', message);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(PORT, () => {
  console.log('Server is running on port: ' + PORT);
});
