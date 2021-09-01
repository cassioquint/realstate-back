const express = require('express');
const router = express.Router();
const PropertyController = require('../controllers/PropertyController');
const CategoryController = require('../controllers/CategoryController');

router
    .get ('/api/slugs', PropertyController.slugs)
    .get ('/api/categories', CategoryController.categories)
    .get ('/api/properties', PropertyController.get)
    .get ('/api/properties/featured', PropertyController.getFeatured)
    .get ('/api/properties/category/:slug', PropertyController.getByCategory)
    .get ('/api/property/:slug', PropertyController.getOne)
    .get ('/api/category/:slug', CategoryController.getOne)
    .post ('/testes', (req, res) => {
        res.json(req.body);
    })

module.exports = router;