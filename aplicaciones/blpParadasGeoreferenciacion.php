<?php
session_start(); 
include "../constantes.php";
if (!isset($_SESSION['usr_session']))
    header("location:index.php");
?>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="../ext/ext-all.css"/>
        <link rel="stylesheet" type="text/css" href="../ext/resources/css/xtheme-blue.css" />
    <script src="../ext/ext-base.js" type="text/javascript"></script>
    <script src="../ext/ext-all.js" type="text/javascript"></script>
	
	
	
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <title>OpenLayers: Sundials on a Spherical Mercator Map</title>
   
    
    <link rel="stylesheet" href="../Librerias/OpenLayers-2.12/theme/default/style.css" type="text/css">
    <link rel="stylesheet" href="../Librerias/OpenLayers-2.12/style.css" type="text/css">
    <script src="../Librerias/OpenLayers-2.12/lib/OpenLayers.js"></script>

 <style type="text/css">
        html, body {
            height: 100%;
        }
        #map {
            width: 100%;
            height: 100%;
            border: 1px solid black;
        }
        .olPopup p { margin:0px; font-size: .9em;}
        .olPopup h2 { font-size:1.2em; }
    </style>
    
    <script type="text/javascript" src="../aplicaciones/blpParadasGeoreferenciacion.js"></script>
</head>
<body>
	<script type="text/javascript">
	  window.GenerandoPuntos = function (jsIdRuta) {
            actualizarPuntos(jsIdRuta);
        };
	  
	</script>
	  <div id="map" class="smallmap"></div>
</body>
</html>
