const { Router } = require('express');

const router = Router();


router.get('/', (req, res) => {
    res.render('index');
});

router.get('/register-user', (req, res)=>{
    res.render('register-user');
});

router.get('/register-production', (req, res)=>{
    res.render('register-production');
});

module.exports = router;