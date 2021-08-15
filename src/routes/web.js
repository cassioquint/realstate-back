const express = require('express');
const router = express.Router();
const PropertyController = require('../controllers/PropertyController');

router
    .get('/api/properties', PropertyController.get)
    .get('/api/property/:slug', PropertyController.getOne)

module.exports = router;