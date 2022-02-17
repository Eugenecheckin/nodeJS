const multer = require('multer');
const { nanoid } = require('nanoid');

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('is-storege');
    cb(null, 'fileserver');
  },
  filename: (req, file, cb) => {
    const name = `${nanoid()}.${file.mimetype.split('/')[1].split('+')[0]}`;
    cb(null, name);
    req.headers.fileName = name;
  },
});

module.exports = multer({ storage: storageConfig }).single('file');
