const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connect = require("./src/db/mongosdb");
const urlRoutes = require("./src/routes/url_Routes");
const authRoutes = require("./src/routes/authRoutes");

const axios = require("axios"); // For making HTTP requests
const requestIp = require("request-ip"); // For getting user IP address
const DeviceDetector = require("device-detector-js"); // For parsing user-agent to get device info
const Url = require("./src/model/url_model");
const crypto = require("crypto");

const app = express();
// const port = 8000;

// CORS setup to allow requests from the frontend

const allowedOrigins = [
  "http://localhost:3000",
  "https://linked-po8h.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS Not Allowed"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// app.use(cors());
// app.options('*', cors());

// Parse incoming JSON requests
app.use(express.json());

// Middleware
app.use(bodyParser.json());

app.get("/:shortURL", async (req, res) => {
  const shortURL = req.params.shortURL;
  const deviceDetector = new DeviceDetector();

  try {
    const userAgent = req.headers["user-agent"] || "";
    const accept = req.headers["accept"] || "";
    const purpose = (req.headers["purpose"] || req.headers["x-purpose"] || "").toString();
    const secPurpose = (req.headers["sec-purpose"] || "").toString();

    // NOTE: Do NOT match plain "google" (it hits "Google Chrome" and blocks real users).
    const botRegex =
      /bot|crawl|spider|slurp|facebookexternalhit|mediapartners|adsbot|googlebot|apis-google|feedfetcher|duplexweb-google|bingpreview|yandex|baidu|duckduckbot|uptimerobot|pingdom/i;

    const isBot = botRegex.test(userAgent);
    const isPrefetch =
      req.method === "HEAD" ||
      /prefetch|prerender|preview/i.test(purpose) ||
      /prefetch|prerender|preview/i.test(secPurpose) ||
      /linkpreview|urlpreview/i.test(userAgent);
    const isImageProxy =
      /googleimageproxy|gmail/i.test(userAgent) && /image\//i.test(accept);

    // Get the client IP
    const clientIp =
      requestIp.getClientIp(req) ||
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket.remoteAddress;
    const ipv4Address = clientIp.includes("::ffff:")
      ? clientIp.split("::ffff:")[1]
      : clientIp;

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

    // For bots/prefetch/image proxies:
    // - allow redirect (so scanners don't break user experience)
    // - but don't count them as unique clicks; optionally log as non-unique
    const eventType = isBot ? "bot" : isImageProxy ? "image_proxy" : isPrefetch ? "prefetch" : "click";

    // Lightweight fingerprint for dedupe: same IP+UA within a short window
    const fingerprint = crypto
      .createHash("sha256")
      .update(`${shortURL}|${ipv4Address || ""}|${userAgent || ""}`)
      .digest("hex");

    // Consider a click unique only if we haven't seen this fingerprint recently.
    // (Gmail scanners often hit multiple times within seconds/minutes.)
    const dedupeWindowMs = 10 * 60 * 1000; // 10 minutes
    const lastSeen = (urlEntry.pastAnalytics || [])
      .slice()
      .reverse()
      .find((a) => a && a.fingerprint === fingerprint);
    const isUnique =
      eventType === "click" &&
      (!lastSeen || !lastSeen.timestamp || Date.now() - new Date(lastSeen.timestamp).getTime() > dedupeWindowMs);

    // Only do expensive enrichment for real clicks (not scanners/prefetch/image proxy)
    let geoLocationData = {};
    let deviceInfo = {};
    if (eventType === "click") {
      if (clientIp && clientIp !== "::1") {
        const geoResponse = await axios.get(`http://ip-api.com/json/${ipv4Address}`);
        geoLocationData = geoResponse.data;
      }
      deviceInfo = deviceDetector.parse(userAgent);
    }

    // Track analytics (store both raw events and unique flag)
    const updateAnalytics = {
      ip: ipv4Address,
      userAgent,
      accept,
      browser: deviceInfo.client?.name || "Unknown",
      os: deviceInfo.os?.name || "Unknown",
      device: deviceInfo.device?.type || "Unknown",
      deviceModel: deviceInfo.device?.model || "Unknown",
      deviceBrand: deviceInfo.device?.brand || "Unknown",
      latitude: geoLocationData.lat || "Unknown",
      longitude: geoLocationData.lon || "Unknown",
      city: geoLocationData.city || "Unknown",
      region: geoLocationData.region || "Unknown",
      country: geoLocationData.country || "Unknown",
      countryCode: geoLocationData.countryCode || "Unknown",
      timezone: geoLocationData.timezone || "Unknown",
      currency: geoLocationData.currency || "Unknown",
      asn: geoLocationData.as || "Unknown",
      organization: geoLocationData.org || "Unknown",
      referrer: req.get("Referer") || "Direct",
      eventType,
      isUnique,
      fingerprint,
    };

    await Url.updateOne(
      { "url.shortURL": shortURL },
      { $push: { "url.$.pastAnalytics": updateAnalytics } }
    );

    // Check for Country Targeting
    const countryTarget = urlEntry.countryTargets.find(
      (target) => target.country === geoLocationData.country
    );
    if (countryTarget) {
      return res.redirect(countryTarget.destination);
    }
    const deviceTarget = urlEntry.deviceTargets.find((target) => {
      console.log(
        "Comparing:",
        target.device.toLowerCase(),
        "with",
        deviceInfo.os?.name?.toLowerCase()
      );
      return target.device.toLowerCase() === deviceInfo.os?.name?.toLowerCase();
    });
    console.log("out of target");
    if (deviceTarget) {
      console.log("insinde deviceTarget if block");
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

// Routes
app.use("/api/auth", authRoutes);  
app.use("/api/url", urlRoutes);

// Start server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
//   connect();  // Connect to MongoDB
// });

connect()
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

module.exports = app;
