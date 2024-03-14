import mongoose from 'mongoose';

//sqlite schemas
export const USERS_TABLE_SCHEMA = `
  CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name TEXT,
  last_name TEXT,
  email TEXT UNIQUE,
  latitude REAL DEFAULT 0.0,
  longitude REAL DEFAULT 0.0
);`;

export const FRIENDS_TABLE_SCHEMA = `
  CREATE TABLE IF NOT EXISTS friends (
    user_id1 INTEGER,
    user_id2 INTEGER,
    PRIMARY KEY (user_id1, user_id2),
    FOREIGN KEY (user_id1) REFERENCES users (id),
    FOREIGN KEY (user_id2) REFERENCES users (id)
  );`;

//Mongo schemas
const MessageSchema = new mongoose.Schema({
  sender: String,
  receiver: String,
  message: String,
  time: Number,
  expiresAt: {
    type: Date,
    default: new Date(),
    expires: 86400,
  },
});

export const Message = mongoose.model('Message', MessageSchema);
