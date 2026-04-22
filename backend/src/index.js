require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('express-async-errors');

const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');
const userRoutes = require('./routes/user');
const borrowRoutes = require('./routes/borrow');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 5005;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/user', userRoutes);
app.use('/api/borrow', borrowRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

const server = app.listen(PORT, () => {
  console.log(`Library-Lite backend is running on port ${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n❌ Error: Port ${PORT} is already in use.`);
    console.error(`Attempting to kill the existing process on port ${PORT}...`);
    // This is handled by the predev script, but we exit here just in case.
    process.exit(1);
  } else {
    throw err;
  }
});
