const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const CategorySchema = new Schema ({
    title: {
        type: String,
        trim: true,
        required: true
    },
    slug: String,
    description: String
});

module.exports = mongoose.model('Category', CategorySchema);