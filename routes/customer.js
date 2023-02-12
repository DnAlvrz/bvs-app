const router = require('express').Router();
const {customerList,newCustomer, updateCustomer, deleteCustomer, viewCustomer}= require('../controllers/customerController');

router.get('/', customerList);
router.post('/', newCustomer);
router.put('/', updateCustomer);

module.exports = router;