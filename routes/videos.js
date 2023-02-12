const router = require('express').Router();
const {videoList, newVideo, updateVideo, deleteVideo}= require('../controllers/videoController');

router.get('/', videoList);
router.post('/', newVideo);
router.put('/', updateVideo);
router.delete('/', deleteVideo);

module.exports = router;