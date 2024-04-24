console.log("client side");
function getLocation() {


  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(sendLocationToBackend, handleLocationError);
  } else {
      alert("Geolocation is not supported by this browser.");
  }
}

function sendLocationToBackend(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  // Send latitude and longitude to backend
  fetch(`/api/listings?latitude=${latitude}&longitude=${longitude}&maxDistance=100`)
      .then(response => response.json())
      .then(data => {
          // Handle the returned listings, perhaps by displaying them on the frontend
          console.log(data);
      })
      .catch(error => {
          // Handle any errors
          console.error(error);
      });
}

function handleLocationError(error) {
  switch(error.code) {
      case error.PERMISSION_DENIED:
          alert("User denied the request for Geolocation.");
          break;
      case error.POSITION_UNAVAILABLE:
          alert("Location information is unavailable.");
          break;
      case error.TIMEOUT:
          alert("The request to get user location timed out.");
          break;
      case error.UNKNOWN_ERROR:
          alert("An unknown error occurred.");
          break;
  }
}