$(document).ready(function () {
    console.log("Document is ready!");
    localStorage.setItem("searches","");
    
});

function fetchData(cityParam){
    //var city = document.getElementById('search-term').value;
    if(cityParam === undefined || cityParam.length ==0){
        alert('Please enter/select a city name');
        return;
    }
    var city = cityParam.toUpperCase();
    var searches = localStorage.getItem("searches").split(",");
    if(!searches.includes(city)) {
      searches.push(city);
    }
    console.log(searches);
    localStorage.setItem("searches", searches);
    document.getElementById('searches').innerHTML = "";
    for(var i=0;i<searches.length;i++){
      if( searches[i] !== undefined && searches[i].length !=0) {
      createSearchedItem(searches[i]);
      }
  }
    console.log("Fetching weather data for: " + city);
 // This is our API key. Add your own API key between the ""
 var APIKey = "d01bff4da718cbe55e0c2eef2de6c401";

 // Here we are building the URL we need to query the database
 
 var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=" + APIKey;
 var oneCallUrl = "https://api.openweathermap.org/data/2.5/onecall?"
 

 // We then created an AJAX call
 $.ajax({
   url: queryURL,
   method: "GET"
 }).then(function(responseFirst) {
     console.log(responseFirst);
     var lat = responseFirst.coord.lat;
     var lon = responseFirst.coord.lon;
     //https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,daily&appid={YOUR API KEY}
     var oneCallFullUrl = oneCallUrl+"lat="+lat+"&lon="+lon+"&exclude=hourly,minutely&units=imperial&appid="+APIKey;
      $.ajax({
         url: oneCallFullUrl,
         method: "GET"}).then(function(response){
            console.log(response);

            var dt = response.current.dt;
            console.log("dt:"+dt);

            var currentDate = (convertTimeStampToDate(dt));
            console.log("currentDate: " + currentDate);
            
            var city = responseFirst.name;
            console.log("City : " + responseFirst.name); 

            var currentTempIcon = response.current.weather[0].icon;
            var iconUrl = "http://openweathermap.org/img/wn/"+currentTempIcon+".png";
            var temp1 = "<img src=\""+iconUrl+"\" alt=\"weather\">";
            var currentHeader = city + " (" + currentDate + ") "+ temp1 ;
            console.log(currentHeader)
            document.getElementById('currentHeader').innerHTML = currentHeader ;
            
           

            var temp = (response.current.temp);
            console.log("Temperature: " + temp);
            document.getElementById('currentTemp').innerHTML = "Temprature: " + temp + " &#8457;";

            var humidity = response.current.humidity;
            console.log("Humidity:" + humidity);
            document.getElementById('currentHumidity').innerHTML = "Humidity: " + humidity + "%";

            var windSpeed = response.current.wind_speed;
            console.log("Wind Speed:" +windSpeed);
            document.getElementById('currentWind').innerHTML = "Wind Speed: " + windSpeed + " MPH";

            var uvi = response.current.uvi;
            console.log("uvi:" +uvi);
            document.getElementById('currentUv').innerHTML = "UV Index: " + uvi;
            var cards = "";
            for(var i=0;i<5;i++){
              var daily_dt = response.daily[i].dt;
              var daily_temp = response.daily[i].temp.day;
              var daily_humidity = response.daily[i].humidity;
              var daily_icon = response.daily[i].weather[0].icon;
              var daily_iconUrl = "http://openweathermap.org/img/wn/"+daily_icon+".png";
              var dailt_formattedDate = convertTimeStampToDate(daily_dt);
              cards = cards + getCardHtml(dailt_formattedDate,daily_iconUrl,daily_temp, daily_humidity);

            }
           
            //var firstCard = getCardHtml(currentDate,iconUrl,temp,humidity);
            document.getElementById('forcast').innerHTML = cards;
            //response.daily[0].dt
            //response.daily[0].temp.day
            //response.daily[0].humidity
            //response.daily[0].weather[0].icon

      });
    

   // Create CODE HERE to Log the queryURL
   // Create CODE HERE to log the resulting object
   // Create CODE HERE to calculate the temperature (converted from Kelvin)
   // Create CODE HERE to transfer content to HTML
   // Hint: To convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
   // Create CODE HERE to dump the temperature content into HTML

 });

 document.getElementById('main-container').style.display = "block";


}

function convertTimeStampToDate(timestamp){
    var fullDate = new Date(timestamp * 1000);
            var year = fullDate.getFullYear();
            var month = fullDate.getMonth();
            var date = fullDate.getDate();
            var formattedDate = month+"/"+date+"/"+year;
            return formattedDate;
}

function getCardHtml(date,imageUrl,temperature, humidity){
    var card = "<div class=\"card\"> ";
    var cardBody = "<div class=\"card-body custom-card\">";
    var cardText = "<p class=\"card-text\"><p>"+date+"</p>";
    var image = "<p><img src=\""+imageUrl+"\"></p>";
    var temp = "<p>Temp: "+temperature+" &#8457;</p> ";
    var humidityText = "<p>Humidity: "+ humidity +" %</p>";
    var closeCard = "</div></div>";
    return card+cardBody+cardText+image+temp+humidityText+closeCard;
                    
    
}

function createSearchedItem(item){

  var button = document.createElement('button');
  button.type = 'button';
  button.innerHTML = item;
  button.className = 'list-group-item list-group-item-action';

  button.onclick = function() {
    fetchData(item);
  };

  var container = document.getElementById('searches');
  container.appendChild(button);

 
                  
  
}