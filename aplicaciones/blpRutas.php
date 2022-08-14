<?php
session_start(); 
include "../constantes.php";
if (!isset($_SESSION['usr_session']))
    header("location:index.php");
?>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="../ext/ext-all.css"/>
    <script src="../ext/ext-base.js" type="text/javascript"></script>
    <script src="../ext/ext-all.js" type="text/javascript"></script>
	<link rel="stylesheet" type="text/css" href="../ext/resources/css/xtheme-blue.css"/>
    
</head>
<body>
	<div id="divMain"></div>
	<script type="text/javascript" src="blpRutas.js"></script>
</body>
</html>