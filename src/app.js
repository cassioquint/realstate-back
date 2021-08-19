const express = require('express');
const cors = require('cors');
const webRoutes = require('./routes/web');
const adminRoutes = require('./routes/admin');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/../public'));
app.use(express.urlencoded({extended: false}));

app.use(passport.initialize());
app.use(passport.session());

const User = require('./models/User');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', webRoutes);
app.use('/admin', adminRoutes);

module.exports = app;