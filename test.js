
var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var util = require('./lib/utility');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var db = require('./app/config');
var User = require('./app/models/user');
var Link = require('./app/models/link');

var uri = 'www.test.com';

// Link.find({ url: uri }).then(function(link) {
//   if (link) {
//     // res.status(200).send(link);
//     console.log(link);
//   } else {
//     util.getUrlTitle(uri, function(err, title) {
//       if (err) {
//         console.log('Error reading URL heading: ', err);
//         // return res.sendStatus(404);
//         return;
//       }
//       var newLink = new Link({
//         url: uri,
//         title: 'title test',
//         baseUrl: 'test.com'
//       });
//       newLink.save().then(function(newLink) {
//         console.log('new link created');
//       });
//     });
//   }
// }).catch(function(err) {
//   console.log(err);
// });
var newUser = new User({username: 'len', password: 'len'});
newUser.save(function(err, data) {
  console.log('data is', data);
  console.log('err is', err);
});

// newUser.comparePassword('len', function(match) {
//   console.log('whattt', match);
// });

// var newUrl = new Link({url: 'len'}).save(function(err, data) {
//   console.log('data is', data);
// });

// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test');

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
// });

// var kittySchema = mongoose.Schema({
//   name: String
// });

// var Kitten = mongoose.model('Kitten', kittySchema);

// var silence = new Kitten({ name: 'Silence' });
// console.log(silence.name); // 'Silence'

// var Kitten = mongoose.model('Kitten', kittySchema);

// var fluffy = new Kitten({ name: 'fluffy' });

// fluffy.save(function (err, fluffy) {
//   console.log(err, fluffy);
// });

// Kitten.find(function (err, kittens) {
//   console.log(kittens);
// });

// Kitten.find({ name: /^Fluff/ }, function(err, kitten) {
//   console.log('found', kitten);
// });