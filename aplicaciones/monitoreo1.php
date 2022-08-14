<?php
require '../lib/smarty/Smarty.class.php';
require('../servicios/dbVersion02.php');

LocalInstanciarConexion();
try {
    $sLinea = isset($_REQUEST["LINEA"])? $_REQUEST["LINEA"] : null;
	$sWhere = "";
	if (isset($sLinea) ){
		$sWhere = " WHERE NA_LINEA = '$sLinea' ";
	}
	$sSQL = "SELECT RUTA_ID, RUTA_DESCRIPCION
			FROM mb_rutas";
	$aLineas = LocalExecuteQuery($sSQL);
	$sSQL = "SELECT NA_NOMBRE, NA_LINEA, RUTA_DESCRIPCION, TIPO_HERRAMIENTA_CODIGO, TIPO_HERRAMIENTA_ID, NA_ESTADO
			FROM mb_rutas
			INNER JOIN mb_netbooks_activas ON RUTA_ID = NA_LINEA
			INNER JOIN mb_tipos_herramienta ON TIPO_HERRAMIENTA_ID = NA_BUS
			$sWhere
			ORDER BY NA_ID ";
	$aRespuestas = LocalExecuteQuery($sSQL);
	$sIdBuses = "";
	foreach ($aRespuestas as $aRow) {
		$sIdBuses = $sIdBuses . '"' . $aRow["TIPO_HERRAMIENTA_ID"] . '", ';
	}
	$sIdBuses = substr($sIdBuses,0,strlen($sIdBuses)-2);
	$nMax = sizeof($aRespuestas);
	$smarty = new Smarty;
	$smarty->assign("LINEAS", $aLineas); 
	$smarty->assign('HERRAMIENTAS', $aRespuestas);
	$smarty->assign('BUSES', $sIdBuses);
	$smarty->assign('NMAX', $nMax);
	$smarty->display('buses.tpl');
} catch (Exception $e) {
    echo null;
}
LocalCerrarConexion();