const User = require('../model/user_model');
const jwt = require('jsonwebtoken');
const Url = require('../model/url_model');
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


exports.updatename = async (req, res) => {
  const { userId } = req;
  const { username } = req.body;
  
  try {
    let UserDoc = await User.findOne({ _id: userId });
    console.log("thsi is UserDoc updatename",UserDoc)
    if (!UserDoc) {
      return error(res, 'Error: user name does not exist');
    }

    UserDoc.username = username;
    await UserDoc.save();
    return success(res, 'User name updated successfully', UserDoc, 200);

  }catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

exports.updatepassword = async (req, res) => {
  const { userId } = req;
  const { currentpassword, password } = req.body;

  if (!password || !currentpassword) {
    return res.status(400).json({ message: 'Password and current password are required' });
  }
  
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await user.comparePassword(currentpassword);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    user.password = password;
    await user.save();

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};



exports.userdetail = async (req, res) => {
  const { userId } = req;
  
  try {
    let UserDoc = await User.findOne({ _id: userId });
    if (!UserDoc) {
      return error(res, 'Error: user name does not exist');
    }
    return success(res, 'User Details', UserDoc, 200);

  }catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
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

