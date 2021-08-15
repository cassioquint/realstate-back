const mgs = require('mongoose');
require('dotenv').config();

const mongoose = mgs.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

mgs.Promise = global.Promise;
mgs.connection.on('error', (error) => {
    console.error('ERROR: '+ error.message);
});

module.exports = mongoose;