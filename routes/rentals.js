const router = require('express').Router();
const {rentalList, updateRental, newRental}= require('../controllers/rentalController');

router.get('/', rentalList);
router.post('/', newRental);
router.put('/', updateRental);

module.exports = router;