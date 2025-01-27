// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'shopdb',
//     password: 'root'
// });

// module.exports = pool.promise();


const Sequelize = require('sequelize');

const db={
    host: 'localhost',
    user: 'root',
    database: 'hotel',
    password: 'root',
    dialect: 'mysql'
    
};

const sequelize = new Sequelize(db.database, db.user, db.password, {
    host: db.host,
    dialect: db.dialect
});

module.exports = sequelize;

