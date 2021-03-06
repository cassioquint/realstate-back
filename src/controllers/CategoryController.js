const mongoose = require('mongoose'); 
const Category = mongoose.model('Category');

const CategoryController = {
    categories: async (req, res) => {
        let json = {error: '', result: []};
        let categories = await Category
            .find({}, 'slug')
            .lean();

        if (categories) {
            categories.map((i) => {
                json.result.push(i.slug);
            })
        } else {
            json.error = 'Nenhum slug encontrado';
        }
        res.json(json);
    },
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
        } catch (error) {
            json.error = error +' Categoria não encontrada';
        }
        return res.json(json);
    },
    deleteOne: async (req, res) => {
        let json = {error: '', result: []};
        let filter = { _id: req.params.id };

        try {
            await Category.findByIdAndDelete(filter);
            json.result = req.params.id;
        } catch (error) {
            json.error = error +' Categoria não encontrada';
        }
        return res.json(json);
    }
};

module.exports = CategoryController;