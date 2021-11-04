const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { ValidationError } = require('sequelize');

const { environment } = require('./config');
const isProduction = environment === 'production';

const routes = require('./routes');

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

// If in production, use cors
if (!isProduction) {
    app.use(cors());
}

// sets headers to secure the app
app.use(helmet({
    contentSecurityPolicy: false
}));

// sets _csurf token and creates req.csrfToken method
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true,
        },
    })
);

app.use(routes);

// Error handler to catch unhandled errors and send to error handler
app.use((_req, _res, next) => {
    const err = new Error('The requested resource couldn\'t be found.');
    err.title = 'Resource Not Found';
    err.errors = ['The requested resource couldn\'t be found.'];
    err.status = 404;
    next(err);
});

app.use((err, _req, _res, next) => {
    // check if error is from sequelize
    if (err instanceof ValidationError) {
        err.errors = err.errors.map(e => e.message);
        err.title = 'Validation Error';
    }
    next(err);
});

module.exports = app;
