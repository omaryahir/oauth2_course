var bodyParser = require('body-parser');
var express = require('express');
var OAuthServer = require('express-oauth-server');

var app = express();


// Database 
var env = require('env')
var mongoose = require('mongoose')
mongoose.connect(env.mongoDbUrl, function (err, res) {
    if (err) {
        console.log('ERROR connectiong to ' + uristring + '. ' + err)
    } else {
        mongoose.set('debug', !env.isProduction)
        console.log('Succeded connected to ' + uristring)
    }
})
mongoose.set('useCreateIndex', true)
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB error'));
db.once('open', console.log.bind(console, 'MongoDB connection successful'))

app.oauth = new OAuthServer({
  debug: true, 
  model: require('./model') // See https://github.com/oauthjs/node-oauth2-server for specification
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(app.oauth.authorize());

app.use(function(req, res) {
  res.send('Secret area');
});

app.listen(3000);
