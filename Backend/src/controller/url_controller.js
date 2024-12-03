const Url = require('../model/url_model');
const shortid = require('shortid');

// exports.createUrl = async (req, res) => {
//   const { userId } = req; 
//   const { originalURL, URLname } = req.body; 

//   console.log("id in url_cont", userId, originalURL, URLname); 

//   if (!originalURL || !URLname) {
//     return res.status(400).json({ message: 'Original URL and URL name are required' });
//   }

//   try {
//     const shortURL = shortid.generate();
//     console.log("shortURL", shortURL);

//     // Check if a record exists for the user, if not, create one
//     let urlDoc = await Url.findOne({ userId });
//     if (!urlDoc) {
//       urlDoc = new Url({ userId, url: [] });
//     }

//     // Add the new URL to the user's URL list
//     urlDoc.url.push({ originalURL, shortURL, URLname }); 
//     await urlDoc.save();

//     res.status(201).json({ message: 'URL created successfully', shortURL });
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating URL', error });
//   }
// };

exports.createUrl = async (req, res) => {
  const { userId } = req; 
  const { originalURL, URLname, countryTargets, deviceTargets } = req.body;

  console.log("id in url_cont", userId, originalURL, URLname, countryTargets, deviceTargets);

  if (!originalURL || !URLname) {
    return res.status(400).json({ message: 'Original URL and URL name are required' });
  }

  try {
    const shortURL = shortid.generate();
    console.log("shortURL", shortURL);

    // Check if a record exists for the user, if not, create one
    let urlDoc = await Url.findOne({ userId });
    if (!urlDoc) {
      urlDoc = new Url({ userId, url: [] });
    }
    console.log("url doc 1",urlDoc)

    // Add the new URL to the user's URL list
    urlDoc.url.push({
      originalURL,
      shortURL,
      URLname,
      countryTargets: countryTargets || [], // Add country-specific targets
      deviceTargets: deviceTargets || [],   // Add device-specific targets
    });
    await urlDoc.save();
    console.log("url doc 211",urlDoc)
    res.status(200).json({status: "success",  message: 'URL created successfully', shortURL, urlDoc });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating URL', error });
  }
};



// Delete a short URL for the logged-in user
exports.deleteUrl = async (req, res) => {
  const { userId } = req; // Extracted from authentication middleware
  const { shortURL } = req.params;

  try {
    const urlDoc = await Url.findOne({ userId });
    if (!urlDoc) {
      return res.status(404).json({ message: 'No URL data found for this user' });
    }

    // Find the URL by shortURL
    const urlIndex = urlDoc.url.findIndex((url) => url.shortURL === shortURL);
    if (urlIndex === -1) {
      return res.status(404).json({ message: 'URL not found' });
    }

    // Remove the URL from the list
    urlDoc.url.splice(urlIndex, 1);
    await urlDoc.save();

    res.status(200).json({ message: 'URL deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting URL', error });
  }
};

// Edit the original URL for the logged-in user
exports.editUrl = async (req, res) => {
  const { userId } = req;
  const { shortURL } = req.params;
  const { newOriginalURL } = req.body;

  if (!newOriginalURL) {
    return res.status(400).json({ message: 'New original URL is required' });
  }

  try {
    const urlDoc = await Url.findOne({ userId });
    if (!urlDoc) {
      return res.status(404).json({ message: 'No URL data found for this user' });
    }

    // Find the URL by shortURL
    const url = urlDoc.url.find((url) => url.shortURL === shortURL);
    if (!url) {
      return res.status(404).json({ message: 'URL not found' });
    }

    // Update the original URL
    url.originalURL = newOriginalURL;
    await urlDoc.save();

    res.status(200).json({ message: 'URL updated successfully', updatedURL: url });
  } catch (error) {
    res.status(500).json({ message: 'Error updating URL', error });
  }
};
