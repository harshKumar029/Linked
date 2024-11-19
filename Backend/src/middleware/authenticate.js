const jwt = require('jsonwebtoken');
const config = require('../config/config');

const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, config.JWT_CONFIG.secret, (error, decoded) => {
    if (error) {
      const sec = config.JWT_CONFIG.secret
      console.log(" token", token,error, sec)
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.userId = decoded.userId; // Attach the user's ID to the request
    next();
  });
};

module.exports = authenticate;
