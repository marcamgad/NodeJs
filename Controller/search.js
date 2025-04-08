const Destination = require('../models/destination'); // Adjust path as necessary

// GET - Render the Search Page
exports.getSearchPage = (req, res) => {
  res.render('searchResults', { results: [] }); // Pass empty results for the initial render
};

// POST - Handle Search Logic
exports.postSearch = async (req, res) => {
  const searchKey = req.body.Search.trim().toLowerCase(); // Extract and lowercase search key for case-insensitive search

  try {
    // Search for destinations whose names contain the search key
    const results = await Destination.find({
      name: { $regex: searchKey, $options: 'i' }, // Case-insensitive partial matching
    });

    if (results.length > 0) {
      // Render search results page with data if results found
      res.render('searchResults', { results });
    } else {
      // No results found, render the search results page with a "not found" message
      res.render('searchResults', { results: null, message: 'No destinations found matching your search.' });
    }
  } catch (error) {
    console.error('Error during search:', error);
    res.status(500).send('Server Error');
  }
};
