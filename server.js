const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const request = require('request');
let apiKey = '84cc8677f928de9d5b0029cfe8fdb443';

app.post('/', function (req, res) {
  let city = req.body.city;
  var array = city.split(",");
  var searchText = "";
  if (array.length >=2)
  {
    searchText = array[0] + ',' +array[array.length-1];
  }
  else {
    searchText = array[0];
  }
  console.log(searchText);
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${searchText}&units=imperial&appid=${apiKey}`
  console.log(url);
  request(url, function (err, response, body) {
    if(err){
      res.render('result', {weatherResult: null, error: 'Error, please try again'});
    } else {
      let weatherResult = JSON.parse(body)
      if(weatherResult.main == undefined){
        res.render('result', {weatherResult: null, error: 'Error, please try again'});
      } else {
        res.render('result', {weatherResult: weatherResult, error: null});
      }
    }
  });
})

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.listen(8888, function () {
  console.log('Example app listening on port 8888!')
});
