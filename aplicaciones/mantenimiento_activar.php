<?php
require '../lib/smarty/Smarty.class.php';
require('../servicios/dbVersion02.php');
/*
print "<pre>";
	print_r($_POST);
print "</pre>";
die;*/

$sID = $_POST['BUS_ID']; 

LocalInstanciarConexion();
try {
	$sSQL = "	UPDATE mb_netbooks_activas SET 
					NA_ESTADO = 'ACTIVO'
				WHERE NA_BUS = '$sID'
			";
	$RespSQL = LocalExecuteQuery($sSQL);
	
	$sSQLReg = "	SELECT NA_BUS, NA_LINEA FROM mb_netbooks_activas 
				WHERE NA_BUS = '$sID'
			";
			
	$RespSQLReg = LocalExecuteQuery($sSQLReg);
	$sLinea = $RespSQLReg[0]["NA_LINEA"];
	
	LocalCerrarConexion();
	header('Location: mantenimiento.php?LINEA='.$sLinea);

} catch (Exception $e) {
    echo null;
}
