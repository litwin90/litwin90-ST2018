const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const keys = require('./src/config/keys');

const app = express();
const port = process.env.PORT || 3000;

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

const authRouts = require('./src/routes/authRoutes')();

app.use('/auth', authRouts);

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

app.listen(port);
