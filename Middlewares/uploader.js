const multer = require('multer');

// basic usuage
// const upload = multer({
//     dest: './uploads'
// });
var myStorage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
    destination: function (req, file, cb) {
        cb(null, './uploads/images');
    }
});

function filter(req, file, cb) {
    var mimeType = file.mimetype.split('/')[0];
    if (mimeType === 'image') {
        cb(null, true);
    } else {
        req.fileErr = 'Inavlid file format';
        cb(null, false)
    }
}

var upload = multer({
    storage: myStorage,
    fileFilter: filter
});
module.exports = upload;
