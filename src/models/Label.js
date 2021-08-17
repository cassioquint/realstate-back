const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const LabelSchema = new Schema ({
    title: {
        type: String,
        trim: true,
        required: true
    }
});

module.exports = mongoose.model('Label', LabelSchema);