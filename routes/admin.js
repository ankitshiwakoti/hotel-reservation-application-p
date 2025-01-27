const express = require('express');
const router = express.Router();

const reservationController = require('../controllers/reservationcontroller');


router.get('/confirmation', reservationController.getConfirmation);

module.exports = router;
