const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const moment = require('moment');
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
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${searchText}&units=metric&appid=${apiKey}`
  console.log(url);
  request(url, function (err, response, body) {
    if(err){
      res.render('result', {weatherResult: null, error: 'Error, please try again', moment: moment});
    } else {
      let weatherResult = JSON.parse(body)
      if(weatherResult.main == undefined){
        res.render('result', {weatherResult: null, error: 'Error, please try again', moment: moment});
      } else {
        res.render('result', {weatherResult: weatherResult, error: null, moment: moment});
      }
    }
  });
})

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/fiveDaysForecast', function (req, res) {
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
  let url = `http://api.openweathermap.org/data/2.5/forecast?q=${searchText}&units=metric&appid=${apiKey}`
  console.log(url);
  request(url, function (err, response, body) {
    if(err){
      res.render('forecastResult', {weatherResult: null, error: 'Error, please try again', moment: moment});
    } else {
      let weatherResult = JSON.parse(body)
      if(weatherResult.list == undefined){
        res.render('forecastResult', {weatherResult: null, error: 'Error, please try again', moment: moment});
      } else {
        res.render('forecastResult', {weatherResult: weatherResult, error: null, moment: moment});
      }
    }
  });
})

app.get('/fiveDaysForecast', function (req, res) {
  res.render('fiveDaysForecast', {weather: null, error: null});
})


app.post('/UV', function (req, res) {
  let coordinates = req.body.coordinate;
  var array = coordinates.split(",");
  var lon = 0;
  var lat = 0;
  if (array.length ==2)
  {
    lat = array[0];
    lon = array[1];
  }

  let url = `http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`
  request(url, function (err, response, body) {
    if(err){
      res.render('UVResult', {weatherResult: null, error: 'Error, please try again', moment: moment});
    } else {
      let weatherResult = JSON.parse(body)
      if(weatherResult.value == undefined){
        res.render('UVResult', {weatherResult: null, error: 'Error, please try again', moment: moment});
      } else {
        res.render('UVResult', {weatherResult: weatherResult, error: null, moment: moment});
      }
    }
  });
})

app.get('/UV', function (req, res) {
  res.render('UV', {weather: null, error: null});
})

app.listen(8888, function () {
  console.log('Example app listening on port 8888!')
});
