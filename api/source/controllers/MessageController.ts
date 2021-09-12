import express from 'express';
import DatabaseService from '../services/DatabaseService';
import ImageService from '../services/ImageService';
import Message from '../models/Message';
import { UploadedFile } from 'express-fileupload';

type APICall = (req: express.Request, res: express.Response) => void;

const MESSAGES_LIMIT = 20;

const getMessages: APICall = async (req, res) => {
  try {
    const messages = await DatabaseService.messages.list();
    return res.json(messages);
  } catch (err) {
    return res.send(err);
  }
};

const postMessage: APICall = async (req, res) => {
  try {
    let filesArray = ((req.files && req.files.images) || []) as UploadedFile[];
    if (!Array.isArray(filesArray)) {
      filesArray = [filesArray];
    }
    console.log('req.files - ', req.files);
    console.log('filesArray - ', filesArray);
    const imagesPaths = await ImageService.uploadImages(filesArray);
    const newMessage = new Message(req.body.content, imagesPaths, req.body.display_name, req.body.user_ip, req.body.user_agent);
    const [insertionResponse] = await DatabaseService.messages.save(newMessage);

    const messagesList = await DatabaseService.messages.list();
    const numberOfMessages = messagesList.length;

    //Delete oldest message if the message limit is exceeded
    if (numberOfMessages > MESSAGES_LIMIT) {
      await ImageService.deleteImages(messagesList[(numberOfMessages - 1)].images);
      await DatabaseService.messages.delete(messagesList[(numberOfMessages - 1)].id);
    }

    return res.json(insertionResponse);
  } catch (err) {
    console.log('err - ', err);
    return res.send(err);
  }
}

const MessageController = {
  getMessages,
  postMessage
}

export default MessageController;