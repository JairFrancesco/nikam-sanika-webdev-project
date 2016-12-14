module.exports = function(app,model){

  var passport = require('passport');
  var cookieParser = require('cookie-parser');
  var session = require('express-session');
  var LocalStrategy = require('passport-local').Strategy;
  var bcrypt = require("bcrypt-nodejs");
  var multer = require('multer'); // npm install multer --save
  var upload = multer({ dest: __dirname+'/../../public/project/uploads' });
  //var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
  var FacebookStrategy = require('passport-facebook').Strategy;
  app.use(session({
    secret: 'this is the secret',
    resave: true,
    saveUninitialized: true
  }));
  app.use(cookieParser());
  app.use(passport.initialize());//adds additional powers to req,res eg. req.user
  app.use(passport.session());

 



    app.get('/api/user', findUser);
    app.get('/api/user/:userId/profile',findUserById);
    app.post('/api/user',createUser);
    app.put('/api/user/:userId',loggedInAndSelf,updateUser);
    app.delete('/api/user/:userId',loggedInAndSelf,deleteUser);
    app.post('/api/login',passport.authenticate('local'),login);
    app.post('/api/checkLogin',checkLogin);
    app.post('/api/checkAdmin', checkAdmin);
    app.post('/api/logout',logout);
    app.post('/api/register',register);
    app.post("/api/upload", upload.single('myFile'), uploadImage);
    app.get("/api/review/user/:userId", findReviewsForUser);

    //app.get('/auth/google',passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get   ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/project/#/homepage',
        failureRedirect: '/project/#/login'
    }));

    var facebookConfig = {
        clientID        : '349535378760356',
        clientSecret    : '1060c03567830a4857c3aa969cfa20b0',
        callbackURL     : 'http://localhost:3000/auth/facebook/callback'
    };

    passport.use(new LocalStrategy(localStrategy));
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function loggedInAndSelf(req,res,next){
      console.log(req.user);
      var loggedIn = req.isAuthenticated();
      var userId = req.params.userId;
      console.log("$USER "+ typeof(userId) + " " +  userId);
      console.log("from passport "+typeof(req.user._id)+ " "+req.user._id );
      var self = userId == req.user._id;
      console.log([self,loggedIn]);
      if(self && loggedIn){
        next();
      }else{
        res.sendStatus(400);
      }
    }

    function facebookStrategy(token, refreshToken, profile, done) {
      console.log(profile);
      //done(null,profile);
       model.userModel
            .findUserByFacebookId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var names = profile.displayName.split(" ");
                        var newFacebookUser = {
                            username : names[0],
                            lastName:  names[1],
                            firstName: names[0],
                            email:     profile.emails ? profile.emails[0].value:"",
                            facebook: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return model.userModel.createUser(newFacebookUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );

    }

    function findReviewsForUser(req,res){
      var userId = req.params.userId;
      model.userModel.findReviewsByUser(userId)
        .then(function(reviews){
          res.json(reviews);
        },
        function(error){
          res.sendStatus(400).send(err);
        });

    }

    function register(req,res){
      var user = req.body;
      user.password = bcrypt.hashSync(user.password);
      model.userModel.createUser(user)
          .then(function(user){
            if(user){
              req.login(user,function(err){
                if(err){
                  res.sendStatus(400).send(err);
                }else{
                  res.json(user);
                }
              });
            }
            //res.send(newUser);
          },
          function(error){
            res.sendStatus(400).send(error);
          });
    }

    function logout(req,res){
      req.logout();
      res.send(200);
    }

     function checkLogin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function checkAdmin(req, res) {

        var loggedIn = req.isAuthenticated() ;
        var isAdmin = req.user.role == "ADMIN";

        if(loggedIn && isAdmin) {
            res.json(req.user);
        } else {
            res.send('0');
        }
    }

    function localStrategy(username,password,done){
      // var user,username,password;
      // user = req.body;
      // username = user.username;
      // password = user.password;
      //console.log([username,password]);
      model.userModel.findUserByUsername(username)
            .then(function(user){
              if(user && bcrypt.compareSync(password, user.password)){
                return done(null,user);
                  // res.send(user[0]);
                }else{
                  return done(null,false);
                }
                
                // else{
                //   res.send('0');
                // }
              
           
            
            },
            function (error){
              res.sendStatus(400).send(error);
            });
    }

    function login(req,res){
      var user = req.user;
      res.json(user);
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model.userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function findUserByUsername(req,res){
      var user,username;
      username = req.query.username;
      for( var u in users){
          if(users[u].username === username){
            user = users[u];
            res.send(user);
            return;
          }
      }
      res.send('0');
    }

    function findUserByCredentials(req,res){
      var user,username,password;
      username = req.query.username;
      password = req.query.password;
      model.userModel.findUserByCredentials(username,password)
            .then(function(user){
              if(user){
                if(user.length != 0){
                  res.send(user[0]);
                }
                else{
                  res.send('0');
                }
              
            }
            
            },
            function (error){
              res.sendStatus(400).send(error);
            });
    }

    function findUserById(req,res){
      var userId = req.params.userId;
      model.userModel
          .findUserById(userId)
          .then(function(user){

            if(user){
              res.send(user);
            }
            else{
              res.send('0');
            }
            
            
          },
          function(error){
            res.sendStatus(400).send(error);
          })
      
    }

    function createUser(req,res){
      var user = req.body;
        model.userModel.createUser(user)
          .then(function(newUser){
            res.send(newUser);
          },
          function(error){
            res.sendStatus(400).send(error);
          });

    }

    function updateUser(req,res){

      var user = req.body;
      var userId = req.params.userId;
      

      model.userModel.updateUser(userId,user)
           .then(function(status){
            model.userModel.findUserById(userId)
              .then(function(user){

              console.log("From server service");
              //console.log(status);
              //res.send(200);
              res.json(user);
              },
              function(error){
                res.sendStatus(400).send(error);
              });
           },
           function(error){
            res.sendStatus(400).send(error);
           });
   
    }

    function deleteUser(req,res){
      var userId = req.params.userId;
      model.userModel.deleteUser(userId)
            .then(function(status){
              res.send(200);
            },
            function(error){
              res.sendStatus(400).send(error);
            });
  }

    

    function findUser(req,res){
    	var query = req.query;
      var params = req.params;
    	if(query.username && query.password){
    		findUserByCredentials(req,res);
    	}
    	else if(query.username){
    		findUserByUsername(req,res);
    	}else{
        res.json(req.user);
      }
    }

    function uploadImage(req, res) {

      console.log("Entered upload img");
        //var userId      = req.body._id;
        var width         = req.body.width;
        var myFile        = req.file;
       var userId        = req.body.userId;
        console.log("$USERID "+userId);


        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        
        model.userModel.findUserById(userId)
              .then(function(user){
               // widget.width = width;
                user.imageUrl = "/project/uploads/" + filename;
                console.log("inside upload pic");
                model.userModel.updateUser(userId,user)
                  .then(function(status){
                    res.redirect("/project/#/user/" + userId);
                  },
                  function(error){
                    res.statusCode(400).send(error);
                  });
                
              },
              function(error){
                res.statusCode(400).send(error);
              });

    }

    

    
};