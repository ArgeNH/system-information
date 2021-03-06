const { Router } = require('express');
const {
    createPerson,
    getPerson,
    getPersoStats,
    createProduction,
    updatePrice,
    statsMonth
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

router.get('/per-month', statsMonth);

router.get('/per-year', statsMonth);

router.get('/per-person', statsMonth);

module.exports = router;