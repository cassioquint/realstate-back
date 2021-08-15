const express = require('express');
const router = express.Router();

const PropertyController = require('../controllers/PropertyController');
const {uploadImages, resizeImages} = require('../services/uploader');

router
    .get ('/imoveis', PropertyController.getAll)
    .get ('/imoveis/:id', PropertyController.getOne)
    .post ('/imoveis/novo',
        uploadImages,
        resizeImages,
        PropertyController.add
    )

module.exports = router;