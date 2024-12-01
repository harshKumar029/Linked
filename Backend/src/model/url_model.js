const mongoose = require('mongoose');

// Past Analytics Schema (data logged when user hits the link)
const pastAnalyticsSchema = new mongoose.Schema({
  ip: String,            // IP address of the user who clicked the link
  browser: String,       // Browser used by the user (from ua-parser-js)
  os: String,            // Operating System (from ua-parser-js)
  device: String,        // Device type (from ua-parser-js)
  timestamp: {
    type: Date,
    default: Date.now,   // Timestamp of the click
  },
});

// URL Schema
const urlSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',          // Reference to the User model
    required: true,
  },
  url: [{
      URLname: {
        type: String,
        required: true,
      },
    originalURL: {
      type: String,
      required: true,
    },
    shortURL: {
      type: String,
      required: true,
    },
    pastAnalytics: [pastAnalyticsSchema],  // Stores click data
  }],
});

const Url = mongoose.model('Url', urlSchema);
module.exports = Url;
