Ext.namespace("acl");


        var map = null;



        var vectorLayer;
        var vectorLineas;
		
		


        function removeAddLayer(arrayPuntosGeometricos, arrayPuntosGeometricosOSM) {
            if (vectorLayer) {
                map.removeLayer(vectorLayer);
                map.removeLayer(vectorLineas);
            }
            vectorLayer = new OpenLayers.Layer.Vector("CONTENEDORES");
            vectorLineas = new OpenLayers.Layer.Vector("LINEAS");
            vectorLayer.addFeatures(arrayPuntosGeometricos);
            map.addLayer(vectorLayer);
            

            //draw las lineas entre los puntos incio
            var jsFeature01 = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.LineString(arrayPuntosGeometricosOSM));
            vectorLineas.addFeatures([jsFeature01]);
            map.addLayers([vectorLineas]);
            //draw las lineas entre los puntos fin
        }//fin funcion removeAddLayer

		

        function actualizarPuntos(jsIdRuta) {
            Ext.Ajax.request({
			url: "../servicios/blpParadasDeLaRutaAjax.php",
			method: "POST",
			params: {"option": "LST", "pageSize": 30, "limit": 20, "start": 0,idRuta:jsIdRuta},//dav01 buss
                success: function (result, request) {

                    //variables globales inicio
                    var jsVectorPuntos = new Array();
                    var jsContador = 0;

                    //variables globales fin
					console.log(result);
					var jsPuntos = Ext.decode(result.responseText);
                    var arrayPuntosGeometricos = new Array();
                    var arrayPuntosGeometricosOSM = new Array();
                    var jsUnPunto;
                    var jsRecorrer;
					var jsCantidadPuntos = jsPuntos.resultRoot.length;
                    for (jsRecorrer = 0; jsRecorrer < jsCantidadPuntos; jsRecorrer++) {
                        var jsLatitud = jsPuntos.resultRoot[jsRecorrer]["PARADA_LATITUD"];
						//console.log(jsLatitud);
                        var jsLongitud = jsPuntos.resultRoot[jsRecorrer]["PARADA_LONGITUD"];
                        //console.log("jsLongitud" + jsLongitud);

                        var puntoTransformado = new OpenLayers.Geometry.Point(jsLongitud, jsLatitud)
                        var jsFormatoOriginalPunto = puntoTransformado.transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));

                        
                        arrayPuntosGeometricosOSM.push(jsFormatoOriginalPunto);
						
						 var jsTipoImagen;
                        switch(jsRecorrer)
						{
						case 0:
							jsTipoImagen = '../imagenes/puntoInicio.png';
							console.log("inicio");
							break;
						case jsCantidadPuntos - 1:
							jsTipoImagen = '../imagenes/puntoFin.png';
							console.log("fin");
							break;
						default:
							jsTipoImagen = '../imagenes/puntoMedio.png';
							console.log("medio");
							break;
						}
						
						var jsCoordenada = new OpenLayers.Feature.Vector(
                             new OpenLayers.Geometry.Point(jsFormatoOriginalPunto.x, jsFormatoOriginalPunto.y),
                             { some: 'data' },
                             { externalGraphic: jsTipoImagen, graphicHeight: 35, graphicWidth: 30 });


                        //var jsCoordenada = new OpenLayers.LonLat(jsLongitud, jsLatitud).transform(fromProjection, toProjection);
                        

                        arrayPuntosGeometricos.push(jsCoordenada);
                        //console.log(arrayPuntosGeometricos);
                    }
                    try {
                        var jsLayer01 = map.getLayersByName(layerName);
                        //console.log();

                    } catch (e) {

                    }
                    //a) eliminando el anterior layer generado previamente fin
                    removeAddLayer(arrayPuntosGeometricos, arrayPuntosGeometricosOSM);
                         },
                    failure: function (result, request) {
                        Ext.MessageBox.alert("Alert", "Error de Conexión");
                    }
                });
        }






acl.application = {
  init:function(){
			var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
            var toProjection = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
            map = new OpenLayers.Map("map");
            var mapnik = new OpenLayers.Layer.OSM();
            var position = new OpenLayers.LonLat(-68.133, -16.495).transform(fromProjection, toProjection);
            var zoom = 14;

            map.addLayer(mapnik);
            map.setCenter(position, zoom);
            map.addControl(new OpenLayers.Control.LayerSwitcher());
			//GenerandoPuntos();


  }
}

Ext.onReady(acl.application.init, acl.application);
