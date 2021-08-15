const multer = require('multer');
const uuid = require('uuid');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

module.exports = {
    dest: `${__dirname}/../public/media`,
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `${__dirname}/../public/media`);
        },
        filename: (req, file, cb) => {
            const fileName = `${uuid.v4()}-${file.originalname}`;
            cb(null, fileName);
        } 
    }),
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes= [
            'image/jpeg',
            'image/pjpeg',
            'image/jpg',
            'image/png'
        ];
        if(allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type"));
        }
    }
}