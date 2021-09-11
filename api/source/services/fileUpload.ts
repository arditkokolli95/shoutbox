import util from 'util';
import path from 'path';
import multer from 'multer'

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(`${__dirname}/../../upload`));
  },
  filename: (req, file, callback) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      const message = `${file.originalname} is invalid. Only accept png/jpeg.`;
      return callback(message as any, null as any);
    }

    const filename = `${Date.now()}-shoutbox-${file.originalname}`;
    callback(null, filename);
  }
});

const uploadFiles = multer({ storage: storage }).array("multi-files", 10);
const uploadFilesMiddleware = util.promisify(uploadFiles);

export default uploadFilesMiddleware;