var express = require('express');
var router = express.Router();
const Video = require('../models/Video');
const Customer = require('../models/Customer');
const Rentals = require('../models/Rental')


router.get('/', async (req, res, next) => {
  const videoCount = await Video.count();
  const customerCount = await Customer.count();
  const rentalCount = await Rentals.find({status:'Out'}).count();
  res.render('index', { 
    title: 'Bogsy Video Store', 
    path:'home',
    videoCount,
    customerCount,
    rentalCount,
  });
});

module.exports = router;
