const express = require('express');
const bodyParser = require('body-parser');

const https = require('https');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post('/', (req, res) => {


    const city = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=4bcf83853cb690a6653f1b9ac4d9fdda&units=metric";
        
    https.get(url, (otvet) => {
        console.log(otvet.statusCode);
    
        otvet.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const iconURL = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
            res.write("<p>The weather is currently " + weatherDescription + "</p>");
            res.write("<h1>The temperature in " + city + " is " + temp + " degrees Celcius</h1>");
            res.write("<img src=" + iconURL + ">");
            res.send();

        });
    });
});





app.listen(port, function(){
    console.log("Server is running on port " + port);
});