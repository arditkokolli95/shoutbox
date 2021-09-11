import dbconnection from '../../config/db';
import Message from '../models/Message';

const DatabaseService = {
  messages: {
    list: async() => dbconnection('messages').orderBy('id', 'desc').select(),
    save: (newMessage: Message) => dbconnection('messages').insert(newMessage, "*"), 
  } 
};

export default DatabaseService;