const multer = require('multer');
const uuid = require('uuid');
const multerS3 = require('multer-s3');
const s3Storage = require('multer-sharp-s3');
const aws = require('aws-sdk');

const storageTypes = {
    local: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `${__dirname}/../../public/media`);
        },
        filename: (req, file, cb) => {
           file.key = `${uuid.v4()}-${file.originalname}`;
            cb(null, file.key);
        } 
    }),
    s3: s3Storage({
        s3: new aws.S3(),
        Bucket: 'valdoirbenites',
        ACL: 'public-read',
        resize: {
            width: 1280,
            height: null
        },
        Key: (req, file, cb) => {
            const fileName = `${uuid.v4()}-${file.originalname}`;
            cb(null, fileName);
        },
        max: true
    })
};

module.exports = {
    dest: `${__dirname}/../public/media`,
    storage: storageTypes['s3'],
    limits: {
        fileSize: 3 * 1024 * 1024
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