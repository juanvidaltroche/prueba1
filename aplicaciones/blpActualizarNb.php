<?php
require '../lib/smarty/Smarty.class.php';
require('../servicios/dbVersion02.php');


try {
	LocalInstanciarConexion();
	$sSQL = "SELECT DISTINCT TRX_NRO_TARJETA
			FROM `mb_trxs`
			WHERE TRX_NRO_TARJETA <> ''";
	$aNetbooks = LocalExecuteQuery($sSQL);
	foreach ($aNetbooks as $aRow) {
		$sNetbook =  $aRow["TRX_NRO_TARJETA"];
		$sSQL = "SELECT TRX_ID, TRX_RUTA_ID, TRX_TIPO_HERRAMIENTA_ID, TRX_NRO_TARJETA
				FROM mb_trxs
				WHERE TRX_NRO_TARJETA = '$sNetbook'
				ORDER BY TRX_ID DESC LIMIT 1 ";
		$aRespuestas = LocalExecuteQuery($sSQL);	

		foreach ($aRespuestas as $aRow) {
			$sLineaId = $aRow["TRX_RUTA_ID"] ;		
			$sBusId = $aRow["TRX_TIPO_HERRAMIENTA_ID"] ;				
		}	
		$sSQL = "UPDATE mb_netbooks_activas SET NA_BUS='$sBusId' ,NA_LINEA='$sLineaId'  WHERE NA_NOMBRE = '$sNetbook'";
		$aRespuestas = LocalExecuteQuery($sSQL);	
	}
	LocalCerrarConexion();		
	}
 catch (Exception $e) {
    echo null;
}
