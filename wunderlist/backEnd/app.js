const express = require('express');
const path = require('path');

const app = express();

const viewPath = path.resolve(__dirname, '../frontEnd/views/');
const stylePaht = path.resolve(__dirname, '../frontEnd/style/');
const srcPath = path.resolve(__dirname, '../frontEnd/src/');
app.use(express.static(viewPath));
app.use(express.static(stylePaht));
app.use(express.static(srcPath));


app.get('/', (req, res) => {
    res.sendFile('/index.html');
});


app.use(express.static(viewPath));
app.use(express.static(stylePaht));
app.use(express.static(srcPath));

app.get('/register', (req, res) => {
    res.sendFile('./register.html', { root: viewPath });
});

app.listen(3000);
