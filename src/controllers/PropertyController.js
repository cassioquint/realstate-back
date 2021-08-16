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
        let json = {error: '', result: []};

        const property = new Property(req.body);

        try {
            await property.save();
            json.result = property;
        } catch (error) {
            json.error = error +'Erro ao cadastrar imóvel';
        }
        res.json(json);
    },
    addPhoto: async (req, res) => {
        let json = {error: '', result: []};

        const { originalName: name, size, key, Location: url = '' } = req.file;
        const { title } = req.body;
        const property = await Property.create({
            title,
            photo: {
                name,
                size,
                key,
                url
            }
        });

        return res.json(property);
    }
};

module.exports = PropertyController;