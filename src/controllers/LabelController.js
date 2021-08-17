const mongoose = require('mongoose'); 
const Label = mongoose.model('Label');

const LabelController = {
    getAll: async (req, res) => {
        let json = {error: '', result: []};
        let labels = await Label.find();

        if (labels.length > 0) {
            json.result = labels;
        } else {
            json.error = 'Nenhum rótulo encontrado';
        }
        return res.json(json);
    },
    add: async (req, res) => {
        let json = {error: '', result: []};

        const label = new Label(req.body);

        try {
            await label.save();
            json.result = label;
        } catch (error) {
            json.error = error +' Erro ao cadastrar rótulo';
        }
        return res.json(json);
    },
    edit: async (req, res) => {
        let json = {error: '', result: []};
        let filter = { _id: req.params.id };
        let update = req.body;

        try {
            let label = await Label.findOneAndUpdate(filter, update);
            json.result = label._id;
        } catch (error) {
            json.error = error +' Rótulo não encontrado';
        }
        return res.json(json);
    },
    deleteOne: async (req, res) => {
        let json = {error: '', result: []};
        let filter = { _id: req.params.id };

        try {
            await Label.findByIdAndDelete(filter);
            json.result = req.params.id;
        } catch (error) {
            json.error = error +' Rótulo não encontrado';
        }
        return res.json(json);
    }
};

module.exports = LabelController;