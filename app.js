const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const mongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const User = require('./models/user');
const authRoutes = require('./routes/auth');
const errorController = require('./Controller/error');
const homeRoutes = require('./routes/home');
const hikingRoutes = require('./routes/hiking');
const cityRoutes = require('./routes/city');
const islandRoutes = require('./routes/island');
const destinationRoutes = require('./routes/destination');
const searchRoutes = require('./routes/search');

const MongoDb_URI = '';

const store = new mongoDBStore({
  uri: MongoDb_URI,
  collection: 'sessions' 
});

const csrfProtection = csrf();

const app = express();

app.set('view engine','ejs');
app.set('views','views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(session({secret: 'my secret', resave: false, saveUninitialized: false, store: store}));
app.use(csrfProtection);
app.use(flash());

app.use((req,res,next)=>{
  if(!req.session.user){
    return next();
  }
  User.findById(req.session._id)
  .then(user=>{
    if(!user){
      return next();
    }
    req.user = user;
    next();
  })
  .catch(err=> console.log(err));
});

app.use((req,res,next)=>{
  res.locals.isLoggedIn = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

const isAuth = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/login');
  }
  next();
};


app.use('/home', isAuth, homeRoutes); 
app.use('/hiking',hikingRoutes);
app.use('/island',islandRoutes);
app.use('/city',cityRoutes);
app.use(destinationRoutes);
app.use(homeRoutes);
app.use(searchRoutes);
app.use(authRoutes);
app.use(errorController.get404);

mongoose
  .connect(MongoDb_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });
