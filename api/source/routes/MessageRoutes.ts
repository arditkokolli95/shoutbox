import MessageController from '../controllers/MessageController';
import express from 'express';

enum MessageRoute {
  list = '/',
  // single = '',
  create = '/',
  // update = '/:taskId',
  // delete = '/:taskId',
}

const MessageRoutes = express.Router();
MessageRoutes.get(MessageRoute.list, MessageController.getMessages);
// MessageRoutes.get(MessageRoute.single, MessageController.getMessage);
MessageRoutes.post(MessageRoute.create, MessageController.postMessage);
// MessageRoutes.put(MessageRoute.update, MessageController.editMessage);
// MessageRoutes.delete(MessageRoute.delete, MessageController.deleteMessage);



export default MessageRoutes;
