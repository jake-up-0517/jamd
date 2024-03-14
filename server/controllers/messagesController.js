import { Message } from '../db/schemas.js';

const messagesController = {
  getAll: async (req, res, next) => {
    const { sender, receiver } = req.body;
    try {
      const messages = await Message.find({
        $or: [
          { sender, receiver },
          { sender: receiver, receiver: sender },
        ],
      }).sort({ time: 1 });
      // console.log('get all messages', messages);
      res.locals.messages = messages;
    } catch (err) {
      console.log(err);
    }
    return next();
  },
  write: async (req, res, next) => {
    const { sender, receiver, message, time } = req.body;
    // console.log('new message', req.body);
    try {
      const newEntry = new Message({
        sender,
        receiver,
        message,
        time,
      });
      // console.log('new entry', newEntry);
      await newEntry.save();
      console.log('Message saved');
      res.locals.message = message;
    } catch (err) {
      console.log(err);
    }
    return next();
  },
};

export default messagesController;
