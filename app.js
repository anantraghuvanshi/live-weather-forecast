const express = require('express');
const http = require('http');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res) {

  res.sendFile(__dirname + "/index.html")

});

app.post("/", function(req, res){

  const query = req.body.cityName;
  const apiKey = "189224069bfdf3d4dd38f4d4eb016eef";
  const units = "metric";
  http.get("http://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid="+ apiKey+ "&units=" + units, function(response){
    console.log(response);

     response.on("data", function(data){
       const weatherData = JSON.parse(data);
       const temp = weatherData.main.temp;
       const weatherDescription = weatherData.weather[0].description;
       const icon = weatherData.weather[0].icon;
       const imageURL = "http://openweathermap.org/img/wn/" +icon + "@2x.png";


       res.write("<p>The weather is currently "+ weatherDescription+ "</p>");
       res.write("<h1>Temperature in "+ req.body.cityName +" is: " + temp+ "</h1>");
       res.write("<img src=" + imageURL+ ">");
       res.send();
     })
  });
})


app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000");
})
