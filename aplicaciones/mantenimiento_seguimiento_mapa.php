<?php
//require '../lib/smarty/Smarty.class.php';
require('../servicios/dbVersion02.php');
LocalInstanciarConexion();
/*
try {
	//mantenimiento
	$naId = isset($_REQUEST["NA_ID"]) ? $_REQUEST["NA_ID"] : "";	
	$smarty = new Smarty;	
	$sqlProgramacion ="SELECT DISTINCT MT_PRG_ID, MT_PRG_HRR_ID,MT_PRG_TIPO_MANTENIMIENTO,
  										MT_PRG_OBSERVACION, MT_PRG_REGISTRO
						FROM mb_mt_programacion
						WHERE MT_PRG_ESTADO = 'ACTIVO' AND MT_PRG_HRR_ID = '$naId' ORDER BY MT_PRG_REGISTRO DESC 
						LIMIT 10 ";	
	$programacionRespuesta = LocalExecuteQuery($sqlProgramacion);
	//$smarty->assign('NMAX', $nMax);
	//INFORMACION DEL BUS
	$sqlInformacionBus ="SELECT TIPO_HERRAMIENTA_CODIGO, TIPO_HERRAMIENTA_DESCRIPCION, TIPO_HERRAMIENTA_ASIENTOS, TIPO_HERRAMIENTA_ESTADO FROM mb_tipos_herramienta
						 WHERE TIPO_HERRAMIENTA_ID = '$naId'";
	$rpsBus = LocalExecuteQuery($sqlInformacionBus);
	$smarty->assign("PROG_MANTENIMIENTO", $programacionRespuesta);
	$smarty->assign("INFO_BUS", $rpsBus);
	$smarty->assign("ID_BUS", $naId);
	//$smarty->display('mantenimiento_programar_mapa.tpl');	
} catch (Exception $e) {
    echo null;
}*/
LocalCerrarConexion();	
?>

<html lang="es">
	<head>
		<title>PROGRAMACIONES</title>				
		<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    	<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
		<script type="text/javascript" src="../lib/js/mapa.js"></script>
	</head>
	<body onload="loadScript()">
			<!--mapa-->
			<div id="map-canvas"> mapa.. </div>
			<div data-role="content"></div> 					
	</body>
</html>
