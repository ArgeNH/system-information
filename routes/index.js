const { Router } = require('express');
const { createPerson, getPerson, updatePerson } = require('../controllers/person');

const router = Router();

router.get('/', (req, res) => {
    res.render('index', { messages: req.flash('register')[0] });
});

router.get('/register-user', (req, res) => {
    res.render('register-user', { messages: req.flash('unregister')[0] });
});

router.get('/register-production', (req, res) => {
    res.render('register-production');
});

router.post('/add', createPerson);

module.exports = router;