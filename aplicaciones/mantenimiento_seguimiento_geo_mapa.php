<html>
   <head>
         <title>La Paz</title>
         <link rel="stylesheet" href="../Librerias/openlayers/theme/default/style.css" type="text/css">
         <style>
                 #map-id {
                         width: 1600px;
                         height: 800px;
                 }
         </style>
         <script src="../Librerias/openlayers/lib/OpenLayers.js"></script>
		 <script src="jquery-1.11.0.js" type="text/javascript"></script>
		 
<script  type="text/javascript">
var sArrayMarkersBuses = Array();
var sArrayMarkersParadas = Array();
var contador = 0;
var contadorParadas = 0;
var sRutaId = "1";
var sRutaIdParada = "1";

//GRAFICAR PARADAS
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
					sArrayMarkersParadas[i].destroy();
				}
				contadorParadas = 0;
			}
			//graficar los puntos
			$.each(datos, function (i, val) {
				RegistrosSyncData_paradas(val);
				contadorParadas ++;
			});			
			if (sArrayMarkersParadas.length != 0) {
				for(var i=0; i<sArrayMarkersParadas.length; i++) {					
					map.addLayer(sArrayMarkersParadas[i]);			
				}
				contadorParadas = 0;
			}
			var res = "";
		}
	});
}

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
		sArrayMarkersParadas[contadorParadas] = new OpenLayers.Layer.Markers("Markers");
		var size = new OpenLayers.Size(21,25);
		var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
		var icon = new OpenLayers.Icon(sUrlIcono, size, offset);
		//var lonLat = new OpenLayers.LonLat(-7582816,-1864650);				
		var lonLat = new OpenLayers.LonLat(longi,latit)
		.transform(
			new OpenLayers.Projection("EPSG:4326"),
			map.getProjectionObject()
		);
		sArrayMarkersParadas[contadorParadas].addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(lonLat.lon,lonLat.lat),icon));
    }
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
					//sArrayMarkersBuses[i].setMap(null);
					sArrayMarkersBuses[i].destroy();					
				}
				contador = 0;
			}
			$.each(datos, function (i, val) {
				graficarSeguimiento_bus(val);				
				contador ++;
			});
			//construyendo los markers
			if (sArrayMarkersBuses.length != 0) {
				for(var i=0; i<sArrayMarkersBuses.length; i++) {					
					map.addLayer(sArrayMarkersBuses[i]);
				}
			}
			var res = "";
		}
	});	
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
		
		
		sArrayMarkersBuses[contador] = new OpenLayers.Layer.Markers("Markers");
		var size = new OpenLayers.Size(21,25);
		var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
		var icon = new OpenLayers.Icon(sUrlIcono, size, offset);
		//var lonLat = new OpenLayers.LonLat(-7582816,-1864650);				
		var lonLat = new OpenLayers.LonLat(longi,latit)
		.transform(
			new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
			map.getProjectionObject() // to Spherical Mercator Projection
		);
		//alert("-7582816,-1864650");
		//alert(lonLat.lon + " - " + lonLat.lat);				
		sArrayMarkersBuses[contador].addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(lonLat.lon,lonLat.lat),icon));			
		//map.addLayer(sArrayMarkersBuses[1]);		
		/*for(var i=0; i<sArrayMarkersParadas.length; i++) {
			//sArrayMarkersParadas[i].setMap(null);
			map.addLayer(sArrayMarkersParadas[i]);			
		}*/
		
		/*var sCordenada = new google.maps.LatLng(latit, longi);
		sArrayMarkersBuses[contador] = new google.maps.Marker({
			title: tipoPunto,
			position: sCordenada,
			zIndex: 90,
			map: map,
			title: etiqueta,
			icon: sUrlIcono,
			infoWindowHtml: "html"
		});*/
		//alert(contador);
		
		
    }
}
</script>

		 
        </head>
        <body onload ="graficarSeguimientoParadas();graficarSeguimientoBuses();setInterval('graficarSeguimientoBuses()', 5000);">
         <h1>La Paz</h1>
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
         <div id="map-id"></div>
         <script >
                 var bounds = new OpenLayers.Bounds(
                    -7590105, -1899001.870,
                    -7526882, -1809929.125
                );
                var options = {
                    controls: [],
                    maxExtent: bounds,
                    maxResolution: 29.7880859375,
                    projection: "EPSG:3857",
                    units: 'm'
                };

                 map = new OpenLayers.Map('map-id', options);

                layer = new OpenLayers.Layer.WMS(
				"Mapa La Paz", 
                //"http://192.168.28.95:9090/geoserver/cite/wms", 
                "http://gmlpsr0117:9090/geoserver/cite/wms", 
				{							
					service:'WMS',
					version:'1.1.0',
					srs:'EPSG:3857',							
					//layers:'lapaz2',					
					layers:'todaLapaz',					
					styles: ''
				} 
				);  
                map.addLayer(layer);				

                // build up all controls
                 map.addControl(new OpenLayers.Control.PanZoomBar({
                         position: new OpenLayers.Pixel(2, 15)
                 }));
			
                 map.addControl(new OpenLayers.Control.Navigation());
                 map.addControl(new OpenLayers.Control.Scale());
                 map.addControl(new OpenLayers.Control.MousePosition());
                 map.zoomToExtent(bounds);
				 
				/*var markers = new OpenLayers.Layer.Markers("Markers");
				map.addLayer(markers);
				size = new OpenLayers.Size(21, 25);
				
				calculateOffset = function(size) {
                        return new OpenLayers.Pixel(-(size.w/2), -size.h); };
				icon = new OpenLayers.Icon(
                'http://www.openlayers.org/dev/img/marker.png',
                size, null, calculateOffset);
				console.log(map);
				markers.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(-7582816,-1864650), icon));*/
				
         </script>
        </body>
</html>