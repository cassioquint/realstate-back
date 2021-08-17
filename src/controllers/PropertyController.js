const mongoose = require('mongoose'); 
const Property = mongoose.model('Property');

const PropertyController = {
    get: async (req, res) => {
        let limit = parseInt(req.query.l) || 5;
        let json = {error: '', result: []};
        let properties = await Property.find().sort({$natural:-1}).limit(limit);

        if (properties) {
            json.result = properties;
        } else {
            json.error = 'Nenhum imóvel encontrado';
        }
        res.json(json);
    },
    getOne: async (req, res) => {
        let json = {error: '', result: []};
        let property = await Property.findOne({ slug: req.params.slug });

        if (property) {
            json.result = property;
        } else {
            json.error = 'Imóvel não encontrado';
        }
        res.json(json);
    },
    getAll: async (req, res) => {
        let json = {error: '', result: []};
        let properties = await Property.find();

        if (properties) {
            json.result = properties;
        } else {
            json.error = 'Nenhum imóvel encontrado';
        }
        res.json(json);
    },
    add: async (req, res) => {
        const photo = [];

        if(req.files) {
            req.files.map((p) => {
                photo.push({
                    name: p.originalname,
                    size: p.size,
                    key: p.key,
                    url: p.Location
                })
            });
        }
        
        let priceSanitized = req.body.price.split(',').join('.');

        const { title,description,category,broker,goal,
            price_unit,price_before,price_after,
            land_area,building_area,rooms,bedrooms,bathrooms,parking_spaces,
            construction_year,differentials,on_plant,labels,
            neighborhood,city,state,
            slug,active } = req.body;

        const property = await Property.create({
            title,
            description,
            category,
            broker,
            goal,
            price: priceSanitized, price_unit, price_before, price_after,
            land_area, building_area,
            rooms, bedrooms, bathrooms, parking_spaces,
            construction_year,
            differentials,
            on_plant,
            labels,
            neighborhood, city, state,
            slug,
            active,
            photo
        });
        return res.json(property);
    },
    deleteOne: async (req, res) => {
        let json = {error: '', result: []};
        const property = await Property.findById(req.params.id);

        if(property) {
            json.result = property;
            await property.remove();
        } else {
            json.error = 'Nenhum imóvel encontrado';
        }  
        return res.json(json);
    }
};

module.exports = PropertyController;