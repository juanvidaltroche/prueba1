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
	<script src="../ext/GridPrinterRutaBus.js" type="text/javascript"></script>
	<script src="../ext/ext-lang-es.js" type="text/javascript"></script>	
<style type=text/css>
		.x-grid3-cell-inner, .x-grid3-hd-inner {
		overflow:hidden;
		padding:3px 3px 3px 5px;
		white-space:normal;
		}
	
		.x-grid3-row-over .x-grid3-cell-inner {
		font-weight: bold;
		}
		.multilineColumn .x-grid3-cell-inner {
		white-space:  normal !important;
		}
		
		#panel{
			margin:20px auto;
			width:650px
		}
		.height{ width:22px;height:22px; visibility:hidden }
		.red{ background:#FFB0C4 }
		.green{ background:#c6efce }
		.gray{ background:#e3f5d9 }
		.blue{ background:#edebeb }
	</style>
     <style type="text/css">
<!--
#d3 {
	float: left;
	height: 50%;
	width: 50%;
}
#d2 {
	float: right;
	height: 100%;
	width: 50%;
}
#d1 {
	float: left;
	height: 50%;
	width: 50%;
}
-->
</style>
</head>
<body>
	<div id="divMain"></div>
	<script type = "text/javascript" src="blpRutasBuses.js"></script>

</body>
</html>