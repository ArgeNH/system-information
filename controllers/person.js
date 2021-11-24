const { response } = require('express');
const Person = require('../models/person');

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
            message: 'Contact with admin'
        });
    }
};

const getPerson = async (req, res = response) => {
    const { idCard } = req.body;
    let person = await Person.findOne({ idCard });

    if (person) {
        //Registrado
        req.flash('product', `Registre la produccion de ${person.name} ${person.lastname} \n
        identificado con cedula ${person.idCard}`);
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

module.exports = {
    createPerson,
    getPerson,
    updatePerson
}