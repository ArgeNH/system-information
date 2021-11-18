const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB, {
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('DB Online');
        return 'DB Online';
    } catch (e) {
        console.error('Error in DB connection');
        return 'Error in DB connection'
    }
};

module.exports = dbConnection;