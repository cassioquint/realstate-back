const mongoose = require('mongoose'); 
const Category = mongoose.model('Category');

const CategoryController = {
    getAll: async (req, res) => {
        let json = {error: '', result: []};
        let categories = await Category.find();

        if (categories) {
            json.result = categories;
        } else {
            json.error = 'Nenhum categoria encontrado';
        }
        return res.json(json);
    },
    getOne: async (req, res) => {
        let json = {error: '', result: []};
        let category = await Category.findOne({ slug: req.params.slug });

        if (category) {
            json.result = category;
        } else {
            json.error = 'Categoria não encontrada';
        }
        return res.json(json);
    },
    add: async (req, res) => {
        let json = {error: '', result: []};

        const category = new Category(req.body);

        try {
            await category.save();
            json.result = category;
        } catch (error) {
            json.error = error +' Erro ao cadastrar categoria';
        }
        return res.json(json);
    },
    edit: async (req, res) => {
        let json = {error: '', result: []};
        let filter = { _id: req.params.id };
        let update = req.body;

        try {
            let category = await Category.findOneAndUpdate(filter, update);
            json.result = category._id;
        } catch {
            json.error = error +' Categoria não encontrada';
        }
        return res.json(json);
    }
};

module.exports = CategoryController;