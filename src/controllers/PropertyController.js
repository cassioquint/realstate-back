const mongoose = require('mongoose'); 
const Property = mongoose.model('Property');
const Category = mongoose.model('Category');

const PropertyController = {
    slugs: async (req, res) => {
        let json = {error: '', result: []};
        let properties = await Property
            .find({}, 'slug')
            .lean();

        if (properties) {
            properties.map((i) => {
                json.result.push(i.slug);
            })
        } else {
            json.error = 'Nenhum slug encontrado';
        }
        res.json(json);
    },
    get: async (req, res) => {
        let limit = parseInt(req.query.l) || '';
        let json = {error: '', result: []};
        let properties = await Property
            .find({active: true})
            .lean()
            .populate('labels','title')
            .sort({$natural:-1})
            .limit(limit);

        if (properties) {
            json.result = properties;
        } else {
            json.error = 'Nenhum imóvel encontrado';
        }
        res.json(json);
    },
    getOne: async (req, res) => {
        let json = {error: '', result: []};
        let property = await Property
            .findOne({ slug: req.params.slug })
            .lean()
            .populate('category')
            .populate('differentials')
            .populate('labels');

        if (property) {
            json.result = property;
        } else {
            json.error = 'Imóvel não encontrado';
        }
        res.json(json);
    },
    getOneById: async (req, res) => {
        let json = {error: '', result: []};
        let property = await Property.findById(req.params.id).lean()

        if(property) {
            json.result = property;
        } else {
            json.error = 'Imóvel não encontrado';
        }
        res.json(json);
    },
    getAll: async (req, res) => {
        let json = {error: '', result: []};
        let properties = await Property.find().lean();

        if (properties) {
            json.result = properties;
        } else {
            json.error = 'Nenhum imóvel encontrado';
        }
        res.json(json);
    },
    getFeatured: async (req, res) => {
        let json = {error: '', result: []};
        let limit = parseInt(req.query.l) || 4;
        let properties = await Property
            .find({featured: true, active: true})
            .lean()
            .limit(limit);

        if (properties) {
            json.result = properties;
        } else {
            json.error = 'Nenhum imóvel encontrado';
        }
        res.json(json);
    },
    getByCategory: async (req, res) => {
        let json = {error: '', result: []};

        let q = req.params.slug;
        let properties = await Property.
            find({category: await Category.find({slug: q}), active: true})
            .lean()
            .populate('labels')
            .populate('differentials')
            .sort({$natural:-1});

        if (properties) {
            json.result = properties;
        } else {
            json.error = 'Nenhum imóvel encontrado';
        }
        res.json(json);
    },
    getByCategoryId: async (req, res) => {
        let json = {error: '', result: []};

        let q = req.params.id;
        let properties = await Property.
            find({category: q, active: true})
            .lean()
            .select('_id');
        
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
        
        let priceSanitized = req.body.price? req.body.price.split(',').join('.') : undefined;

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
    edit: async (req, res) => {
        let json = {error: '', result: []};
        let filter = { _id: req.params.id };
        let update = req.body;

        try {
            let property = await Property.findOneAndUpdate(filter, update);
            json.result = property._id;
        } catch (error) {
            json.error = error +' Imóvel não encontrado';
        }
        return res.json(json);
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