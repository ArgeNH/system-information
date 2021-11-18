const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const route = require('./routes/index');
const db = require('./database/config');

dotenv.config();

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', route);

app.listen(app.get('port'), ()=> {
    console.log(`Server is listen in port ${app.get('port')}`);
});

db();