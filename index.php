<?php
session_start();
include "constantes.php";
if (!isset($_SESSION["usr_session"])) {
    header("Location: ".RAIZ."autenticacion/login.php");   
}
?>
<html>
<head>
</head>
<frameset name="Lfs" rows="7%,*" border="2">    
	<frame  name="banner" id="banner" src="banner.php" scrolling="no" >
    </frame>
    <frameset cols="10%,*">
	  <frame src="menu.php" name="menu" id="menu">
	  <frame src="cuerpo.php" name="cuerpo" id="cuerpo"> 	  
	</frameset> 
</frameset><noframes></noframes>
</html>