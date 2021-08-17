const express = require('express');
const router = express.Router();
const PropertyController = require('../controllers/PropertyController');
const CategoryController = require('../controllers/CategoryController');
const multer = require('multer');
const multerConfig = require('../services/uploader');

router
    .get ('/imoveis', PropertyController.getAll)
    .get ('/imoveis/:id', PropertyController.getOne)
    .post ('/imoveis/novo', multer(multerConfig).array('photo', 10), PropertyController.add)
    .delete ('/imoveis/:id', PropertyController.deleteOne)
    .get ('/categorias', CategoryController.getAll)
    .get ('/categorias/:slug', CategoryController.getOne)
    .post ('/categorias', CategoryController.add)
    .put( '/categorias/:id', CategoryController.edit)

module.exports = router;