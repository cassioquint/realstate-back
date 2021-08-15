const express = require('express');
const cors = require('cors');
const webRoutes = require('./routes/web');
const adminRoutes = require('./routes/admin');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/../public'));
app.use(express.urlencoded({extended: false}));


app.use('/', webRoutes);
app.use('/admin', adminRoutes);

module.exports = app;