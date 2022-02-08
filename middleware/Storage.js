const multer = require('multer');

const store = multer.diskStorage({
  destination(request, responce, cb) {
    cb(null, 'fileserver/');
  },
  filename(request, file, cb) {
    cb(null, file.originalname);
  },
});

const types = ['image/jpg', 'image/jpeg', 'image/svg', 'image/png'];

const fileFilter = (request, file, cb) => {
  if (types.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = multer({ store, fileFilter });
