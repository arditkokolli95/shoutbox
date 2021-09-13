# Shoutbox App

This application was developed using node.js for the backend and react for the client side.

The database in this case is on MySQL.

What the App does is that it allows the users to post messages using a rich text editor where you can customize the content of the message.

You can also add images to the message by using "Drag and Drop" or by clicking on the "Choose Files" button.

The users have the ability to add images on their own even if there is no text message provided but you can't post an empty message without text or images.

The user can choose a display name that will show on top of the message if provided. If he doesn't add the display name then 'Anonymous' will be displayed.

At the bottom of the message you can see the date and time when the message was posted.

Other information regarding the message and message poster that is saved on the database are the "User IP" and "User Agent" info (Browser name and version).

The number of messages shown on the App is limited to 20. When that limit is exceeded the older messages get deleted from the database and in case there was an image or multiple images attached to it they will also get deleted.

## Technical notes:

This app was built to make expansion easier if needed in the future since it has a strong base with good file organization and good programming practices.

## Usage

In order to run the App, first you need to import the shoutbox database by importing the 'shoutbox.sql' file in the root folder and update the MySQL database credentials insisde the 'db.ts' file in the 'api/config' folder.

After that you need to go inside the 'api' folder and first run the `npm install` script and then run the `npm run dev` script. 

Then you need to go to the 'web' folder and first run the `npm install` script and then run the `npm start` script and you should be good to go.

Happy message posting!
