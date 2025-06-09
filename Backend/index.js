const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connect = require('./src/db/mongosdb');
const urlRoutes = require('./src/routes/url_Routes');
const authRoutes = require('./src/routes/authRoutes');

const axios = require('axios'); // For making HTTP requests
const requestIp = require('request-ip'); // For getting user IP address
const DeviceDetector = require('device-detector-js'); // For parsing user-agent to get device info
const Url = require('./src/model/url_model'); 


const app = express();
const port = 8000;

// CORS setup to allow requests from the frontend
// https://linked-88aq.onrender.com/
// app.use(cors({
//   // origin: 'https://linked-88aq.onrender.com/',
//   origin: 'http://localhost:3000',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true, 
// }));
const allowedOrigins = [
  "http://localhost:3000", 
  "https://linked-po8h.vercel.app"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS Not Allowed"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


// Parse incoming JSON requests
app.use(express.json());

// Middleware
app.use(bodyParser.json());



app.get('/:shortURL', async (req, res) => {
  const shortURL = req.params.shortURL;
  const deviceDetector = new DeviceDetector();

  try {
    // Get the client IP
    const clientIp = requestIp.getClientIp(req) ||
      req.headers['x-forwarded-for']?.split(',')[0] ||
      req.socket.remoteAddress;
    const ipv4Address = clientIp.includes('::ffff:') ? clientIp.split('::ffff:')[1] : clientIp;

    // Fetch Geolocation Data
    let geoLocationData = {};
    if (clientIp && clientIp !== '::1') {
      const geoResponse = await axios.get(`http://ip-api.com/json/${ipv4Address}`);
      geoLocationData = geoResponse.data;
    }

    // Detect Device Information
    const userAgent = req.headers['user-agent'];
    const deviceInfo = deviceDetector.parse(userAgent);

    // Fetch URL document based on the shortURL
    const urlDoc = await Url.findOne({ 'url.shortURL': shortURL });
    if (!urlDoc) {
      return res.status(404).json({ message: 'URL not found' });
    }

    // Find the specific URL entry
    const urlEntry = urlDoc.url.find((u) => u.shortURL === shortURL);
    if (!urlEntry) {
      return res.status(404).json({ message: 'URL entry not found' });
    }

    // Track analytics
    const updateAnalytics = {
      ip: ipv4Address,
      browser: deviceInfo.client?.name || 'Unknown',
      os: deviceInfo.os?.name || 'Unknown',
      device: deviceInfo.device?.type || 'Unknown',
      deviceModel: deviceInfo.device?.model || 'Unknown',
      deviceBrand: deviceInfo.device?.brand || 'Unknown',
      latitude: geoLocationData.lat || 'Unknown',
      longitude: geoLocationData.lon || 'Unknown',
      city: geoLocationData.city || 'Unknown',
      region: geoLocationData.region || 'Unknown',
      country: geoLocationData.country || 'Unknown',
      countryCode: geoLocationData.countryCode || 'Unknown',
      timezone: geoLocationData.timezone || 'Unknown',
      currency: geoLocationData.currency || 'Unknown',
      asn: geoLocationData.as || 'Unknown',
      organization: geoLocationData.org || 'Unknown',
      referrer: req.get('Referer') || 'Direct',
    };

    await Url.updateOne(
      { 'url.shortURL': shortURL },
      { $push: { 'url.$.pastAnalytics': updateAnalytics } }
    );

    // Check for Country Targeting
    const countryTarget = urlEntry.countryTargets.find(
      (target) => target.country === geoLocationData.country
    );
    if (countryTarget) {
      return res.redirect(countryTarget.destination);
    }
    const deviceTarget = urlEntry.deviceTargets.find(
      (target) => {
        console.log("Comparing:", target.device.toLowerCase(), "with", deviceInfo.os?.name?.toLowerCase());
        return target.device.toLowerCase() === deviceInfo.os?.name?.toLowerCase();
      }
    );
    console.log("out of target")
    if (deviceTarget) {
      console.log("insinde deviceTarget if block")
      return res.redirect(deviceTarget.destination);
    }

    // Default Redirection if no matching country or device
    if (!urlEntry.originalURL) {
      return res.status(404).json({ message: 'Original URL not found' });
    }
    return res.redirect(urlEntry.originalURL);

  } catch (error) {
    console.error('Error processing request:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// Routes
app.use('/api/auth', authRoutes);
app.use('/api/url', urlRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connect();  // Connect to MongoDB
});


// connect()
//   .then(() => console.log("MongoDB connected successfully!"))
//   .catch(err => console.error("MongoDB connection error:", err));

  module.exports = app;
