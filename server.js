var express = require('express');
var app = express();

// Using body-parser
const bodyParser = require('body-parser');
var request = require('request');
const apiKey = 'fe3850df60cd456c91f2f884d159430c';


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

// Express won't allow access to css file by default, so ...
app.use(express.static('public'));

app.get('/', function(req, res){
	// Old Code: res.send('Hello World');
	res.render('index');
	// render when using ejs
});


app.listen(3000, function(){
	console.log('Server listening on port 3000');
});


/* Setting up the POST Route
app.post('/', function(req, res){
	//res.render('index');
	//console.log(req.body.city);
});
*/

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = 'http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}';
request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body);
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `'It is' ${weather.main.temp} degrees 'in' ${weather.name}!;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})

// body-parser Moddleware. Allows us to make use of the key-value pairs stored on the req-body object
// By using body-pares we can make use of the req.body object



