const express = require('express');
const router = express.Router();
const PropertyController = require('../controllers/PropertyController');
const CategoryController = require('../controllers/CategoryController');
const DifferentialController = require('../controllers/DifferentialController');
const LabelController = require('../controllers/LabelController');
const multer = require('multer');
const multerConfig = require('../services/uploader');

router
    .get ('/imoveis', PropertyController.getAll)
    .get ('/imoveis/:id', PropertyController.getOne)
    .post ('/imoveis', multer(multerConfig).array('photo', 10), PropertyController.add)
    .delete ('/imoveis/:id', PropertyController.deleteOne)
    .get ('/categorias', CategoryController.getAll)
    .get ('/categorias/:slug', CategoryController.getOne)
    .post ('/categorias', CategoryController.add)
    .put( '/categorias/:id', CategoryController.edit)
    .delete ('/categorias/:id', CategoryController.deleteOne)
    .get ('/diferenciais', DifferentialController.getAll)
    .post ('/diferenciais', DifferentialController.add)
    .put( '/diferenciais/:id', DifferentialController.edit)
    .delete ('/diferenciais/:id', DifferentialController.deleteOne)
    .get ('/rotulos', LabelController.getAll)
    .post ('/rotulos', LabelController.add)
    .put( '/rotulos/:id', LabelController.edit)
    .delete ('/rotulos/:id', LabelController.deleteOne)

module.exports = router;