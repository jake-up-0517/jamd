import { db } from '../server.js';
import { USERS_TABLE_SCHEMA } from '../db/schemas.js';

const userController = {
  signIn: async (req, res, next) => {
    const { email } = req.body;
    console.log('email: ', email);
    res.locals.email = email;
    return next();
  },
  signUp: async (req, res, next) => {
    const { firstName, lastName, email } = req.body;
    try {
      await db.run(USERS_TABLE_SCHEMA);
      await db.run(
        `INSERT INTO users (first_name, last_name, email) VALUES (?, ?, ?)`,
        [firstName, lastName, email]
      );
      await db.all(
        'SELECT * FROM users ORDER BY id DESC LIMIT 1',
        (err, rows) => {
          if (err) {
            throw err;
          }
          console.log(rows);
        }
      );
    } catch (err) {
      console.log(err);
    }
    return next();
  },
};

export default userController;
