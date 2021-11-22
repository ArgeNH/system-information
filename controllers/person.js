const { response } = require('express');
const Swal = require('sweetalert2');

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
            /* return res.status(200).json({
                success: true,
                uid: person.uid,
                idCard: person.idCard,
                name: person.name,
                lastname: person.lastname,
                email: person.email
            }); */
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
        return res.status(200).json({
            success: true,
            person
        });
    } else {
        return res.status(400).json({
            success: false,
            message: 'Usuario no registrado'
        })
    }
};

const updatePerson = async (req, res = response) => {

}

module.exports = {
    createPerson,
    getPerson,
    updatePerson
}