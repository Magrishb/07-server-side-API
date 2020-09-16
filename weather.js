$(document).ready(function () {
    console.log("Document is ready!");
    
});

function fetchData(city){
    console.log("Fetching weather data for: " + city);
 // This is our API key. Add your own API key between the ""
 var APIKey = "d01bff4da718cbe55e0c2eef2de6c401";

 // Here we are building the URL we need to query the database
 var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Atlanta&appid=" + APIKey;

 // We then created an AJAX call
 $.ajax({
   url: queryURL,
   method: "GET"
 }).then(function(response) {
     console.log(response);
     console.log("City : " + response.name);
     var temp = (response.main.temp - 273.15) * 1.80 +32;
     console.log("Temperature: " + temp);
     console.log("Humidity:" + response.main.humidity);
     console.log("Wind Speed:" + response.wind.speed);
   // Create CODE HERE to Log the queryURL
   // Create CODE HERE to log the resulting object
   // Create CODE HERE to calculate the temperature (converted from Kelvin)
   // Create CODE HERE to transfer content to HTML
   // Hint: To convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
   // Create CODE HERE to dump the temperature content into HTML

 });

 document.getElementById('main-container').style.display = "block";


}