const mongoose = require('mongoose');


// const pastAnalyticsSchema = new mongoose.Schema({
//   ip: String,            // IP address of the user who clicked the link
//   browser: String,       // Browser used by the user (from ua-parser-js)
//   os: String,            // Operating System (from ua-parser-js)
//   device: String,        // Device type (from ua-parser-js)
//   timestamp: {
//     type: Date,
//     default: Date.now,  
//   },
// });
const pastAnalyticsSchema = new mongoose.Schema({
  ip: String,                   // IP address
  browser: String,              // Browser used by the user
  os: String,                   // Operating System
  device: String,               // Device type (desktop, mobile, etc.)
  deviceModel: String,          // Model of the device
  deviceBrand: String,          // Brand of the device
  latitude: String,             // Latitude from geolocation
  longitude: String,            // Longitude from geolocation
  city: String,                 // City from geolocation
  region: String,               // Region/state from geolocation
  country: String,              // Country name
  countryCode: String,          // ISO country code
  timezone: String,             // Timezone
  currency: String,             // Currency of the user's location
  asn: String,                  // ASN (Autonomous System Number)
  organization: String,         // Organization or ISP name
  referrer: String,             // Referrer header
  timestamp: {
    type: Date,
    default: Date.now,          // Automatically log the timestamp
  },
});

// Targeting Schema
const countryTargetSchema = new mongoose.Schema({
  country: {
    type: String,
  },
  destination: {
    type: String,
  },
});

const deviceTargetSchema = new mongoose.Schema({
  device: {
    type: String,
  },
  destination: {
    type: String,
  },
});

// URL Schema
const urlSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    url: [
      {
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
        countryTargets: [countryTargetSchema], // Array of country-specific targets
        deviceTargets: [deviceTargetSchema],   // Array of device-specific targets
        pastAnalytics: [pastAnalyticsSchema],  // Stores click data
        createdAt: {
          type: Date,
          default: Date.now, // Automatically sets to the current date
        },
        updatedAt: {
          type: Date,
          default: Date.now, // Updates manually when the document is saved
        },
      },
    ],
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt to the main schema
);

const Url = mongoose.model('Url', urlSchema);
module.exports = Url;
