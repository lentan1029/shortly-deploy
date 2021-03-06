// var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

// var User = db.Model.extend({
//   tableName: 'users',
//   hasTimestamps: true,
//   initialize: function() {
//     this.on('creating', this.hashPassword);
//   },
//   comparePassword: function(attemptedPassword, callback) {
//     bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
//       callback(isMatch);
//     });
//   },
//   hashPassword: function() {
//     var cipher = Promise.promisify(bcrypt.hash);
//     return cipher(this.get('password'), null, null).bind(this)
//       .then(function(hash) {
//         this.set('password', hash);
//       });
//   }
// });


var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: {type: String, unique: true},
  password: String
});

userSchema.methods.comparePassword = function(pw, callback) {
  console.log(this.username, this.password);
  bcrypt.compare(pw, this.password, function(err, isMatch) {
    console.log('bcrypt', isMatch, pw, this.password);
    callback(isMatch);
  }.bind(this));
};

userSchema.pre('save', function(next) {
  var cipher = Promise.promisify(bcrypt.hash);
  var context = this;
  cipher(context.password, null, null)
    .then(function(hash) {
      context.password = hash;
      next();
    });
});

var User = mongoose.model('User', userSchema);


module.exports = User;