// Initialize the map
var map = L.map('map').setView([0, 0], 13);

// Add a tile layer from OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map);

// Check if the browser supports Geolocation
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
} else {
    alert("Geolocation is not supported by this browser.");
}

// Display the map and nearby Hindu temples
function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    // Set the map view to the user's location
    map.setView([latitude, longitude], 13);

    // Create a marker for the user's location
    var userMarker = L.marker([latitude, longitude]).addTo(map);
    userMarker.bindPopup("Your Location").openPopup();

    // Search for nearby Hindu temples
    var url = 'https://nominatim.openstreetmap.org/search?q=hindu+temple&format=json&lat=' + latitude + '&lon=' + longitude + '&zoom=14&addressdetails=1';

    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            for (var i = 0; i < data.length; i++) {
                var temple = data[i];
                var templeMarker = L.marker([temple.lat, temple.lon]).addTo(map);
                templeMarker.bindPopup("<b>" + temple.display_name + "</b>");
            }
        })
        .catch(function(error) {
            console.log('Error:', error);
        });
}
