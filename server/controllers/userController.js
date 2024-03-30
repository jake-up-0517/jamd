import { db } from '../server.js';
import { USERS_TABLE_SCHEMA } from '../db/schemas.js';

const userController = {
  signIn: async (req, res, next) => {
    const { email } = req.body;
    console.log('email: ', email);
    try {
      res.locals.name = await new Promise((resolve, reject) => {
        db.all(
          'SELECT first_name, last_name FROM users WHERE email = ?',
          [email],
          (err, rows) => {
            if (err) {
              reject(err);
            }
            resolve([rows[0].first_name, rows[0].last_name]);
          }
        );
      });
    } catch (err) {
      console.log(err);
    }
    return next();
  },
  signUp: async (req, res, next) => {
    const { firstName, lastName, email } = req.body;
    try {
      res.locals.name = await new Promise((resolve, reject) => {
        db.run(
          `INSERT INTO users (first_name, last_name, email) VALUES (?, ?, ?)`,
          [firstName, lastName, email]
        );
        db.all(
          'SELECT first_name, last_name FROM users WHERE email = ?',
          [email],
          (err, rows) => {
            if (err) {
              reject(err);
            }
            resolve([rows[0].first_name, rows[0].last_name]);
          }
        );
      });
    } catch (err) {
      console.log(err);
    }
    return next();
  },
  updateLocation: async (req, res, next) => {
    const { latitude, longitude, email } = req.body;
    try {
      await db.run(USERS_TABLE_SCHEMA);
      await db.run(
        `UPDATE users SET latitude = ?, longitude = ? WHERE email = ?`,
        [latitude, longitude, email]
      );
      await db.all(
        'SELECT * FROM users WHERE email = ?',
        [email],
        (err, rows) => {
          if (err) {
            throw err;
          }
          // console.log(rows);
        }
      );
    } catch (err) {
      console.log('Error in updateLocation: ', err);
    }
    return next();
  },
};

export default userController;
