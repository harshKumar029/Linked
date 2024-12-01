require('dotenv').config();

// Constants for configuration
const JWT_CONFIG = {
  secret: process.env.JWT_SECRET || 'default_secret', // Fallback for JWT_SECRET
  expiresIn: process.env.JWT_EXPIRES_IN || '1h', // Configurable token expiry
};

const GOOGLE_CONFIG = {
  clientId: process.env.GOOGLE_CLIENT_ID || 'default_google_client_id', // Fallback for Google Client ID
};

const DATABASE_CONFIG = {
  url: process.env.MONGODB_URL
};

const APP_CONFIG = {
  port: process.env.PORT || 8000, // Fallback for server port
  host: process.env.HOST || 'localhost', // Fallback for host
};

// Exporting all configurations as named exports
module.exports = {
  JWT_CONFIG,
  GOOGLE_CONFIG,
  DATABASE_CONFIG,
//   APP_CONFIG,
};
