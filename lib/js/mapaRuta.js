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

    lat: "",
    lon: ""

};
var lantlongAnterior = {
    latAnterior: "",
    lonAnterior: ""
};
var mapDiv = null;

/*function iniciarAplicacion() {
    var myCordenadaInicial = document.getElementById("GEOLOCALIZACION");
    if (myCordenadaInicial && myCordenadaInicial.value != '') {        
        sCadenaCordenadas = myCordenadaInicial.value;
    }    
    if (window.navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(exito, falla,options1);        
    }     
}*/
function iniciarAplicacion() {
    var mapDiv = document.getElementById("map");
    var miLatitud = document.getElementById("PARADA_LATITUD");
    var miLongitud = document.getElementById("PARADA_LONGITUD");
    //alert("latitud:" + miLatitud.value + " *** " + "miLongitud:" + miLongitud.value);
    if (miLatitud && miLongitud) {
        if (miLatitud.value != "" && miLongitud.value != "") {
            //alert("latitud:" + miLatitud.value + " *** " + "miLongitud:" + miLongitud.value);
            lantlong.lat = miLatitud.value.toString().trim();
            lantlong.lon = miLongitud.value.toString().trim();
            //alert("latitud:" + miLatitud.value.toString().trim() + " *** " + "miLongitud:" + miLongitud.value.toString().trim());
            lantlongAnterior.latAnterior = miLatitud.value;
            lantlongAnterior.lonAnterior = miLongitud.value;
        }
        else {
            lantlong.lat = "-16.50386656678512";
            lantlong.lon = "-68.13107013702393";
        } 

    }
    var latlng = new google.maps.LatLng(lantlong.lat, lantlong.lon);
    var options = {
        center: latlng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(mapDiv, options);
    //Adicionando punto Interseccion
    if (lantlongAnterior.latAnterior != "" && lantlongAnterior.lonAnterior != "") {
        myLocationMarker = new google.maps.Marker({
            title: 'Punto Interseccion!',
            zIndex: 90,
            map: map,
            icon: 'http://google-maps-icons.googlecode.com/files/administration.png'
        });
        //desplegar anterior posisicion
        var myLocation = new google.maps.LatLng(lantlongAnterior.latAnterior, lantlongAnterior.lonAnterior);
        myLocationMarker.setPosition(myLocation);
    }
    //AGREGANDO EL PUNTO AL HACER CLICK
    google.maps.event.addListener(map, 'click', function (event) {
        if (myMarkerAnterior) {
            myMarkerAnterior.setMap(null);
        }
        var sCordenada = event.latLng;
        /*var miLocalizacion = document.getElementById("GEOLOCALIZACION");
        if (miLocalizacion) {
            miLocalizacion.value = sCordenada;
        }*/
        var sPunto = new google.maps.Marker({
            title: 'Nuevo Punto!',
            zIndex: 90,
            map: map
        });
        myMarkerAnterior = sPunto;
        if (myLocationMarker) {
            myLocationMarker.setMap(null);
        }
        sPunto.setPosition(sCordenada);
        //TRABAJANDO CON LOS PUNTOS ANTERIORES
        if (miLatitud) {
            //alert(sCordenada.lat().toString().trim());     
            miLatitud.value = sCordenada.lat().toString().trim();
         //  alert(miLatitud.value);
        }
        if (miLongitud) {
            miLongitud.value = sCordenada.lng().toString().trim();
           // alert(miLongitud.value);
        }
    });
}
function recargarMapa(sLatitud, sLongitud)
{
    //alert("LATITUD:" +sLatitud + "  LONGITUD:" + sLongitud);
    var miLatitud = parent.document.getElementById("PARADA_LATITUD");
    var miLongitud = parent.document.getElementById("PARADA_LONGITUD");
    if (sLatitud != "" && sLongitud!="") {
        miLatitud.value = sLongitud;
        miLongitud.value = sLatitud;
    }   
    //alert("fin");
}