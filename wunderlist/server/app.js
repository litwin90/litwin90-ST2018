process.env.DEBUG = 'app,app:*';

const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('tiny'));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(session(
    {
        secret: 'smthNotMatter',
        saveUninitialized: true,
        resave: false,
    },
));

require('./src/config/passport.js')(app);

app.use(bodyParser.urlencoded({ extended: false }));

const authRouts = require('./src/routs/authRouts')();

app.use('/auth', authRouts);

app.listen(port, () => {
    debug(`listening on  port ${chalk.green(port)}`);
});
