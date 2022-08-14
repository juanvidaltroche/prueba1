<?php
session_start();
if (!isset($_SESSION['usr_session']))
    header("location:index.php");
?>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"><style type="text/css">
<!--
*{text-indent:0px; margin:0px; padding:0px; border:0px;}


html, body {
	margin:0; 
	padding:0; 
	width:100%;            
	height:100%;                
	overflow:hidden;
	font-family:Andalus, Arial, Helvetica, sans-serif; 
	font-size:1.1em;
}

#pantalla {
	position:absolute; 
	width:100%;          
	height:100%;
	top:0;
	left:0;
	z-index:1;
}
-->
</style></head>
<body bgcolor="#4C87BF">

</body>

</html>