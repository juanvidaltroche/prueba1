<?php
require '../lib/smarty/Smarty.class.php';
require('../servicios/dbVersion02.php');
try {
	$sLinea = isset($_REQUEST["LINEA"]) ? $_REQUEST["LINEA"] : '' ;
	$sWhere = "";
	if (isset($sLinea) ){
		$sWhere = " WHERE NA_LINEA = '$sLinea' ";
	}LocalInstanciarConexion();
	$sSQL = "SELECT RUTA_ID, RUTA_DESCRIPCION
			FROM mb_rutas WHERE RUTA_ID <> 0";
	$aLineas = LocalExecuteQuery($sSQL);

	$sSQL = "SELECT NA_NOMBRE, NA_LINEA, RUTA_DESCRIPCION, TIPO_HERRAMIENTA_CODIGO, NA_ESTADO,
			CASE NA_DESDE WHEN '0000-00-00 00:00:00' THEN '' ELSE NA_DESDE END AS NA_DESDE
			FROM mb_rutas
			INNER JOIN mb_netbooks_activas ON RUTA_ID = NA_LINEA
			INNER JOIN mb_tipos_herramienta ON TIPO_HERRAMIENTA_ID = NA_BUS
			$sWhere
			ORDER BY NA_BUS";
	$aRespuestas = LocalExecuteQuery($sSQL);
	//mantenimiento
	$sqlProgramacion ="SELECT NA_NOMBRE, NA_LINEA, RUTA_DESCRIPCION, TIPO_HERRAMIENTA_CODIGO, NA_ESTADO,
			CASE NA_DESDE WHEN '0000-00-00 00:00:00' THEN '' ELSE NA_DESDE END AS NA_DESDE
			FROM mb_rutas
			INNER JOIN mb_netbooks_activas ON RUTA_ID = NA_LINEA
			INNER JOIN mb_tipos_herramienta ON TIPO_HERRAMIENTA_ID = NA_BUS
			$sWhere
			ORDER BY NA_BUS";
	$programacionRespuesta = LocalExecuteQuery($sqlProgramacion);
	
	LocalCerrarConexion();	
	$sNetbooks = "";
	foreach ($aRespuestas as $aRow) {
		$sNetbooks = $sNetbooks . '"' . $aRow["NA_NOMBRE"] . '", ';
	}
	$sNetbooks = substr($sNetbooks,0,strlen($sNetbooks)-2);
	$nMax = sizeof($aRespuestas);
	
	$smarty = new Smarty;
	$smarty->assign("LINEAS", $aLineas); 
	$smarty->assign('HERRAMIENTAS', $aRespuestas);
	$smarty->assign('NETBOOKS', $sNetbooks);
	$smarty->assign('NMAX', $nMax);
	$smarty->display('mantenimiento_programar.tpl');
} catch (Exception $e) {
    echo null;
}
