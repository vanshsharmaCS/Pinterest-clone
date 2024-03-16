const multer = require('multer');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,'/images/uploads'); // Destination folder for uploads

  },
  filename: function (req, file, cb) {
    const uniqueFilename = uuidv4(); // Generating a unique filename
    cb(null, uniqueFilename);
  }
});

const upload=multer({storage:storage});
module.exports=upload
