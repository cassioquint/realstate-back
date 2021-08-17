const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const DifferentialSchema = new Schema ({
    title: {
        type: String,
        trim: true,
        required: true
    },
    slug: String
});

module.exports = mongoose.model('Differential', DifferentialSchema);