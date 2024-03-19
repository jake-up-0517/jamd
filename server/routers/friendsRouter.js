import express from 'express';

import friendsController from '../controllers/friendsController.js';

const friendsRouter = express.Router();

friendsRouter.post('/getAll', friendsController.getAll, (req, res) => {
  res.status(200).json(res.locals.friends);
});

friendsRouter.post('/addFriend', friendsController.addFriend, (req, res) => {
  res.status(200).json(res.locals.friend);
});

export default friendsRouter;
