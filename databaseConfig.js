const mongoose = require('mongoose');

const DB_URI = 'mongodb://localhost:27017/luggageDB'; // Örnek bir MongoDB URI'si

function initializeDatabase() {
    mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Connected to the database');
        })
        .catch((error) => {
            console.error('Database connection error:', error);
        });

    // Veritabanı bağlantısını kapatma işlemleri için bir işleyici
    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('Database connection closed due to app termination');
            process.exit(0);
        });
    });
}

module.exports = initializeDatabase;
