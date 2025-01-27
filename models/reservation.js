const Sequelize = require('sequelize');
const sequelize = require('../utils/database'); 

const Reservation = sequelize.define('reservation', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    roomType: {
        type: Sequelize.STRING,
        allowNull: false
    },
    checkInDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    checkOutDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    totalPrice: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }
});

module.exports = Reservation;
