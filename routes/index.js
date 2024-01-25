var express = require('express');
var router = express.Router();
const db = require('../db')
var users = require('../Model/user')
var passport = require('passport')
var localStrategy = require('passport-local')
passport.use(new localStrategy(users.authenticate()))


router.post('/register', (req, res, next) => {
  var newUser = {
    //user data here
    username: req.body.username
    //user data here
  };
  users
    .register(newUser, req.body.password)
    .then((result) => {
      passport.authenticate('local')(req, res, () => {
        //destination after user register
        res.redirect('/');
      });
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get('/register', (req, res, next) => {
  res.render("register")
})

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  }),
  (req, res, next) => { }
);

router.get('/login', (req, res, next) => {
  res.render("login")
})

function isloggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  else res.redirect('/login');
}

router.get('/logout', (req, res, next) => {
  if (req.isAuthenticated())
    req.logout((err) => {
      if (err) res.send(err);
      else res.redirect('/');
    });
  else {
    res.redirect('/');
  }
});


/* GET home page. */
router.get('/', isloggedIn, async function (req, res, next) {

  const loggedInUser = req.user
  console.log(loggedInUser)

  res.render('index', { title: 'Express', loggedInUser});
});




module.exports = router;
