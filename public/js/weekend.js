const axios = require('axios');

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var userLocation = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    };
    
    // Send userLocation to the server for further processing
    sendDataToServer(userLocation);
  });
} else {
  console.log("Geolocation is not supported by this browser.");
}

function sendDataToServer(userLocation) {
  axios.post('http://localhost:8080/user-location', userLocation)
    .then(function(response) {
      console.log('Location data sent successfully');
    })
    .catch(function(error) {
      console.error('Failed to send location data', error);
    });
}
