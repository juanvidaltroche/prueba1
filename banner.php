<html>
<head>

<style type="text/css">
<!--
#apDiv1 a {
	font-family: "Courier New", Courier, monospace;
	color: #FFF;
	font-weight: bold;
}
a {
	font-family: Arial, Helvetica, sans-serif;
	font-size: 14px;
}
body,td,th {
	font-weight: bold;
}
a:link {
	text-decoration: none;
}
a:visited {
	text-decoration: none;
}
a:hover {
	text-decoration: none;
}
a:active {
	text-decoration: none;
}
-->
</style>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"></head>
<body background="imagenes/banner.jpg">
<div id="apDiv1" align="right"><a href="cerrarSesion.php" target="_top">SALIR</a></div>
<div id="apDiv1" align="right"> <font color="white">
<?php 
session_start(); 
$sRol = isset($_SESSION["tipo_funcionario_session"]) ? $_SESSION["tipo_funcionario_session"] : "___";
$sUsr = isset($_SESSION["usr_session"]) ? $_SESSION["usr_session"] : "___";
echo "Tipo_Funcionario: " . $sRol . " | Usuario: " . $sUsr;
?> 
</font>
</div>
</body >
</html>