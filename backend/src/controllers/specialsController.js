const { getPool } = require('../config/db');
const { sendSpecialOrderNotification } = require('../config/ses');

const nullify = (val) => (val === undefined || val === '' ? null : val);

const PRICES = {
  'Mini set (3)': 12.00,
  'Gift box (6)': 20.00,
  'Party pack (12)': 35.00
};

const createSpecialOrder = async (req, res) => {
  try {
    const {
      customer_name,
      customer_email,
      customer_phone,
      flavor,
      quantity,
      special_instructions
    } = req.body;

    const quantity_price = PRICES[quantity] || 0;

    const pool = getPool();
    const [result] = await pool.execute(
      `INSERT INTO specials_orders (
        customer_name, customer_email, customer_phone,
        special_name, flavor, quantity, quantity_price,
        special_instructions
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nullify(customer_name),
        nullify(customer_email),
        nullify(customer_phone),
        "Mother's Day Minis",
        nullify(flavor),
        nullify(quantity),
        quantity_price,
        nullify(special_instructions)
      ]
    );

    const order = {
      id: result.insertId,
      customer_name,
      customer_email,
      customer_phone,
      flavor,
      quantity,
      quantity_price,
      special_instructions
    };

    await sendSpecialOrderNotification(order);

    res.status(201).json({
      message: 'Special order placed successfully',
      orderId: result.insertId
    });

  } catch (error) {
    console.error('Error creating special order:', error);
    res.status(500).json({ message: 'Failed to place special order' });
  }
};

const getSpecialOrders = async (req, res) => {
  try {
    const pool = getPool();
    const [rows] = await pool.execute(
      'SELECT * FROM specials_orders ORDER BY order_date DESC'
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching special orders:', error);
    res.status(500).json({ message: 'Failed to fetch special orders' });
  }
};

module.exports = { createSpecialOrder, getSpecialOrders };
