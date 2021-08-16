const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const PropertySchema = new Schema ({
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: String,
    category: {
        type: String,
    },
    broker: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    goal: String, //finalidade (venda, aluguel)
    price: Number,
    price_unit: String, //mil, milhoes, bilhoes
    price_before: String, //ex: Apenas, a partir de
    price_after: String, //ex: por mês
    land_area: Number,
    building_area: Number,
    rooms: Number,
    bedrooms: Number,
    bathrooms: Number,
    parking_spaces: Number,
    construction_year: Number,
    differentials: [ String ],
    on_plant: Boolean,
    labels: [ String ], //ex: exclusividade, financiamento direto, oferta
    neighborhood: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    photo: [{
        name: String,
        size: Number,
        key: String,
        url: String,
        createdAt: {
            type: Date,
            default: Date.now,
        }
    }],
    slug: String,
    active: {
        type: Boolean,
        default: true
    } 
});

module.exports = mongoose.model('Property', PropertySchema);