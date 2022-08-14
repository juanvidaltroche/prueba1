<?php
require '../lib/smarty/Smarty.class.php';
require('../servicios/dbVersion02.php');


try {
	$sLinea = isset($_REQUEST["LINEA"]) ? $_REQUEST["LINEA"] : '' ;
	$sWhere = "";
	if ($sLinea != '' ){
		$sWhere = " WHERE NA_LINEA = '$sLinea'  ";
	}LocalInstanciarConexion();
	$sSQL = "SELECT RUTA_ID, RUTA_DESCRIPCION
			FROM mb_rutas WHERE RUTA_ID <> 0";
	$aLineas = LocalExecuteQuery($sSQL);

	$sSQL = "SELECT NA_NOMBRE, NA_LINEA, RUTA_DESCRIPCION, TIPO_HERRAMIENTA_CODIGO, NA_ESTADO, NA_DETALLE,
			CASE NA_DESDE WHEN '0000-00-00 00:00:00' THEN '' ELSE NA_DESDE END AS NA_DESDE
			FROM mb_rutas
			INNER JOIN mb_netbooks_activas ON RUTA_ID = NA_LINEA
			INNER JOIN mb_tipos_herramienta ON TIPO_HERRAMIENTA_ID = NA_BUS
			$sWhere
			ORDER BY NA_BUS";
	$aRespuestas = LocalExecuteQuery($sSQL);
	LocalCerrarConexion($aRespuestas);	
	$sNetbooks = "";
	$arr = array();
	$habilitado =  array();
	$registro =  array();
	$detalle =  array();
	foreach ($aRespuestas as $aRow) {
		$sNetbooks = $sNetbooks . '"' . $aRow["NA_NOMBRE"] . '", ';
		$arr=(array) json_decode($aRow["NA_DETALLE"] ,true); 
		
		$habilitad	= $arr['LOG_MOLINETE']['0']['LOG_MOLINETE'];
		$registr = $arr['LOG_MOLINETE']['0']['LOG_REGISTRO'];			
		$detall = "VERSION : " .  $arr['LOG_MOLINETE']['0']['LOG_VERSION'] . " | JSON :" . $arr['LOG_MOLINETE']['0']['LOG_JSON'];
		//echo $habilitad;
		//echo $registr;
		//echo $detall;		
		array_push($habilitado, $habilitad);
		array_push($registro, $registr);
		array_push($detalle, $detall);		
	}
	//$habilitado = $arr['LOG_MOLINETE']['0']['LOG_MOLINETE'];
	//$registro = $arr['LOG_MOLINETE']['0']['LOG_REGISTRO'];			
	//$detalle = "VERSION : " .  $arr['LOG_MOLINETE']['0']['LOG_VERSION'] . " | JSON :" . $arr['LOG_MOLINETE']['0']['LOG_JSON'];
				
	$sNetbooks = substr($sNetbooks,0,strlen($sNetbooks)-2);
	$nMax = sizeof($aRespuestas);
	
	$smarty = new Smarty;
	$smarty->assign("LINEA", $sLinea); 
	$smarty->assign("LINEAS", $aLineas); 
	$smarty->assign('HERRAMIENTAS', $aRespuestas);
	$smarty->assign('NETBOOKS', $sNetbooks);
	$smarty->assign('NMAX', $nMax);
	$smarty->assign('DETALLE', $detalle);
	$smarty->assign('REGISTRO', $registro);
	$smarty->display('ping.tpl');
} catch (Exception $e) {
    echo null;
}
