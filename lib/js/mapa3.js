//var db = window.openDatabase("semaforos.db3", "1.0", "Informacion del Servidor", 15 * 1048576);

var myLocationMarker = null;
var myMarkerAnterior = null;
var map = null;	
var sCadenaCordenadas = null;
var idDepartamento = null;
var options1 = {
	enableHighAccuracy : true,
	maximumAge : 60000,
	timeout : 45000
};
var lantlong = {
	lat : "-16.495554642403135",
	lon : "-68.13350558280945"
};

function enviarMensaje()
{
	alert("Este es un mensaje enviado");
}
function iniciarAplicacion(sIdDEpa) {    
	idDepartamento = sIdDEpa; 
    db.transaction(ObtenerRegistrosRestaurante, errorCBSyncData);
}
function errorCBSyncData(err) {
    alert("Error Procesando SQL: Codigo: " + err.code + " Mensaje: "+err.message);
}
function ObtenerRegistrosRestaurante(tx) {  // url---------------	
	var SQLITE_TABLE = "SM_PUNTOS_VIAS";	
	var sSentenciaSyncData = "SELECT * FROM " + SQLITE_TABLE + " WHERE PTOVIA_INTERSECCION_ID='" + idDepartamento + "'";		
	//tx.executeSql(sSentenciaSyncData, [], RegistrosSyncData_2, errorCBSyncData);			
	var mapDiv=document.getElementById("idMap");
	var latlng = new google.maps.LatLng(lantlong.lat,lantlong.lon);		
	var options={
	    	center:latlng,
	    	zoom:16,
	    	mapTypeId: google.maps.MapTypeId.ROADMAP
	};		
	map=new google.maps.Map(mapDiv,options);	
	alert("FIN MOSTRAR MAPA ...");	
}
//MOSTRAR SOLO MAPA
function mostraSoloMapa(){
	//alert(document.URL);
	var mapDiv=document.getElementById("sFrameCasoMadre");
	var latlng = new google.maps.LatLng(lantlong.lat,lantlong.lon);		
	var options={
	    	center:latlng,
	    	zoom:16,
	    	mapTypeId: google.maps.MapTypeId.ROADMAP
	};		
	map=new google.maps.Map(mapDiv,options);	
	//alert("FIN MOSTRAR MAPA ...");	
}
//MOSTRAR MAPA SEGUN LOS DATOS DEL REGISTRO
function IniciarAplicacionBd(){
	db.transaction(ListarPuntosBd, errorCBSyncData);
}
function ListarPuntosBd(tx){
	alert('registros');
	var SQLITE_TABLE = "SM_PUNTOS_VIAS";	
	//var sSentenciaSyncData = "SELECT * FROM " + SQLITE_TABLE + " WHERE PTOVIA_INTERSECCION_ID='" + "5" + "'";		
	var sSentenciaSyncData = "SELECT * FROM " + SQLITE_TABLE;		
	tx.executeSql(sSentenciaSyncData, [], RegistrosSyncData_2, errorCBSyncData);		
}

//FIN REALIZAR CONSULTA
function RegistrosSyncData_2(tx, results) {    
	//ACA CONSULTAR A LA BDD Y CREAR EL NUMERO DE REGISTROS	
	//alert(idDepartamento);		
	var sNumeroRegistros = results.rows.length;		
	alert("NUMERO REGIS: "+sNumeroRegistros);	
	if(sNumeroRegistros != 0)
    {
		lantlong.lat = results.rows.item(0).PTOVIA_LATITUD.toString().trim();
		lantlong.lon = results.rows.item(0).PTOVIA_LONGITUD.toString().trim();
    	//var sLati = results.rows.item(0).PTOVIA_LATITUD.toString();
    	//var sLongi = results.rows.item(0).PTOVIA_LONGITUD.toString();			    	
    	var mapDiv=document.getElementById("idMap");
		var latlng = new google.maps.LatLng(lantlong.lat,lantlong.lon);		
		var options={
	    	center:latlng,
	    	zoom:16,
	    	mapTypeId: google.maps.MapTypeId.ROADMAP
		};		
		map=new google.maps.Map(mapDiv,options);		
	}
	//alert("55555555555555");
    if(sNumeroRegistros != 0)
    {	
		//alert("numero de resgistros:" + sNumeroRegistros);
		var resultado1="";
		var resultado2="";
		var resultado3="";
		var descripcionInterseccion="";
		var sTipoIcono=0;
		var sUrlIcono = "img/img_semaforos/mountains_cathc.png";
		var tipoPunto = "LIBRE";		
		//latitud longitud estaticos
		//var latit = 43.465187;
		//var longi = -80.52237200000002;
		var latit = null;
		var longi = null;
		
		//alert("0");

		for (var i=0; i<sNumeroRegistros; i++){			
			//SINCROINIZAR REGISTROS
			descripcionInterseccion = results.rows.item(i).PTOVIA_DESCRIPCION;
			latit = results.rows.item(i).PTOVIA_LATITUD;
			longi = results.rows.item(i).PTOVIA_LONGITUD;	
			sTipoIcono = results.rows.item(i).PTOVIA_ESTADOVIA_ID;
			//TIPO DE ICONO
			switch (sTipoIcono){
				case 1: 
						sUrlIcono = "img/img_semaforos/espedito.png";
					break
				case 2:
						sUrlIcono = "img/img_semaforos/congestion_moderada.png";
					break
				case 3:
						sUrlIcono = "img/img_semaforos/congestion_critica.png";
					break
				case 4:
						sUrlIcono = "img/img_semaforos/bloqueado.png";
					break				
				default:	
						sUrlIcono = "img/img_semaforos/error_icono.png";
					
			}		
			//alert("1");
			var sCordenada = new google.maps.LatLng(latit, longi);			
			var sPunto = new google.maps.Marker({
				title: tipoPunto,
				position: sCordenada,
				zIndex: 90,
				map:map,
				//infowindow.setContent("ggggggggggggggggggggg"),
				icon: 'http://google-maps-icons.googlecode.com/files/administration.png'
				//icon: 'img/img_semaforos/mountains_cathc.png'
				//icon: sUrlIcono
			});	
			//myMarkerAnterior = sPunto;
			/*
			if (myLocationMarker) {
			    //myLocationMarker.setMap(null);
			}		
			//sPunto.setPosition(sCordenada);	  
			latit = latit  + 0.001;
			longi = longi + 0.001;
			var infowindow = new google.maps.InfoWindow({
				//size: new google.maps.Size(50,50),
				content: ''
			});	
			google.maps.event.addListener(sPunto, 'click', function() {			

				//infowindow.setContent("gggggggggggg44444444444444444444" + "<br><img src='img/img_gastronomia/pickup.png' alt='Smiley face' height='22' width='22'><br>" +"444444444444444444444444444444ggggggggg"),
				//infowindow.setContent("<table width='50%'><tr><td>1</td><td>"+resultado2+"</td><td>AV. BUENOS AIRES</td><td>ZAJTA</td><td>50</td></tr><tr><td>1</td><td>RIEL</td><td>AV. BUSCH</td><td>MILANESA</td><td>70</td></tr></table>"),					
				//infowindow.open(sPunto.get('map'),sPunto);
			});*/
		}		
		idDepartamento = 0;
    }

    alert("FIN DEL MAPA");	
}
function GenerarPunto()
{
	var currentPosition = myLocationMarker.getPosition();
	var newLat = currentPosition.lat() + 0.01;
	var newLng = currentPosition.lng() + 0.01;
	//MoveMarkerAndCircle(newLat, newLng);			
	//alert("NUEVOS PUNTOS:" + newLat + " - " + newLng);
}
