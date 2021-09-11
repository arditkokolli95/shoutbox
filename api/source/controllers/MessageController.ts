import express from 'express';
import DatabaseService from '../services/DatabaseService';
import ImageService from '../services/ImageService';
import Message from '../models/Message';
import { UploadedFile } from 'express-fileupload';

type APICall = (req: express.Request, res: express.Response) => void;

const MESSAGES_LIMIT = 20;

const getMessages: APICall = async(req, res) => {
  try {
    const messages = await DatabaseService.messages.list();
    return res.json(messages);
  } catch (err) {
    return res.send(err);
  }
};

const postMessage: APICall = async(req, res) => {
    const numberOfMessages = (await DatabaseService.messages.list()).length;
    if (numberOfMessages > MESSAGES_LIMIT) {
      // delete image
      // delete message
    }

  try {
    const filesArray = ((req.files && req.files.images) || []) as UploadedFile[];
    console.log('req.files - ', req.files);
    const imagesPaths = await ImageService.uploadImages(filesArray);
    const newMessage = new Message(req.body.content, imagesPaths, req.body.display_name);
    const [insertionResponse] = await DatabaseService.messages.save(newMessage);
    return res.json(insertionResponse);
  } catch (err) {
      console.log('err - ',err);
      return res.send(err);
  }
}

const MessageController = {
  getMessages,
  postMessage
}

export default MessageController;

// exports.list_all_tasks = function(req, res) {
//   Task.find({}, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };




// exports.create_a_task = function(req, res) {
//   var new_task = new Task(req.body);
//   new_task.save(function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };

// exports.read_a_task = function(req, res) {
//   Task.findById(req.params.taskId, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };


// exports.update_a_task = function(req, res) {
//   Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };


// exports.delete_a_task = function(req, res) {


//   Task.remove({
//     _id: req.params.taskId
//   }, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json({ message: 'Task successfully deleted' });
//   });
// };

// export default MessageController;  return res.json(messages);
//   } catch (err) {
//     return res.send(err);
//   }
// };

// exports.list_all_tasks = function(req, res) {
//   Task.find({}, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };




// exports.create_a_task = function(req, res) {
//   var new_task = new Task(req.body);
//   new_task.save(function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };

// exports.read_a_task = function(req, res) {
//   Task.findById(req.params.taskId, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };


// exports.update_a_task = function(req, res) {
//   Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };


// exports.delete_a_task = function(req, res) {


//   Task.remove({
//     _id: req.params.taskId
//   }, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json({ message: 'Task successfully deleted' });
//   });
// };
