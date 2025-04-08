const Destination = require('../models/destination');

exports.getInca = (req,res,next) => {
  Destination.findOne({ name: 'Inca', type: 'Hiking' })
  .then(destination => {
    if (!destination) {
      return res.status(404).send('Destination not found');
    }

    res.render('inca', {
      pageTitle: 'Inca',
      path: '/inca',
      destination: destination, 
      csrfToken: req.csrfToken(), 
    });
  })
  .catch(err => {
    console.error(err);
    next(err);
  });
};

exports.getAnnapurna = (req,res,next) => {
  Destination.findOne({ name: 'Annapurna', type: 'Hiking' })
  .then(destination => {
    if (!destination) {
      return res.status(404).send('Destination not found');
    }

    res.render('annapurna', {
      pageTitle: 'Annapurna',
      path: '/annapurna',
      destination: destination, 
      csrfToken: req.csrfToken(), 
    });
  })
  .catch(err => {
    console.error(err);
    next(err);
  });
};

