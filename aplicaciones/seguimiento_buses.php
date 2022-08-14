<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
<script src="jquery-1.11.0.js" type="text/javascript"></script>
<script type="text/javascript">
//variables iniciales
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
    //lat: "-16.493373731812284",
    //lon: "-68.14458847045898"
	lat: "-16.522883",
    lon: "-68.114095"
};
var lantlongAnterior = {
    latAnterior: "",
    lonAnterior: ""
};
var mapDiv = null;

// VARIABLES GLOBALES JAVASCRIPT
var geocoder;
var marker;
var latLng;
var latLng2;
var map;

// INICiALIZACION DE MAPA
function initialize() {
  geocoder = new google.maps.Geocoder();
  latLng = new google.maps.LatLng(lantlong.lat, lantlong.lon);
  map = new google.maps.Map(document.getElementById('mapCanvas'), {
	zoom: 14,
    center: latLng,
	mapTypeId: google.maps.MapTypeId.ROADMAP
  });
}

// Permito la gesti¢n de los eventos DOM
google.maps.event.addDomListener(window, 'load', initialize);


// ESTA FUNCION OBTIENE LA DIRECCION A PARTIR DE LAS COORDENADAS POS
function geocodePosition(pos) {
  geocoder.geocode({
    latLng: pos
  }, function(responses) {
    if (responses && responses.length > 0) {
      updateMarkerAddress(responses[0].formatted_address);
    } else {
      updateMarkerAddress('No puedo encontrar esta direccion.');
    }
  });
}
</script>
</script>
<script  type="text/javascript">
var sArrayMarkersBuses = Array();
var sArrayMarkersParadas = Array();
var contador = 0;
var contadorParadas = 0;
var sRutaId = "1";
var sRutaIdParada = "1";

function graficarSeguimientoParadas(rutaId){
	if(rutaId){		
		sRutaIdParada = rutaId;
	}
	$.ajax({
		type: "POST",
		url: "../servicios/monitoreoGlobalParadasAjax.php?RUTA=" + sRutaIdParada,
		success: function (paradas) {			
			var nmResp = "";
			var latitud = "";
			var longitud = "";
			var bus = "";			
			var datos = JSON.parse(paradas);
			var numeroRegistros = sArrayMarkersParadas.length;			
			if (numeroRegistros != 0) {
				for(var i=0; i<sArrayMarkersParadas.length; i++) {
					sArrayMarkersParadas[i].setMap(null);
				}
				contadorParadas = 0;
			}
			//graficar los puntos
			$.each(datos, function (i, val) {
				RegistrosSyncData_paradas(val);
				contadorParadas ++;
			});			
			var res = "";
		}
	});
}

function graficarSeguimientoBuses(rutaId){
	if(rutaId){		
		sRutaId = rutaId;
	}
	$.ajax({
		type: "POST",
		url: "../servicios/monitoreoGlobalAjax.php?RUTA=" + sRutaId + "&nm=1",
		success: function (dataCheck) {
			var nmResp = "";
			var latitud = "";
			var longitud = "";
			var bus = "";			
			var datos = JSON.parse(dataCheck);
			var numeroRegistros = sArrayMarkersBuses.length;
			if (numeroRegistros != 0) {
				for(var i=0; i<sArrayMarkersBuses.length; i++) {
					sArrayMarkersBuses[i].setMap(null);
				}
				contador = 0;
			}
			$.each(datos, function (i, val) {
				graficarSeguimiento_bus(val);
				contador ++;
			});			
			var res = "";
		}
	});	
}
//GRAFICAR PARADAS
function RegistrosSyncData_paradas(results) {
    if(results){
		var sTipoIcono=0;
		var sUrlIcono = "img/img_semaforos/mountains_cathc.png";
		var tipoPunto = "LIBRE";
		var latit = null;
		var longi = null;
		var etiqueta = "";
		latit = results.PARADA_LATITUD.replace(",",".");
		longi = results.PARADA_LONGITUD.replace(",",".");
		etiqueta = results.PARADA_DESCRIPCION;
		sTipoIcono = sRutaIdParada;
		switch (sTipoIcono){
			case "1": 
					sUrlIcono = "../aplicaciones/img/parada_seguimiento.png";
				break
			case "2":
					sUrlIcono = "../aplicaciones/img/parada_seguimiento.png";
				break
			case "3":
					sUrlIcono = "../aplicaciones/img/parada_seguimiento.png";
				break
			default:	
					sUrlIcono = "../aplicaciones/img/parada_seguimiento.png";
		}		
		var sCordenadaParada = new google.maps.LatLng(latit, longi);
		sArrayMarkersParadas[contadorParadas] = new google.maps.Marker({
			title: etiqueta,
			position: sCordenadaParada,
			zIndex: 90,
			map: map,
			icon: sUrlIcono
		});
    }
}
//GRAFICAR BUSES
function graficarSeguimiento_bus(results) {
    if(results){		
		var sTipoIcono=0;
		var sUrlIcono = "img/img_semaforos/mountains_cathc.png";
		var tipoPunto = "LIBRE";
		var latit = null;
		var longi = null;
		var etiqueta = "";
		latit = results.latitud;
		longi = results.longitud;	
		etiqueta = "BA-" + results.bus;		
		//etiqueta = latit + " : " + longi;		
		sTipoIcono = results.ruta.trim();
		switch (sTipoIcono){
			case "1": 
					sUrlIcono = "../aplicaciones/img/llojeta.png";						
				break
			case "2":
					sUrlIcono = "../aplicaciones/img/salome.png";						
				break
			case "3":
					sUrlIcono = "../aplicaciones/img/sur.png";						
				break
			default:	
					sUrlIcono = "../aplicaciones/img/ida.png";
		}
		var sCordenada = new google.maps.LatLng(latit, longi);
		sArrayMarkersBuses[contador] = new google.maps.Marker({
			title: tipoPunto,
			position: sCordenada,
			zIndex: 90,
			map: map,
			title: etiqueta,
			icon: sUrlIcono,
			infoWindowHtml: "html"
		});
    }
}
</script>
<link href="../lib/bootstrap/css/bootstrap.css" rel="stylesheet">
</head>
<body  onload="graficarSeguimientoParadas();graficarSeguimientoBuses();setInterval('graficarSeguimientoBuses()', 30000);">
<style type="text/css">
  html { height: 100% }
  body { height: 100%; margin: 10px; padding: 0px }
  #mapCanvas { height: 100% }
</style> 
	<table>
		<thead>
		</thead>
		<tbody>
			<tr valign="top">
				<td>RUTA: </td>
				<td>							
					<select name="CBO_RUTA" id="CBO_RUTA" onchange = "graficarSeguimientoParadas($('#CBO_RUTA option:selected').val());graficarSeguimientoBuses($('#CBO_RUTA option:selected').val());">
						<option value="0">--Seleccione Ruta--</option>
						<option value="1">INKALLOJETA</option>
						<option value="2">V.SALOME</option>
						<option value="3">CHASQUIPAMPA</option>
					</select>
				</td>				
			</tr>	
			<tr><td><br/></td></tr>
		</tbody>					
	</table>       
</div>  
<div id="mapCanvas"></div>
</body>
</html>
