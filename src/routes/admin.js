const express = require('express');
const router = express.Router();
const PropertyController = require('../controllers/PropertyController');
const CategoryController = require('../controllers/CategoryController');
const DifferentialController = require('../controllers/DifferentialController');
const LabelController = require('../controllers/LabelController');
const UserController = require('../controllers/UserController');
const multer = require('multer');
const multerConfig = require('../services/uploader');
const authMdw = require('../Middlewares/AuthMdw');

router
    .get ('/imoveis', PropertyController.getAll)
    .get ('/imoveis/:id', PropertyController.getOneById)
    .post ('/imoveis', multer(multerConfig).array('photo', 10), PropertyController.add)
    .put ('/imoveis/:id', PropertyController.edit)
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
    .put ( '/rotulos/:id', LabelController.edit)
    .delete ('/rotulos/:id', LabelController.deleteOne)
    .post ('/register', UserController.register)
    .post ('/login', UserController.login)

module.exports = router;