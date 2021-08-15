const multer = require('multer');
const sharp = require('sharp');
const uuid = require('uuid');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {

    if(file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb('Formato não suportado', false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

const uploadFiles = upload.array('photo', 10);

exports.uploadImages = (req, res, next) => {
    uploadFiles(req, res, (err) => {

        if(err instanceof multer.MulterError) {
            if(err.code === 'LIMIT_UNEXPECTED_FILE') {
                return console.log('Limite de imagens excedido');
            }
        } else if(err) {
            console.log(err);
        }
        next();
    });
};

exports.resizeImages = async (req, res, next) => {
    console.log(req.files.length)

    if(!req.files) return next();

    req.body.photo = [];

    await Promise.all(
        req.files.map(async (file) => {
            const filename = `${uuid.v4()}${file.originalname}`;
            
            await sharp(file.buffer)
                .resize(1000, null)
                .toFormat('jpeg')
                .jpeg({quality: 100})
                .toFile(`./public/media/${filename}`);

            req.body.photo.push(filename);  

            console.log(req.body.photo);
        })
    );
    next();
};