const { response } = require('express');
const Person = require('../models/person');
const Production = require('../models/production');

const createPerson = async (req, res = response) => {
    const { idCard } = req.body;
    try {

        let person = await Person.findOne({ idCard: idCard });
        if (person) {
            req.flash('unregister', `La persona con la cedula ${idCard} ya se encuentra registrada`);
            res.redirect('/register-user');
        } else {
            person = new Person(req.body);
            await person.save();
            req.flash('register', `La persona  con la cedula ${idCard} se ha registrado con exito`);
            res.redirect('/');
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: 'Ha ocurrido un error'
        });
    }
};

const getPerson = async (req, res = response) => {
    const { idCard } = req.body;
    let person = await Person.findOne({ idCard });
    //localStorage.setItem('idCard', JSON.stringify(person));
    if (person) {
        //Registrado
        req.flash('product', `Registre la produccion de ${person.name} ${person.lastname} \n
        identificado con cedula ${person.idCard}`);
        req.session.idCard = idCard;
        res.redirect('/register-production');
    } else {
        // No registrado
        req.flash('fregister', `La persona  con la cedula ${idCard} NO esta registrada, debe registrara para poder 
        anadir la produccion`);
        res.redirect('/register-user');
    }
};

const updatePerson = async (req, res = response) => {

}

const createProduction = async (req, res = response) => {
    const idCard = req.session.idCard;
    try {
        const production = new Production(req.body);
        const person = await Person.findOneAndUpdate({ idCard: idCard }, {
            $push: {
                'production': production._id
            }
        }, { new: true, useFindAndModify: true });

        await production.save();
        await person.save();

        req.flash('register-production', `Se ha registrado la produccion`);
        res.redirect('/register-production');
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: 'Ha ocurrido un error'
        });
    }
}

module.exports = {
    createPerson,
    getPerson,
    updatePerson,
    createProduction
}