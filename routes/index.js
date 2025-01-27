const express = require('express');
const router = express.Router();

const reservationController = require('../controllers/reservationcontroller');


router.get('/', reservationController.getIndex.bind(reservationController));
router.get('/reservation', reservationController.getReservationForm.bind(reservationController));
router.post('/reservation', reservationController.postReservation.bind(reservationController));
router.get('/confirmation', reservationController.getConfirmation.bind(reservationController));


module.exports = router;
