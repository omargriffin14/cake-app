const { getPool } = require('../config/db');
const { sendNotificationEmail } = require('../config/ses');
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const s3Client = new S3Client({ region: 'us-east-1' });

const nullify = (val) => (val === undefined || val === '' ? null : val);

const getPresignedUrl = async (imageUrl) => {
  if (!imageUrl) return null;
  const key = imageUrl.split('.amazonaws.com/')[1];
  const command = new GetObjectCommand({
    Bucket: process.env.S3_UPLOADS_BUCKET,
    Key: key
  });
  return await getSignedUrl(s3Client, command, { expiresIn: 604800 });
};

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
        nullify(customer_name),
        nullify(customer_email),
        nullify(customer_phone),
        nullify(cake_flavor),
        nullify(cake_flavor_other),
        nullify(shape),
        nullify(shape_other),
        nullify(height),
        nullify(height_other),
        nullify(size),
        nullify(size_other),
        nullify(border),
        nullify(border_other),
        nullify(custom_notes),
        image_url
      ]
    );

    const presignedUrl = await getPresignedUrl(image_url);

    const order = {
      id: result.insertId,
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
      custom_notes,
      image_url: presignedUrl
    };

    await sendNotificationEmail(order);

    res.status(201).json({
      message: 'Order placed successfully',
      orderId: result.insertId
    });

  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Failed to place order' });
  }
};

const getOrders = async (req, res) => {
  try {
    const pool = getPool();
    const [rows] = await pool.execute('SELECT * FROM orders ORDER BY order_date DESC');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

const getOrderById = async (req, res) => {
  try {
    const pool = getPool();
    const [rows] = await pool.execute('SELECT * FROM orders WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Failed to fetch order' });
  }
};

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
