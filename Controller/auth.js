const User = require('../models/user');
const bcrypt = require('bcryptjs');
const flash = require('connect-flash');

exports.getLogin = (req,res,next)=>{
  let message = req.flash('error');
  if(message.length > 0){
    message = message[0];
  }
  else{
    message = null;
  }
  res.render('auth/login',{
    path: '/login',
    pageTitle: 'Login',
    errorMessage: message
  });
};

exports.getSignup = (req,res,next)=> {
  let message = req.flash('error');
  if(message.length > 0){
    message = message[0];
  }
  else{
    message = null;
  }
  res.render('auth/registration',{
    pageTitle: 'Sign Up',
    path: '/registration',
    errorMessage: message
  });
};

exports.postLogin = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        req.flash('error', 'Invalid username or password');
        return res.redirect('/login');
      }
      return bcrypt.compare(password, user.password).then((doMatch) => {
        if (doMatch) {
          req.session.isLoggedIn = true;
          req.session.user = user;
          return req.session.save((err) => {
            if (err) {
              console.log(err);
            }
            res.redirect('/');
          });
        }
        req.flash('error', 'Invalid username or password'); 
        res.redirect('/login');
      });
    })
    .catch((err) => next(err)); 
};


exports.postSignUp = (req,res,next) => {
  const username = req.body.username;
  const password = req.body.password;
  if(!password || !username){
    req.flash('error','Password Or Username should not be empty');
    return res.redirect('/registration');
  }
  const confirmPassword = req.body.re-password;
  User.findOne({username: username})
  .then(userDoc =>{
    if(userDoc){
      req.flash('error','Username exists already, pleas pick different one');
      return res.redirect('/registration');
    }
    return bcrypt
      .hash(password,12)
      .then(hashedPassword =>{
        const user = new User({
          username: username,
          password: hashedPassword,
          list: []
        });
        return user.save();
      })
      .then(result => {
        req.flash('error','Successful registration');
        return res.redirect('/login');
      })
      .catch(err=> console.log(err));
  })
  .catch(err => console.log(err));
};
