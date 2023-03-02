const express = require('express');
const app = express();

app.use(express.static("public")); 
const port = 3000;

app.get('/', async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    //console.log(ip)
    try {
      const geoResponse = await fetch(`http://api.ipstack.com/134.201.250.155?access_key=ad5c3eac14f0bf57d17bd1208a820460`);
      const geoData = await geoResponse.json();
      //console.log(geoData)
      const { latitude, longitude } = geoData;

      
      const sunResponse = await fetch(`https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0`);
      const sunData = await sunResponse.json();
      //console.log(sunData)
      const sunrise = new Date(sunData.results.sunrise);
      const sunset = new Date(sunData.results.sunset);
      
      //res.send(`Sunrise: ${sunrise.toLocaleTimeString()}<br>Sunset: ${sunset.toLocaleTimeString()}`);
      res.sendFile(__dirname + '/public/index.html')
    } catch (error) {
      res.send(`Error: ${error}`);
    }
  });

  app.listen(port, () => {
    console.log(`Server running at port ${port}`);
  });