const { getPool } = require('../config/db');
const { sendConfirmationEmail } = require('../config/ses');

// POST /api/orders
const createOrder = async (req, res) => {
  try {
    const {
      customer_name,
      customer_email,
      customer_phone,
      cake_flavor,
      cake_flavor_other,
      shape,
      shape_other,
      height,
      height_other,
      size,
      size_other,
      border,
      border_other,
      custom_notes
    } = req.body;

    const image_url = req.file ? req.file.location : null;

    const pool = getPool();
    const [result] = await pool.execute(
      `INSERT INTO orders (
        customer_name, customer_email, customer_phone,
        cake_flavor, cake_flavor_other,
        shape, shape_other,
        height, height_other,
        size, size_other,
        border, border_other,
        custom_notes, image_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        customer_name, customer_email, customer_phone,
        cake_flavor, cake_flavor_other || null,
        shape, shape_other || null,
        height, height_other || null,
        size, size_other || null,
        border, border_other || null,
        custom_notes || null, image_url
      ]
    );

    const order = {
      id: result.insertId,
      customer_name,
      customer_email,
      cake_flavor,
      cake_flavor_other,
      shape,
      shape_other,
      height,
      height_other,
      size,
      size_other,
      border,
      border_other,
      custom_notes
    };

    await sendConfirmationEmail(order);

    res.status(201).json({
      message: 'Order placed successfully',
      orderId: result.insertId
    });

  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Failed to place order' });
  }
};

// GET /api/orders
const getOrders = async (req, res) => {
  try {
    const pool = getPool();
    const [rows] = await pool.execute(
      'SELECT * FROM orders ORDER BY order_date DESC'
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

// GET /api/orders/:id
const getOrderById = async (req, res) => {
  try {
    const pool = getPool();
    const [rows] = await pool.execute(
      'SELECT * FROM orders WHERE id = ?',
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Failed to fetch order' });
  }
};

// PATCH /api/orders/:id
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const pool = getPool();
    const [result] = await pool.execute(
      'UPDATE orders SET status = ? WHERE id = ?',
      [status, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order status updated' });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ message: 'Failed to update order' });
  }
};

module.exports = { createOrder, getOrders, getOrderById, updateOrderStatus };
