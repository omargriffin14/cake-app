const express = require('express');
const router = express.Router();
const { createSpecialOrder, getSpecialOrders } = require('../controllers/specialsController');

router.post('/orders', createSpecialOrder);
router.get('/orders', getSpecialOrders);

module.exports = router;
