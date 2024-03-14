import express from 'express';

import messagesController from '../controllers/messagesController.js';

const messagesRouter = express.Router();

messagesRouter.post('/getAll', messagesController.getAll, (req, res) => {
  res.status(200).json(res.locals.messages);
});

messagesRouter.post('/write', messagesController.write, (req, res) => {
  res.status(200).json(res.locals.message);
});

export default messagesRouter;
