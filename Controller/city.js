const Destination = require('../models/destination');

exports.getRome = (req, res, next) => {
  // Fetch the destination from the database
  Destination.findOne({ name: 'Rome', type: 'City' })
    .then(destination => {
      if (!destination) {
        return res.status(404).send('Destination not found');
      }

      res.render('rome', {
        pageTitle: 'Rome',
        path: '/rome',
        destination: destination,  // Pass the fetched destination
        csrfToken: req.csrfToken(), 
      });
    })
    .catch(err => {
      console.error(err);
      next(err);
    });
};

exports.getParis = (req, res, next) => {
  // Fetch the destination from the database
  Destination.findOne({ name: 'Paris', type: 'City' })
    .then(destination => {
      if (!destination) {
        return res.status(404).send('Destination not found');
      }

      res.render('paris', {
        pageTitle: 'Paris',
        path: '/paris',
        destination: destination, 
        csrfToken: req.csrfToken(), 
      });
    })
    .catch(err => {
      console.error(err);
      next(err);
    });
};
