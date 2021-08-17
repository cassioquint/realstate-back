const mongoose = require('mongoose'); 
const Differential = mongoose.model('Differential');

const DifferentialController = {
    getAll: async (req, res) => {
        let json = {error: '', result: []};
        let differentials = await Differential.find();

        if (differentials) {
            json.result = differentials;
        } else {
            json.error = 'Nenhum diferencial encontrado';
        }
        return res.json(json);
    },
    add: async (req, res) => {
        let json = {error: '', result: []};

        const differential = new Differential(req.body);

        try {
            await differential.save();
            json.result = differential;
        } catch (error) {
            json.error = error +' Erro ao cadastrar diferencial';
        }
        return res.json(json);
    },
    edit: async (req, res) => {
        let json = {error: '', result: []};
        let filter = { _id: req.params.id };
        let update = req.body;

        try {
            let differential = await Differential.findOneAndUpdate(filter, update);
            json.result = differential._id;
        } catch (error) {
            json.error = error +' Diferencial não encontrado';
        }
        return res.json(json);
    },
    deleteOne: async (req, res) => {
        let json = {error: '', result: []};
        let filter = { _id: req.params.id };

        try {
            await Differential.findByIdAndDelete(filter);
            json.result = req.params.id;
        } catch (error) {
            json.error = error +' Diferencial não encontrado';
        }
        return res.json(json);
    }
}

module.exports = DifferentialController;