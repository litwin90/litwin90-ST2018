process.env.DEBUG = 'app,app:*';

const express = require('express');
const cors = require('cors');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const keys = require('./src/config/keys');

const app = express();
const port = process.env.PORT || 3000;

// const whitelist = ['http://localhost:3000', 'https://github.com'];
// const corsOptions = {
//     origin: whitelist,
//     credentials: true,
//     exposedHeaders:
//     ['Content-Length',
// 'Authorization', 'Content-Length',
// 'X-Requested-With', 'X-HTTP-Method-Override'],
//     maxAge: 36000000,
// };

app.use(cors());

app.use(morgan('tiny'));

app.use(bodyParser.json());
app.use(cookieParser());

app.use(session(
    {
        secret: keys.espressSession.key,
        saveUninitialized: true,
        resave: false,
    },
));

require('./src/config/passport.js')(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public/')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const authRouts = require('./src/routs/authRouts')();
const apiRouts = require('./src/routs/apiRouts')();

app.use('/auth', authRouts);
app.use('/api', apiRouts);

app.get('/', (req, res) => {
    if (req.user) {
        res.redirect('/auth/profile');
    } else {
        res.render(
            'index',
            {
                title: 'Wunderlist',
                err: req.session.errMess,
            },
        );
    }
});

app.listen(port, () => {
    debug(`listening on  port ${chalk.green(port)}`);
});
