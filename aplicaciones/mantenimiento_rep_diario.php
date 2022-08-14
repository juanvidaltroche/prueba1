<?php
require '../lib/smarty/Smarty.class.php';
require('../servicios/dbVersion02.php');
LocalInstanciarConexion();
//print_r($_POST); die;

try {
	$naId = isset($_REQUEST["NA_ID"]) ? $_REQUEST["NA_ID"] : "";
	$BusId = isset($_REQUEST["BUS_ID"]) ? $_REQUEST["BUS_ID"] : "";
	$sqlInformacionBus = "	SELECT 	TIPO_HERRAMIENTA_ID,
									TIPO_HERRAMIENTA_CODIGO, 
									TIPO_HERRAMIENTA_DESCRIPCION, 
									TIPO_HERRAMIENTA_ASIENTOS, 
									TIPO_HERRAMIENTA_ESTADO 
							FROM mb_tipos_herramienta 
							WHERE TIPO_HERRAMIENTA_ID = '$BusId'";
	
	//echo $sqlInformacionBus; die;
	$rpsBus = LocalExecuteQuery($sqlInformacionBus);
	$naId = isset($_POST["NA_ID"]) ? $_POST["NA_ID"] : "";
	$smarty = new Smarty;
	$smarty->assign('NA_ID', $naId);
	$smarty->assign("ID_BUS", $naId);
	$smarty->assign("INFO_BUS", $rpsBus);
	$smarty->display('mantenimiento_rep_diario.tpl');
} catch (Exception $e) {
    echo null;
}

LocalCerrarConexion();
