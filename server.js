// grab express
var express = require('express'); // create an express app
var app = express();
var path = require('path');
// create an express route for the home page // http://localhost:8080/

// CONFIGURE THE APP
// ==================================================
// tell node where to look for site resources
app.use(express.static(__dirname + '/public'));


// set the view engine to ejs
app.set('view engine', 'ejs');


app.get('/', function(req, res) {
    res.render('pages/index');
});

app.get('/diagnostico', function(req, res) {
    res.render('pages/diagnostico');
});

app.get('/laser-depilacion', function(req, res) {
    res.render('pages/laser-depilacion');
});

app.get('/contacto', function(req, res) {
    res.render('pages/contacto');
});

app.get('/laser-manchas', function(req, res) {
    res.render('pages/laser-manchas');
});

app.get('/contact.php', function(req, res) {
    console.log("get into contact");
    console.log(path.join(__dirname + '/views/contact.php'));
    res.sendFile(path.join(__dirname + '/views/php/contact.php'));
});

app.get('/laser-rejuvenecimiento', function(req, res) {
    res.render('pages/laser-rejuvenecimiento');
});

app.get('/tratamientos', function(req, res) {
    res.render('pages/tratamientos');
});

app.get('/medicina-dermatude', function(req, res) {
    res.render('pages/medicina-dermatude');
});

app.get('/medicina-endymed', function(req, res) {
    res.render('pages/medicina-endymed');
});

// start the server on port 8080
app.listen(29398);
console.log('App started! Look at http://localhost:29398');
// send a message console.log('Server has started!');