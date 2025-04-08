const Destination = require('../models/destination');

exports.getSantorini = (req,res,next) => {
  Destination.findOne({ name: 'Santorini', type: 'Island' })
  .then(destination => {
    if (!destination) {
      return res.status(404).send('Destination not found');
    }

    res.render('bali', {
      pageTitle: 'Bali',
      path: '/bali',
      destination: destination, 
      csrfToken: req.csrfToken(), 
    });
  })
  .catch(err => {
    console.error(err);
    next(err);
  });
};
exports.getBali = (req,res,next) => {
  Destination.findOne({ name: 'Bali', type: 'Island' })
  .then(destination => {
    if (!destination) {
      return res.status(404).send('Destination not found');
    }

    res.render('bali', {
      pageTitle: 'Bali',
      path: '/bali',
      destination: destination, 
      csrfToken: req.csrfToken(), 
    });
  })
  .catch(err => {
    console.error(err);
    next(err);
  });
};
