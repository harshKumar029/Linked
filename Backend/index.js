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


app.get("/:shortURL", async (req, res) => {
  const shortURL = req.params.shortURL;
  const deviceDetector = new DeviceDetector();

  try {
    // Get the client IP
    const clientIp = requestIp.getClientIp(req) ||
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket.remoteAddress;
    const ipv4Address = clientIp.includes("::ffff:") ? clientIp.split("::ffff:")[1] : clientIp;

    console.log(`Request received for: ${shortURL}, from IP: ${ipv4Address}`);

    // Function to check if an IP is private/local
    const isPrivateIP = (ip) => {
      return (
        ip.startsWith("192.168.") || // Private IP range
        ip.startsWith("10.") || // Private IP range
        (ip.startsWith("172.") && parseInt(ip.split(".")[1]) >= 16 && parseInt(ip.split(".")[1]) <= 31) || // Private IP range
        ip === "127.0.0.1" || // Localhost
        ip === "::1" // IPv6 localhost
      );
    };

    // Skip analytics tracking for private/local IPs
    if (isPrivateIP(ipv4Address)) {
      console.log("Skipping tracking for internal/bot request.");
      return res.status(200).send("Internal click skipped.");
    }

    // Detect User-Agent to filter email bots
    const userAgent = useragent.parse(req.headers["user-agent"]);
    console.log(`User-Agent: ${JSON.stringify(userAgent)}`);

    if (userAgent.family.includes("Google") || userAgent.family.includes("bot") || userAgent.family.includes("crawler")) {
      console.log("Skipping tracking for email scanner bot.");
      return res.status(200).send("Bot click skipped.");
    }

    // Fetch Geolocation Data
    let geoLocationData = {};
    try {
      const geoResponse = await axios.get(`https://ipapi.co/${ipv4Address}/json/`);
      geoLocationData = geoResponse.data;
    } catch (geoError) {
      console.error("Geo API Error:", geoError.message);
    }

    // Fetch URL document based on the shortURL
    const urlDoc = await Url.findOne({ "url.shortURL": shortURL });
    if (!urlDoc) {
      return res.status(404).json({ message: "URL not found" });
    }

    // Find the specific URL entry
    const urlEntry = urlDoc.url.find((u) => u.shortURL === shortURL);
    if (!urlEntry) {
      return res.status(404).json({ message: "URL entry not found" });
    }

    // Prevent duplicate tracking (avoid multiple logs for same IP clicking within 60 seconds)
    const lastClick = urlEntry.pastAnalytics[urlEntry.pastAnalytics.length - 1];
    if (lastClick && lastClick.ip === ipv4Address && Date.now() - lastClick.timestamp < 60000) {
      console.log("Duplicate click detected, skipping tracking.");
    } else {
      // Track analytics
      const updateAnalytics = {
        timestamp: Date.now(),
        ip: ipv4Address,
        browser: userAgent.family || "Unknown",
        os: userAgent.os.family || "Unknown",
        device: userAgent.device.family || "Unknown",
        location: geoLocationData,
        referrer: req.get("Referer") || "Direct",
      };

      await Url.updateOne(
        { "url.shortURL": shortURL },
        { $push: { "url.$.pastAnalytics": updateAnalytics } }
      );
    }

    // Check for Country Targeting
    const countryTarget = urlEntry.countryTargets.find(
      (target) => target.country === geoLocationData.country
    );
    if (countryTarget) {
      return res.redirect(countryTarget.destination);
    }

    // Check for Device Targeting
    const deviceTarget = urlEntry.deviceTargets.find(
      (target) => target.device.toLowerCase() === userAgent.os.family.toLowerCase()
    );
    if (deviceTarget) {
      return res.redirect(deviceTarget.destination);
    }

    // Default Redirection if no matching country or device
    if (!urlEntry.originalURL) {
      return res.status(404).json({ message: "Original URL not found" });
    }
    return res.redirect(urlEntry.originalURL);

  } catch (error) {
    console.error("Error processing request:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

// app.get('/:shortURL', async (req, res) => {
//   const shortURL = req.params.shortURL;
//   const deviceDetector = new DeviceDetector();

//   try {
//     // Get the client IP
//     const clientIp = requestIp.getClientIp(req) ||
//       req.headers['x-forwarded-for']?.split(',')[0] ||
//       req.socket.remoteAddress;
//     const ipv4Address = clientIp.includes('::ffff:') ? clientIp.split('::ffff:')[1] : clientIp;

//     // Fetch Geolocation Data
//     let geoLocationData = {};
//     if (clientIp && clientIp !== '::1') {
//       const geoResponse = await axios.get(`http://ip-api.com/json/${ipv4Address}`);
//       geoLocationData = geoResponse.data;
//     }

//     // Detect Device Information
//     const userAgent = req.headers['user-agent'];
//     const deviceInfo = deviceDetector.parse(userAgent);

//     // Fetch URL document based on the shortURL
//     const urlDoc = await Url.findOne({ 'url.shortURL': shortURL });
//     if (!urlDoc) {
//       return res.status(404).json({ message: 'URL not found' });
//     }

//     // Find the specific URL entry
//     const urlEntry = urlDoc.url.find((u) => u.shortURL === shortURL);
//     if (!urlEntry) {
//       return res.status(404).json({ message: 'URL entry not found' });
//     }

//     // Track analytics
//     const updateAnalytics = {
//       ip: ipv4Address,
//       browser: deviceInfo.client?.name || 'Unknown',
//       os: deviceInfo.os?.name || 'Unknown',
//       device: deviceInfo.device?.type || 'Unknown',
//       deviceModel: deviceInfo.device?.model || 'Unknown',
//       deviceBrand: deviceInfo.device?.brand || 'Unknown',
//       latitude: geoLocationData.lat || 'Unknown',
//       longitude: geoLocationData.lon || 'Unknown',
//       city: geoLocationData.city || 'Unknown',
//       region: geoLocationData.region || 'Unknown',
//       country: geoLocationData.country || 'Unknown',
//       countryCode: geoLocationData.countryCode || 'Unknown',
//       timezone: geoLocationData.timezone || 'Unknown',
//       currency: geoLocationData.currency || 'Unknown',
//       asn: geoLocationData.as || 'Unknown',
//       organization: geoLocationData.org || 'Unknown',
//       referrer: req.get('Referer') || 'Direct',
//     };

//     await Url.updateOne(
//       { 'url.shortURL': shortURL },
//       { $push: { 'url.$.pastAnalytics': updateAnalytics } }
//     );

//     // Check for Country Targeting
//     const countryTarget = urlEntry.countryTargets.find(
//       (target) => target.country === geoLocationData.country
//     );
//     if (countryTarget) {
//       return res.redirect(countryTarget.destination);
//     }
//     const deviceTarget = urlEntry.deviceTargets.find(
//       (target) => {
//         console.log("Comparing:", target.device.toLowerCase(), "with", deviceInfo.os?.name?.toLowerCase());
//         return target.device.toLowerCase() === deviceInfo.os?.name?.toLowerCase();
//       }
//     );
//     console.log("out of target")
//     if (deviceTarget) {
//       console.log("insinde deviceTarget if block")
//       return res.redirect(deviceTarget.destination);
//     }

//     // Default Redirection if no matching country or device
//     if (!urlEntry.originalURL) {
//       return res.status(404).json({ message: 'Original URL not found' });
//     }
//     return res.redirect(urlEntry.originalURL);

//   } catch (error) {
//     console.error('Error processing request:', error.message);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });



// Routes
app.use('/api/auth', authRoutes);
app.use('/api/url', urlRoutes);

// Start server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
//   connect();  // Connect to MongoDB
// });


connect()
  .then(() => console.log("MongoDB connected successfully!"))
  .catch(err => console.error("MongoDB connection error:", err));

  module.exports = app;
