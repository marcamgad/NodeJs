exports.getHome = (req,res,next) => {
  res.render('home', {
    pageTitle: 'Home',
    path: '/'
  });
};

exports.getHiking = (req,res,next) => {
  res.render('hiking',{
    pageTitle: 'Hiking',
    path:'/hiking'
  });
};

exports.getIsland = (req,res,next) => {
  res.render('islands',{
    pageTitle: 'Islands',
    path:'/islands'
  });
};

exports.getCities = (req,res,next) => {
  res.render('cities',{
    pageTitle: 'Cities',
    path:'/cities'
  });
};

exports.getWantToGo = (req, res, next) => {
  User.findById(req.session.user._id)
    .populate('list.destinationId') 
    .then(user => {
      if (!user) {
        return res.redirect('/login'); 
      }

      res.render('wanttogo', {
        pageTitle: 'Your Want-to-Go List',
        path: '/wanttogo',
        list: user.list || [],  
      });
    })
    .catch(err => {
      console.error(err);
      next(err);
    });
};

