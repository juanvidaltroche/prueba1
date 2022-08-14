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
	lat : "-16.493373731812284",
	lon : "-68.14458847045898"
};
function iniciarAplicacion(sIdDEpa) {    
	idDepartamento = sIdDEpa; 
    if (window.navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(exito, falla,options1);        
    }	
}
function exito(cordenadas) {		
	var lat = cordenadas.coords.latitude;
	var lon = cordenadas.coords.longitude;	
	lantlong.lat = "-16.493373731812284";
	lantlong.lon = "-68.14458847045898";
	consultarRestaurante();
}
function falla() {	
}
//PREGUNTAR EL NUMERO DE REGISTROS QUE EXISTE
function consultarRestaurante()
{
	db.transaction(ObtenerRegistrosRestaurante, errorCBSyncData);	
}
function errorCBSyncData(err) {
    alert("Error Procesando SQL: Codigo: " + err.code + " Mensaje: "+err.message);
}
function ObtenerRegistrosRestaurante(tx) {  // url---------------
	var SQLITE_TABLE = "SM_PUNTOS_VIAS";	
	var sSentenciaSyncData = "SELECT * FROM " + SQLITE_TABLE + " WHERE PTOVIA_INTERSECCION_ID='" + idDepartamento + "'";		
	tx.executeSql(sSentenciaSyncData, [], RegistrosSyncData_2, errorCBSyncData);	
}
//FIN REALIZAR CONSULTA
//Dibujar los puntos de forma dinamica 
//Recirrer los puntos .... mendiante un array....
//function cambio() {
function RegistrosSyncDataMapa(cadena) {    
	//alert('CADENA DE CARACTERES...');
	var sCampoLat = parent.document.getElementById('sLatitudInterseccion');
	var sCampoLon = parent.document.getElementById('sLongitudInterseccion');
	if (sCampoLat && sCampoLon) {
		if (sCampoLat.value != "" && sCampoLon.value !="") {
			lantlong.lat = sCampoLat.value.toString().trim();
			lantlong.lon = sCampoLon.value.toString().trim();			
		}		
	}			
	//ACA CONSULTAR A LA BDD Y CREAR EL NUMERO DE REGISTROS	
	var sNumeroRegistros = cadena.length;	
	var mapDiv=document.getElementById("idFrameMap");	
	var latlng = new google.maps.LatLng(lantlong.lat,lantlong.lon);		
	var options={
    	center:latlng,
    	zoom:15,
    	mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map=new google.maps.Map(mapDiv,options);		
    if(sNumeroRegistros != 0)
    {			
		var resultado1="";
		var resultado2="";
		var resultado3="";
		var descripcionInterseccion="";
		var sTipoIcono = "";
		var sUrlIcono = "../img/img_semaforos/mountains_cathc.png";
		var tipoPunto = "LIBRE";		
		var latit = null;
		var longi = null;		
		var sRegistros = cadena.split('!');		
		var sNuroReg = sRegistros.length;
		for (var i=0; i<sNuroReg; i++){
			var sRegPuntos = sRegistros[i];
			var sPuntpos = sRegPuntos.split('|');			
				sTipoIcono = sPuntpos[0];				
				latit = sPuntpos[1];
				longi = sPuntpos[2];				
				switch (sTipoIcono){
					case '1': 
							sUrlIcono = "../img/img_semaforos/espedito.png";
						break
					case '2':
							sUrlIcono = "../img/img_semaforos/congestion_moderada.png";
						break
					case '3':
							sUrlIcono = "../img/img_semaforos/congestion_critica.png";
						break
					case '4':
							sUrlIcono = "../img/img_semaforos/bloqueado.png";
						break				
					default:	
							sUrlIcono = "../img/img_semaforos/error_icono.png";						
				}				
				var sCordenada = new google.maps.LatLng(latit, longi);				
				var sPunto = new google.maps.Marker({
					title: tipoPunto,
					position: sCordenada,					
					map:map,					
					icon: sUrlIcono
				});	
				sPunto.setPosition(sCordenada);	  			
		}
    }
}

