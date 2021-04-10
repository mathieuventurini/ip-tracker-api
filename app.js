

// MAP API (leaflet)

let mapId = document.getElementById('mapid');

let mymap = L.map('mapid').setView([51.505, -0.09], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWF0dDQwNCIsImEiOiJja25iZjc2NG4wd3l6MnhsY3lybjZqYjJlIn0.gRQUmvMIAifvlUIBPucMBA'
}).addTo(mymap);

// Default marker, same as the default set view in mymap (London)

let marker = L.marker([51.505, -0.09]).addTo(mymap);


// Input element 

let enteredIp = document.getElementById('ip-tracker');
let searchBtn = document.getElementById('btn');

// Element to update in my HTML

let currentIp = document.getElementById('ipaddress');
let currentLocation = document.getElementById('location');
let currentZone = document.getElementById('timezone');
let currentIsp = document.getElementById('isp');


// IP TRACKER API (geo.ipify)


function main(enteredIp){
    let ip = enteredIp.value;
    let api_key = 'at_LDZG4EJev3mag4j8rJjdOJIZvNyne';
    let api_url = 'https://geo.ipify.org/api/v1?';
    let url = api_url + 'apiKey=' + api_key + '&ipAddress=' + ip; // We build the url with our parameters and put it in a var
  
    fetch(url)
      .then(res => {
        return res.json(); // We get the API result here
        
      })
      .then(res => {
        displayInfo(res);
        displayMap(res);
      }) // We execute our functions  

  };

  // We display the parameters we pick in our html code

  function displayInfo(res){
      console.log(res);
      currentIp.innerText = res.ip;
      currentLocation.innerText = res.location.city + ", " + res.location.country + " " + res.location.postalCode;
      currentZone.innerText = "UTC" + res.location.timezone;
      currentIsp.innerText = res.isp;

  };

// We display the result in our map API

  function displayMap(res){
        mymap.setView([res.location.lat, res.location.lng], 13);
        marker.setLatLng([res.location.lat, res.location.lng]);    
  }

//  ON CLICK

searchBtn.addEventListener('click', e => {
    e.preventDefault();
    main(enteredIp);
});

