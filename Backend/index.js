const express = require('express');
const cors = require('cors');
const connect = require('./src/db/mongosdb');
const authRoutes = require('./src/routes/authRoutes');

const app = express();
const port = 8000;

// CORS setup to allow requests from the frontend
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, 
}));

// Parse incoming JSON requests
app.use(express.json());


// Authentication routes
app.use('/api/auth', authRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connect();  // Connect to MongoDB
});
