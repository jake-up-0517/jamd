import { db } from '../server.js';

const friendsController = {
  getAll: async (req, res, next) => {
    try {
      res.locals.friends = await new Promise((resolve, reject) => {
        db.all('SELECT * FROM users', (err, rows) => {
          if (err) {
            reject(err);
          }
          resolve(rows);
        });
      });
    } catch (err) {
      console.log(err);
    }
    return next();
  },
};

export default friendsController;
