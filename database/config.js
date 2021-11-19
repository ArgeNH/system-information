const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB || 'mongodb+srv://Arge:naruto32@cluster0.qiivs.mongodb.net/asobreva', {
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