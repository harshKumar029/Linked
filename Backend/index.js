const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connect = require('./src/db/mongosdb');
const urlRoutes = require('./src/routes/url_Routes');
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

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/url', urlRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connect();  // Connect to MongoDB
});
