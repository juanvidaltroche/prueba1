<?php
require '../lib/smarty/Smarty.class.php';
require('../servicios/dbVersion02.php');

/*print "<pre>";
	print_r($_POST);
print "</pre>";
die;*/

LocalInstanciarConexion();
try {
	$sId = isset($_REQUEST["ID_BUS"]) ? $_REQUEST["ID_BUS"] : '' ;
	$sFechaProg = isset($_REQUEST["FECHA_PROGRAMACION"]) ? $_REQUEST["FECHA_PROGRAMACION"] : '' ;
	$sFechaProg = date("Y-m-d", strtotime($sFechaProg));	
	$sTipoMantenimientoProg = isset($_REQUEST["TIPO_MANTENIMIENTO"]) ? $_REQUEST["TIPO_MANTENIMIENTO"] : '' ;
	$sObsMantenimientoProg = isset($_REQUEST["OBS_MANTENIMIENTO"]) ? $_REQUEST["OBS_MANTENIMIENTO"] : '' ;
	$sqlAltaProg = "INSERT INTO mb_mt_programacion (
						MT_PRG_HRR_ID, 
						MT_PRG_TIPO_MANTENIMIENTO, 
						MT_PRG_OBSERVACION, 
						MT_PRG_REGISTRO) VALUES (
						'$sId', 
						'$sTipoMantenimientoProg', 
						'$sObsMantenimientoProg',
						'$sFechaProg')";
						
	$respuestaCaso2 = LocalExecuteQuery($sqlAltaProg);
	
		header('Location: mantenimiento_programar.php?BUS_ID='.$sId);
} catch (Exception $e) {
}
LocalCerrarConexion();