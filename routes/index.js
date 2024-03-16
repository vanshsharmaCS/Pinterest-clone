var express = require('express');
var router = express.Router();
const userModel= require('./users');
const postModel= require('./posts');
const passport = require('passport');
const localStrategy= require('passport-local');
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/login', function(req, res, next) {
  res.render('login',{error:req.flash("error")});
});
router.get('/feed', isLoggedIn,function(req, res, next) {
  res.render('feed');
});
router.get('/profile', isLoggedIn,async function(req, res, next) {
  const user=await userModel.findOne({
    username:req.session.passport.user,
  })
  res.render('profile',{user});
});
router.post('/register', function(req, res, next){
  const {username, email, fullname}=req.body;
  const userData= new userModel({username, email, fullname});

  userModel.register(userData, req.body.password)
  .then(function(){
    passport.authenticate("local")(req, res, function(){
      res.redirect('/feed');
    })
  })
})
router.post('/login', passport.authenticate("local", {
  successRedirect:"/feed",
  failureRedirect: "/login",
  failureFlash:true
}),function(req, res, next){
})
router.get('/logout', function(req, res){
  req.logout(function(err){
    if(err)  {return next(err);}
    res.redirect('/');
  })
})

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()) return next();
  res.redirect('/');
}

module.exports = router;