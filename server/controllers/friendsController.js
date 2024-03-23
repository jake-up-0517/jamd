import { db } from '../server.js';

const friendsController = {
  getAll: async (req, res, next) => {
    const { email } = req.body;
    // console.log('friends controller email: ', email);
    try {
      res.locals.friends = await new Promise((resolve, reject) => {
        db.all(
          'SELECT u2.first_name, u2.last_name, u2.latitude, u2.longitude FROM friends JOIN users u1 ON u1.id = friends.user_id1 JOIN users u2 ON u2.id = friends.user_id2 WHERE u1.email = ?',
          [email],
          (err, rows) => {
            if (err) {
              reject(err);
            }
            // console.log('friends controller rows: ', rows);
            resolve(rows);
          }
        );
      });
    } catch (err) {
      console.log(err);
    }
    return next();
  },
  addFriend: async (req, res, next) => {
    const { userId, friendId } = req.body;
    try {
      res.locals.friend = await new Promise((resolve, reject) => {
        db.run(
          'INSERT INTO friends (user_id1, user_id2) VALUES (?, ?)',
          [userId, friendId],
          (err) => {
            if (err) {
              reject(err);
            }
          }
        );
        db.all(
          'SELECT u2.first_name, u2.last_name FROM friends JOIN users u1 ON u1.id = friends.user_id1 JOIN users u2 ON u2.id = friends.user_id2 WHERE u1.id = ? AND u2.id = ?',
          [userId, friendId],
          (err, rows) => {
            if (err) {
              reject(err);
            }
            resolve(rows);
          }
        );
      });
    } catch (err) {
      console.log(err);
    }
    return next();
  },
};

export default friendsController;
