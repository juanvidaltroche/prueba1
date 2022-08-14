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
	$sSQL = "SELECT RUTA_ID, RUTA_DESCRIPCION
			FROM mb_rutas
			$sWhere	 ";
	$aRespuestas = LocalExecuteQuery($sSQL);
	$sIdRuta = "";
	foreach ($aRespuestas as $aRow) {
		$sIdRuta = $sIdRuta . '"' . $aRow["RUTA_ID"] . '", ';
	}
	$sIdRuta = substr($sIdRuta,0,strlen($sIdRuta)-2);
	$nMax = sizeof($aRespuestas);
	$smarty = new Smarty;
	$smarty->assign("LINEA", $sLinea); 
	$smarty->assign("LINEAS", $aLineas); 
	$smarty->assign('HERRAMIENTAS', $aRespuestas);
	$smarty->assign('BUSES', $sIdRuta);
	$smarty->assign('NMAX', $nMax);
	$smarty->display('buses_global.tpl');
} catch (Exception $e) {
    echo null;
}
LocalCerrarConexion();