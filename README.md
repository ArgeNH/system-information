## Sistema de información para Asobreva

Al clonar el repositorio primero se debe correr el comando para instalar las dependecias usadas
```bash
npm install
```
y luego para ejecutar la aplicacion 
```bash
npm start
```
---
#### Rutas
- `/` Pagina principal
- `/register-user` Vista para registrar a una persona
- `/register-production` Vista para registrar la produccion del usuario
- `/view-stats` Vista para filtrar por estdisticas
---
#### Descripcion de carpetas
- `routes` tiene el archivo `index.js` donde se especifican las rutas del aplicativo.
- `views` tiene cada unas de las vistas necesarias para la aplicacion. Usa el motor de plantillas `EJS`.
- `controllers` Contiene los metodos que se ejecutan dependiendo de la interaccion con la aplicacion.
- `database` Contiene la configuracion de la base de datos 
- `models` Contiene los Schemas utilizados para la base de datos.
---
#### Archivo index.js
```javascript
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const route = require('./routes/index');
const db = require('./database/config');
const session = require('express-session');
const flash = require('connect-flash');

dotenv.config();

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'arge',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

app.use('/', route);

app.listen(app.get('port'), ()=> {
    console.log(`Server is listen in port ${app.get('port')}`);
});
```
---
#### Archivo routes/index.js
```javascript
const { Router } = require('express');
const {
    createPerson,
    getPerson,
    getPersoStats,
    createProduction,
    updatePrice
} = require('../controllers/person');

const router = Router();

router.get('/', (req, res) => {
    res.render('index', { messages: req.flash('register')[0] });  //Ruta principal
});

router.get('/register-user', (req, res) => {
    res.render('register-user', {
        messages: req.flash('unregister')[0],
        register: req.flash('fregister')[0]
    });
}); //Ruta para el registro de las personas

router.get('/register-production', (req, res) => {
    res.render('register-production', {
        register: req.flash('product')[0],
        production: req.flash('register-production')[0],
        price: req.flash('price')[0]
    });
});  //Ruta para registrar la produccion

router.get('/view-stats', (req, res) => {
    res.render('view-stats', {
        stats: req.flash('stats')[0]
    });
});

router.post('/add', createPerson); //Crea a una persona

router.post('/find', getPerson);    //Busca a una persona

router.post('/add-production', createProduction); //Crea una produccion

router.post('/price', updatePrice); //Actualiza precio

router.post('/findStats', getPersoStats);

module.exports = router;
```
---
#### Estructura del proyecto
```bash
│   index.js
│   package.json
│   README.md  
├───controllers
│       person.js
├───database
│       config.js
├───models
│       person.js
├───routes
│       index.js
└───views
    │   index.ejs
    │   register-production.ejs
    │   register-user.ejs
    │   view-stats.ejs
    └───templates
            footer.ejs
            header.ejs
            info.ejs
            navbar.ejs
```
