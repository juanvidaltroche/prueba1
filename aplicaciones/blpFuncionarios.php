<?php
session_start(); 
include "../constantes.php";
if (!isset($_SESSION['usr_session']) or $_SESSION["tipo"]== '1' )
    header("location:accesoRestringido.php");
?>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="../ext/ext-all.css"/>
    <link rel="stylesheet" type="text/css" href="../ext/resources/css/xtheme-blue.css" />
		
    <script src="../ext/ext-base.js" type="text/javascript"></script>
    <script src="../ext/ext-all.js" type="text/javascript"></script>    
    
</head>
<body>
	<div id="divMain"></div>
	<script type="text/javascript" src="blpFuncionario.js"></script>

</body>
</html>