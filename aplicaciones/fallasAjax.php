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
	$sFechaFalla = isset($_REQUEST["FECHA_FALLA"]) ? $_REQUEST["FECHA_FALLA"] : '';
	$sFechaFalla = date("Y-m-d", strtotime($sFechaFalla));	
	$sTipoFalla = isset($_REQUEST["TIPO_FALLA"]) ? $_REQUEST["TIPO_FALLA"] : '';
	$sObsFalla = isset($_REQUEST["OBS_FALLA"]) ? $_REQUEST["OBS_FALLA"] : '';
	$sqlAltaProg = "INSERT INTO mb_mt_fallas (
						MT_FALLA_HRR_ID, 
						MT_FALLA_FECHA_ID, 
						MT_FALLA_TIPO_FALLA, 
						MT_FALLA_DESCRIPCION) VALUES (
						'$sId', 
						'$sFechaFalla',
						'$sTipoFalla', 
						'$sObsFalla'
						)";
	$respuestaCaso2 = LocalExecuteQuery($sqlAltaProg);
	
	header('Location: mantenimiento_rep_fallas.php?BUS_ID='.$sId);
} catch (Exception $e) {
}
LocalCerrarConexion();