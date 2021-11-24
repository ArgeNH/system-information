const { Router } = require('express');
const {
    createPerson,
    getPerson,
    updatePerson,
    createProduction
} = require('../controllers/person');

const router = Router();

router.get('/', (req, res) => {
    res.render('index', { messages: req.flash('register')[0] });
});

router.get('/register-user', (req, res) => {
    res.render('register-user', { messages: req.flash('unregister')[0], register: req.flash('fregister')[0] });
});

router.get('/register-production', (req, res) => {
    res.render('register-production', { register: req.flash('product')[0], production: req.flash('register-production')[0] });
});

router.post('/add', createPerson);

router.post('/find', getPerson);

router.post('/add-production', createProduction);

module.exports = router;