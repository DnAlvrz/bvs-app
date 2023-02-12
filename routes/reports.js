const router = require('express').Router();
const {videoList}= require('../controllers/videoController');

router.get('/', videoList);

module.exports = router;