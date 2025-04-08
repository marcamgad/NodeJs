const User = require('../models/user');
const Destination = require('../models/destination');
const flash = require('connect-flash');

exports.addToWantToGo = async (req, res, next) => {
  const { destinationId, destinationType } = req.body;

  if (!destinationId || !destinationType) {
    req.flash('error', 'Destination ID and type are required.');
    return res.redirect('/wanttogo');
  }

  if (!['City', 'Hiking', 'Island'].includes(destinationType)) {
    req.flash('error', 'Invalid destination type.');
    return res.redirect('/wanttogo');
  }

  try {
    const user = await User.findById(req.session.user._id);
    if (!user) {
      req.flash('error', 'User not found');
      return res.redirect('/wanttogo');
    }

    const destination = await Destination.findById(destinationId);
    if (!destination) {
      req.flash('error', 'Destination not found');
      return res.redirect('/wanttogo');
    }

    const success = await user.addToList(destination);
    if (!success) {
      req.flash('error', 'Destination already in your list');
      return res.redirect('/wanttogo');
    }

    res.redirect('/wanttogo');
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.getWantToGo = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  
  User.findById(req.session.user._id)
    .populate('list.destinationId')
    .then(user => {
      if (!user) {
        req.flash('error', 'You must be logged in to view this page.');
        return res.redirect('/login');
      }
      res.render('wanttogo', {
        pageTitle: 'Your Want-to-Go List',
        path: '/wanttogo',
        list: user.list || [],
        errorMessage: message,
      });
    })
    .catch(err => {
      console.error(err);
      next(err);
    });
};
