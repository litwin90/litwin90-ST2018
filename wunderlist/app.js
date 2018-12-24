process.env.DEBUG = 'app,app:*';

const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();
const port = process.env.PORT || 3000;

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
app.use(flash());

require('./src/config/passport.js')(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public/')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const authRouts = require('./src/routs/authRouts')();

app.use('/auth', authRouts);

app.get('/', (req, res) => {
    res.render(
        'index',
        {
            title: 'Wunderlist',
            err: req.session.errMess,
        },
    );
});

app.listen(port, () => {
    debug(`listening on  port ${chalk.green(port)}`);
});
