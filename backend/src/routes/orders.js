const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus
} = require('../controllers/orderController');

router.post('/',        upload.single('image'), createOrder);
router.get('/',        getOrders);
router.get('/:id',     getOrderById);
router.patch('/:id',   updateOrderStatus);

module.exports = router;
