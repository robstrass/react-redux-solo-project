const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

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



module.exports = app;
