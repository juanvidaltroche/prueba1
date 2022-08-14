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
	<script src="../ext/GroupSummary.js" type="text/javascript"></script>
	 
</head>
<body>
	<div id="divMain"></div>
	<script type="text/javascript" src="blpReporte1Temporal.js"></script>
</body>
</html>