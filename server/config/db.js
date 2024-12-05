const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    database: 'role_based_auth',
});

db.connect((err) => {
    if (err) {
        console.log('Error connecting to DB:', err);
    } else {
        console.log('Database connected');
    }
});

module.exports = db;
