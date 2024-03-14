import bodyParser from 'body-parser';
import express from 'express';
import sqlite3 from 'sqlite3';
import mongoose from 'mongoose';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

import router from './routers/apiRouter.js';

export const db = new sqlite3.Database('./db.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to SQlite!');
});

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
    // console.log('message:', message);
    io.emit('message', message);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(PORT, () => {
  console.log('Server is running on port: ' + PORT);
});
