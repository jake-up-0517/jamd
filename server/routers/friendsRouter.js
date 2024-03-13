import express from 'express';

import friendsController from '../controllers/friendsController.js';

const friendsRouter = express.Router();

friendsRouter.get('/getAll', friendsController.getAll, (req, res) => {
  res.status(200).json(res.locals.friends);
});

export default friendsRouter;
