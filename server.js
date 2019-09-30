// server.js
// ---------
// Author: Amiel Kollek <a_kollek@live.ca>
//


var express  = require('express');
var http     = require('http');
var bodyParser = require('body-parser');
var io       = require('socket.io');

var app  = express();
var http = http.Server(app);
var io   = io(http);

var routes  = require('./app/routes/routes.js')(io);
var io_r    = require('./app/io/io.js')(io);

// Set up jade
app.set('views', './app/views');
app.set('view engine', 'jade');

// Serve bower components
app.use(express.static('bower_components'));

/**
 * Set up req.body for post requests
 */
// for parsing application/json
app.use(bodyParser.json()); 
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));



// ---------------------------------

/**
 * Routes
 */
// landing page
app.get('/', routes.landing);

// list of channels, redirected to by landing
app.post('/channels', routes.channels);

app.post('/join', routes.join_channel);

app.post('/create', routes.create_channel);

// send a message
app.post('/message',routes.message);

// download messages for a channel
app.get('/download', routes.download_channel);

app.get('/admin', routes.admin_login);

app.post('/admin', routes.admin);

app.post('/makeinvite', routes.make_invite);

app.get('/invite', routes.landing);

app.post('/invite', routes.invite);

app.post('/likes', routes.likes);

app.post('/back_channels', routes.back_channels);

app.post('/bookmark', routes.bookmark);

app.post('/add_group', routes.add_group);

app.post('/sub_group', routes.sub_group);

app.post('/create_group', routes.create_group);

app.post('/edit_content', routes.edit_content);

app.post('/modify_hierarchy', routes.modify_hierarchy);

app.post('/signup', routes.signup);

app.get('/forgot_password', routes.forgot_password);

app.post('/forgot_password', routes.change_password);

app.get('/reset', routes.reset);

app.post('/reset', routes.reset_password);

app.post('/update_survey', routes.update_survey);

app.get('/consent', routes.get_consent);

app.get('/homepage', routes.homepage);

app.post('/tester_channels', routes.tester_channels);

app.post('/register', routes.register);

app.post('/presurvey', routes.presurvey);

app.post('/submit_presurvey', routes.submit_presurvey);

app.post('/instructions', routes.instructions);

app.post('/start', routes.start);

app.post('/postsurvey', routes.postsurvey);

app.post('/submit_postsurvey', routes.submit_postsurvey);

app.post('/login', routes.login);

app.get('/assign', routes.assign);

app.post('/hall', routes.hall);

app.post('/presurvey_login', routes.presurvey_login);

// ---------------------------------

/**
 * Websocket code
 */

io.on('connection',io_r.connection);

var port = process.env.PORT || 3000;

// Run server
http.listen(port,function(){
    console.log('Listening on 3000');
});

var reqTimer = setTimeout(function wakeUp() {
   require('http').request("http://ehims-new.herokuapp.com/", function() {
      console.log("WAKE UP DYNO");
   });
   return reqTimer = setTimeout(wakeUp, 1200000);
}, 1200000);

reqTimer;