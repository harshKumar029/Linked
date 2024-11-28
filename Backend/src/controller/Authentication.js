const User = require('../model/user_model');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const { success, error } = require('./responseHelper');
const config = require('../config/config');

// OAuth client for Google Authentication
const googleClient = new OAuth2Client(config.GOOGLE_CONFIG.clientId);

// Helper function to create JWT
const createToken = (user) => {
  return jwt.sign(
    { userId: user._id }, // Payload
    config.JWT_CONFIG.secret, // Secret key
    { expiresIn: config.JWT_CONFIG.expiresIn } // Token expiration
  );
};

// User Signup
exports.signup = async (req, res) => {
  const { email, password, username } = req.body;
  console.log(email, password, username, req.body);

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use.' });
    }

    // Create new user
    const newUser = new User({ email, password, username });
    await newUser.save();

    // Generate token
    const token = createToken(newUser);
    console.log("Generated token:", token);
    const userObject = newUser.toObject();
    delete userObject.password;
    res.status(201).json({ user: { token: token, ...userObject } });


  } catch (error) {
    res.status(500).json({ message: 'Error signing up', error });
  }
};

// User Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return error(res, 'User not found.', null, 404);
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return error(res, 'Invalid credentials.', null, 401);
    }

    // Generate token
    const token = createToken(user);
    return success(res, 'Login successful.', { token, user }, 200);
  } catch (error) {
    return error(res, 'Error logging in', error, 500);
  }
};


// Google Login
exports.googleLogin = async (req, res) => {
  const { tokenId } = req.body;

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: tokenId,
      audience: config.google.clientId,
    });
    const { email, name, picture, sub: googleId } = ticket.getPayload();

    // Find or create user
    let user = await User.findOne({ googleId });
    if (!user) {
      user = new User({
        email,
        googleId,
        username: name,
        profilePicture: picture,
        isVerified: true,
      });
      await user.save();
    }

    // Generate token
    const token = createToken(user);
    return success(res, 'Google login successful.', { token, user }, 200);
  } catch (error) {
    return error(res, 'Google login error', error, 500);
  }
};


// Verify Token Middleware
exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return error(res, 'No token provided', null, 403);
  }

  jwt.verify(token, config.JWT_CONFIG.secret, (error, decoded) => {
    if (error) {
      return error(res, 'Unauthorized access', null, 401);
    }
    req.userId = decoded.userId;
    next();
  });
};

