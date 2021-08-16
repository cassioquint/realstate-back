const express = require('express');
const router = express.Router();
const PropertyController = require('../controllers/PropertyController');
const multer = require('multer');
const multerConfig = require('../services/uploader');

router
    .get ('/imoveis', PropertyController.getAll)
    .get ('/imoveis/:id', PropertyController.getOne)
    .post ('/imoveis/novo', multer(multerConfig).single('photo'), PropertyController.addPhoto
    )

module.exports = router;