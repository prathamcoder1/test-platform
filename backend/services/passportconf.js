// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
// var JwtStrategy = require('passport-jwt').Strategy;
// var ExtractJwt = require('passport-jwt').ExtractJwt;

// const bcrypt = require('bcrypt');
// const saltRounds = 10;

// var config = require('config');

// var userModel = require('../models/user');
// var adminModel = require('../models/admin');

// var localStrategyOption = {
//   usernameField: 'email',
//   passwordField : 'password',
//   passReqToCallback : true
// }

// function localStrategyVerify(req,email, password, done){
//   userModel.find({'email':email}, (err, user)=>{
//     //  database server error
//     if(err) {
//       return done(err, false, {
//         success : false,
//         message : 'server error in authenctication'
//       });
//     }

//     // user not found
//     if(!user) {
//       return done(null, false, {
//         success : false,
//         message : 'email is not registered'
//       })
//     } else if (user.status == false) {
//       return done(null, false, {
//         success : false,
//         message : 'your account is blocked'
//       })
//     }
//     else {
//       //check for password
//       bcrypt.compare(password, user.password)
//       .then( (result) => {
//         if(result) {
//           return done(null, user, {
//             success : true,
//             message : 'logged in successfully'
//           });
//         } else {
//           return done(null, false, {
//             success : false,
//             message : 'invalid password'
//           });
//         }
//       })
//     }

//   })
// }

// var localStrategy = new LocalStrategy(localStrategyOption, localStrategyVerify);

// passport.use('login',localStrategy);


// var jwt_options = {
//   jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey : config.jwt.secret
// }

// function jwtStrategyVerify(jwt_payload, done) {
//   userModel.findById(jwt_payload._id, (err, user)=> {
//     //  database server error
//     if(err) {
//       return done(err, false, {
//         success : false,
//         message : 'server error'
//       });
//     }
//     if (user) {
//       return done(null, user,{
//           success: true,
//           message: "Successful"
//       }); 
//     } 
//     else {
//       return done(null, false,{
//           success: false,
//           message: "Authorization Failed"
//       });
//     }
//   });
// }

// var jwtStrategy = new JwtStrategy(jwt_options, jwtStrategyVerify);

// passport.use('user-token',jwtStrategy);

// var localStrategyOptionAdmin = {
//   usernameField : 'username',
//   passwordField : 'password',
//   passReqToCallback : true
// }

// function localStrategyVerifyAdmin(req, username, password, done) {
//   adminModel.find({'username':username}, (err, admin)=> {
//     // database server error
//     if(err) {
//       return done(err, false, {
//         success : false,
//         message : 'server error'
//       })
//     }

//     //admin not found
//     if(!admin) {
//       return done(null, false, {
//         success : false,
//         message : 'user not found'
//       })
//     } else {
//       //check of password 
//       bcrypt.compare(password, admin.password)
//       .then((result)=>{
//         if(result) {
//           return done(null, admin, {
//             success : true,
//             message : 'logged in successfully'
//           })
//         }
//         else {
//           return done(null, false, {
//             success : false,
//             message : 'invalid password'
//           })
//         }
//       })
//     }
//   })
// }

// var localStrategyAdmin = new LocalStrategy(localStrategyOptionAdmin, localStrategyVerifyAdmin);

// passport.use('admin-login',localStrategyAdmin);

// function jwtStrategyVeriryAdmin(jwt_payload, done) {
//   adminModel.findById(jwt_payload._id, (err, admin)=>{
//     //database server error
//     if(err) {
//       return done(err, false, {
//         success : false,
//         message : 'server error'
//       })
//     }

//     if (admin) {
//       return done(null, admin, {
//         success : true,
//         message : 'successful'
//       })
//     } else {
//       return done(null, false, {
//         success : false,
//         message : 'Authorization failed'
//       })
//     }
//   })
// }

// var jwtStrategyAdmin = new JwtStrategy(jwt_options, jwtStrategyVeriryAdmin);

// passport.use('admin-token', jwtStrategyAdmin);

// module.exports = passport;


const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');
const config = require('config');
const mongoose = require('mongoose');

const userModel = require('../models/user');
const adminModel = require('../models/admin');

const localStrategyOptions = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
};

const localStrategyVerify = async (req, email, password, done) => {
  try {
    const user = await userModel.findOne({email});
    
    if (!user) {
      return done(null, false, { success: false, message: 'Email is not registered' });
    }
    
    if (!user.status) {
      return done(null, false, { success: false, message: 'Your account is blocked' });
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      return done(null, user, { success: true, message: 'Logged in successfully' });
    } else {
      return done(null, false, { success: false, message: 'Invalid password' });
    }
  } catch (err) {
    return done(err, false, { success: false, message: 'Server error in authentication' });
  }
};

passport.use('login', new LocalStrategy(localStrategyOptions, localStrategyVerify));

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt.secret,
};

const jwtStrategyVerify = async (jwt_payload, done) => {
  try {
    const user = await userModel.findById(jwt_payload._id);
    console.log("in passport: ",user)
    if (user) {
      console.log("done")
      return done(null, user, { success: true, message: 'Successful' });
    } else {
      return done(null, false, { success: false, message: 'Authorization failed' });
    }
  } catch (err) {
    return done(err, false, { success: false, message: 'Server error' });
  }
};

passport.use('user-token', new JwtStrategy(jwtOptions, jwtStrategyVerify));

const localStrategyOptionsAdmin = {
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true,
};

const localStrategyVerifyAdmin = async (req, username, password, done) => {
  try {
    const admin = await adminModel.findOne({ username });
    
    if (!admin) {
      return done(null, false, { success: false, message: 'User not found' });
    }
    
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (isPasswordValid) {
      return done(null, admin, { success: true, message: 'Logged in successfully' });
    } else {
      return done(null, false, { success: false, message: 'Invalid password' });
    }
  } catch (err) {
    return done(err, false, { success: false, message: 'Server error' });
  }
};

passport.use('admin-login', new LocalStrategy(localStrategyOptionsAdmin, localStrategyVerifyAdmin));

const jwtStrategyVerifyAdmin = async (jwt_payload, done) => {
  try {
    const admin = await adminModel.findById(jwt_payload._id);
    if (admin) {
      return done(null, admin, { success: true, message: 'Successful' });
    } else {
      return done(null, false, { success: false, message: 'Authorization failed' });
    }
  } catch (err) {
    return done(err, false, { success: false, message: 'Server error' });
  }
};

passport.use('admin-token', new JwtStrategy(jwtOptions, jwtStrategyVerifyAdmin));

module.exports = passport;
