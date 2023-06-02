// Librerias
//npm install express path express-handlebars method-override express-session passport passport-local
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');

// Inticializacion
const app = express();
require('./config/passport');




// Settings 
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs.engine({
    defaultLayouts: 'index',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialaDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');



// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());
// app.use(flash());s

// Global variables
app.use((req, res, next) => {
    // res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});




// Routes
app.use(require('./routes/apiWeb.routes')); // API WEB
app.use(require('./routes/apiWebViews.routes')) // API WEB VIEWS
app.use(require('./routes/apiHousePlant.routes')) // API House Plant


// Static files
app.use(express.static(path.join(__dirname, 'public')));


module.exports = app;
