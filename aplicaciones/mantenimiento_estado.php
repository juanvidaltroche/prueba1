<?php
require '../lib/smarty/Smarty.class.php';
require('../servicios/dbVersion02.php');

/*print "<pre>";
	print_r($_POST);
print "</pre>";
die;*/

$sID = $_POST['ID_BUS']; 
$sTipo = $_POST['MT_PRG_TIPO_ID']; 

if($sTipo=='CORRECTIVO'){
	$sEstado='MC';
}elseif($sTipo=='PREVENTIVO'){
	$sEstado='MP';
}else{
	$sEstado='TANQUEO';
}

LocalInstanciarConexion();
try {
	$sSQL = "UPDATE mb_netbooks_activas SET 
				NA_ESTADO = '$sEstado' 
			WHERE NA_BUS = '$sID'
			";

	$aDPersonales = LocalExecuteQuery($sSQL);
	
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

?>