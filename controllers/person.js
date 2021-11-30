const { response } = require('express');
const Person = require('../models/person');
const Production = require('../models/production');
const { writeFileSync, readFileSync } = require('fs');

let pathFile = `${__dirname}\\\price.json`;

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
    if (person) {
        //Registrado
        req.flash('product', `Registre la produccion de ${person.name} ${person.lastname} \n
        identificado con cedula ${person.idCard}`);
        req.session.idCard = idCard;
        res.redirect('/register-production');
    } else {
        // No registrado
        req.flash('fregister', `La persona  con la cedula ${idCard} NO esta registrada, debe registrarla para poder 
        anadir la produccion`);
        res.redirect('/register-user');
    }
};

const getPersoStats = async (req, res = response) => {
    const { idCard } = req.body;
    let person = await Person.findOne({ idCard });
    if (person) {
        req.flash('stats', `Puede buscar por las siguientes estadisticas`);
        req.session.idCard = idCard;
        res.redirect('view-stats');
    } else {
        req.flash('fregister', `La persona  con la cedula ${idCard} NO esta registrada, debe registrarla para poder 
        anadir la produccion`);
        res.redirect('/register-user');
    }
}

const createProduction = async (req, res = response) => {
    const idCard = req.session.idCard;
    const data = readFileSync(pathFile);
    const { price } = JSON.parse(data);
    const payment = req.body.weight * price;
    req.body.payment = payment;

    try {
        const production = new Production(req.body);
        const person = await Person.findOneAndUpdate({ idCard: idCard }, {
            $push: {
                'production': production._id
            }
        }, {
            new: true,
            useFindAndModify: true
        });

        await production.save();
        await person.save();

        let formatPayment = new Intl.NumberFormat().format(production.payment);

        req.flash('register-production', `Se ha registrado la produccion de ${person.name} 
        ${person.lastname}. El pago es de $${formatPayment} pesos`);
        res.redirect('/register-production');
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: 'Ha ocurrido un error'
        });
    }
};

const updatePrice = async (req, res = response) => {
    try {
        writeFileSync(pathFile, JSON.stringify({
            price: req.body.price
        }, null, 2), 'utf8');
        console.log(`Precio Actulizado a : $${req.body.price}`);
    } catch (e) {
        console.log('Error al escribir el archivo', e);
    }
    res.redirect('/register-production');
};

const statsMonth = async (req, res = response) => {
    const idCard = req.session.idCard;
    let result = await Person.findOne({ idCard });
    let { production } = await result;
    //console.log(JSON.parse(production));
    let resultP = await Production.find({ production });
    let dataTable = []
    for (let i = 0; i < resultP.length; i++) {
        let date = resultP[i].date;
        let aux = date.toString();
        let month = aux.slice(4, 7);
        dataTable.push({
            weight: resultP[i].weight,
            pay: resultP[i].payment,
            date: month
        })
    }
    res.render('stats', { production: dataTable });
}

module.exports = {
    createPerson,
    getPerson,
    getPersoStats,
    createProduction,
    updatePrice,
    statsMonth
}