const locations = require("./location.json");
const weather = require("weather-js");

for (let i = 0; i < locations.length; i++) {
  const postCode = locations[i].zip;
  const locationName = locations[i].city;

  weather.find(
    { search: postCode ? postCode : locationName, degreeType: "F" },
    function(err, result) {
      if (err) {
        console.log(err);
      }
      const weatherOutput = result[0].current;
      let localTime = getLocalTime(result);
      console.log(locationName, localTime, weatherOutput);
    }
  );
}

function getLocalTime(weatherOutput) {
  const timeStamp = new Date();
  const timeZone = parseInt(weatherOutput[0].location.timezone);
  let localTime = timeStamp.setHours(timeStamp.getHours() + timeZone);
  localTime = new Date(localTime);

  return localTime;
}
