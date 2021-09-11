import express from 'express';
import MessageRoutes from './routes/MessageRoutes';
import cors from 'cors';
import fileupload from "express-fileupload";

enum RouterPrefix {
  messages = '/messages'
}

const app = express();
const port = process.env.PORT || 5000;

console.log('`${__dirname}/../public` - ', `${__dirname}/../public`);
app.use('/static', express.static(`${__dirname}/../public`));

app.use(cors())

app.use(fileupload());

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(RouterPrefix.messages, MessageRoutes);

app.listen(port);




console.log(`shoutout RESTful API server started on: ${port}`);
