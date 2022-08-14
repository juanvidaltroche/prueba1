<?php
session_start(); 
include "../constantes.php";
if (!isset($_SESSION['usr_session']))
    header("location:index.php");
?>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="../ext/resources/css/ext-all.css"/>
    <link rel="stylesheet" type="text/css" href="../ext/ext-all.css"/>
    <link rel="stylesheet" type="text/css" href="../ext/resources/css/xtheme-blue.css" />
    <script src="../ext/ext-base.js" type="text/javascript"></script>
    <script src="../ext/ext-all.js" type="text/javascript"></script>
	<script src="../ext/GroupSummary.js" type="text/javascript"></script>
	<script type="text/javascript" src="../reporte/exportador.js"></script>
	<style type=text/css>
		.x-grid3-col.rojo
		{
			background-color: #FC9CA7;
		}
		.x-grid3-col.amarillo
		{
			background-color: #ffc;
		}
		.x-grid3-col.verde
		{
			background-color: #94F7C0;
		}
		.x-grid3-col.morado
		{
			background-color: #C6C4FF;
		}
		.x-grid3-col.azul
		{
			background-color: #52E4FF;
		}
	</style>
</head>
<body>	    
	<script type="text/javascript" src="blpReporte.js"></script>
</body>
</html>