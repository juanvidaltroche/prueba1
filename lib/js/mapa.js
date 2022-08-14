var myLocationMarker = null;
var map = null;
var sCadenaCordenadas = null;
var idInterseccion = null;
var interLatitud = null;
var interLongitud = null;
var myMarkerAnterior = null;
var options1 = {
    enableHighAccuracy: true,
    maximumAge: 60000,
    timeout: 45000
};
var lantlong = {

    lat: "-16.493373731812284",
    lon: "-68.14458847045898"

};
var lantlongAnterior = {
    latAnterior: "",
    lonAnterior: ""
};
var mapDiv = null;

//nueva direccion mapa


function initialize() {
    alert("0");
  var mapOptions = {
    zoom: 8,
    //center: new google.maps.LatLng(-34.397, 150.644)
    center: new google.maps.LatLng(lantlong.lat, lantlong.lon)
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
}

function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' +
      'callback=initialize';
  document.body.appendChild(script);
}



