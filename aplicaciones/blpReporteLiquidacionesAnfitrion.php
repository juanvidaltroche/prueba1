<?php
session_start(); 
include "../constantes.php";
//if (!isset($_SESSION['usr_session']))
  //  header("location:index.php");
?>
<html>
<head>
   <link rel="stylesheet" type="text/css" href="../ext/ext-all.css"/>
    <link rel="stylesheet" type="text/css" href="../ext/resources/css/xtheme-blue.css" />
    <script src="../ext/ext-base.js" type="text/javascript"></script>
    <script src="../ext/ext-all.js" type="text/javascript"></script>>
	<script src="../ext/GroupSummary.js" type="text/javascript"></script>
	<script src="../ext/GridPrinter.js" type="text/javascript"></script>
	<script src="../ext/export/Exporter-all.js" type="text/javascript"></script>
	
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
	</style> 
</head>
<body>
	<div id="divMain"></div>
	<script type="text/javascript" src="blpReporteLiquidacionesAnfitrion.js"></script>
</body>
</html>