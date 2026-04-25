const express = require('express');
const cors = require('cors');
const { initPool } = require('./config/db');
const orderRoutes = require('./routes/orders');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint — required by ALB
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

app.use('/api/orders', orderRoutes);

// Start server after DB pool is ready
const start = async () => {
  await initPool();
  app.listen(PORT, () => {
    console.log(`Nela's Bakery API running on port ${PORT}`);
  });
};

start();

// v1.1
