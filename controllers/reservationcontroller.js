const Reservation = require('../models/reservation');
const { Op } = require('sequelize');
const axios = require('axios');

class ReservationController {
    constructor() {
        this.lastReservation = null;
    }

    async getIndex(req, res, next) {
        try {
            const allReservations = await Reservation.findAll();
            res.render('index', {
                pageTitle: 'Home',
                path: '/',
                reservations: allReservations,
                hasReservations: allReservations.length > 0
            });
        } catch (err) {
            console.error('Error fetching reservations:', err);
            res.status(500).send('Error loading the homepage.');
        }
    }

    getReservationForm(req, res, next) {
        res.render('reservationform', {
            pageTitle: 'Make a Reservation',
            path: '/reservation'
        });
    }

    async postReservation(req, res, next) {
        const { name, email, roomType, checkInDate, checkOutDate } = req.body;

        try {
            // Fetch room data from the API
            const room = await this.fetchRoomData(roomType);

            if (!room) {
                throw new Error("Room not found");
            }

            console.log("Room fetched from API:", room);

            // Calculate the total price
            const totalPrice = this.calculateTotalPrice(checkInDate, checkOutDate, room.price);

            // Create a new reservation
            await Reservation.create({
                name,
                email,
                roomType,
                checkInDate,
                checkOutDate,
                totalPrice
            });

            res.redirect('/confirmation');
        } catch (err) {
            console.error('Error during reservation:', err);
            res.status(500).send('Error saving reservation or fetching room data.');
        }
    }

    async getConfirmation(req, res, next) {
        const searchTerm = req.query.search || '';
        try {
            const latestReservation = await Reservation.findOne({
                order: [['id', 'DESC']],
            });

            const allReservations = await Reservation.findAll({
                where: searchTerm ? { name: { [Op.like]: `%${searchTerm}%` } } : {}
            });

            res.render('confirmation', {
                pageTitle: 'Reservation Confirmation',
                path: '/confirmation',
                reservation: latestReservation,
                allReservations: allReservations,
                searchTerm: searchTerm
            });
        } catch (err) {
            console.error('Error fetching reservations:', err);
            res.status(500).send('Error fetching reservations.');
        }
    }

    async fetchRoomData(roomType) {
        try {
            const roomResponse = await axios.get('http://localhost:3000/api/products');
            return roomResponse.data.products.find(product => product.id === parseInt(roomType));
        } catch (err) {
            console.error('Error fetching room data from API:', err);
            throw new Error('Failed to fetch room data.');
        }
    }

    calculateTotalPrice(checkInDate, checkOutDate, price) {
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const days = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
        return price * days;
    }
}

// Export the controller as an instance
module.exports = new ReservationController();
