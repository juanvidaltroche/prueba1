<?php
require '../lib/smarty/Smarty.class.php';
require('../servicios/dbVersion02.php');

/*print "<pre>";
	print_r($_POST);
print "</pre>";
die;*/

$sID = $_POST['FUNCIONARIO_ID'];
$sFECHA_NAC = $_POST['DATOS_FECHA_NAC'];
$sDIRECCION = $_POST['DATOS_DIRECCION'];
$sTELEFONO = $_POST['DATOS_TELEFONO'];
$sMOVIL = $_POST['DATOS_MOVIL'];
$sEMAIL = $_POST['DATOS_EMAIL'];

LocalInstanciarConexion();
try {

	$sSQL0 = "SELECT DATOS_FUNCIONARIO_ID 
				FROM mb_funcionarios_datos 
				WHERE DATOS_FUNCIONARIO_ID = '$sID'
			";
	
	$aRes0 = LocalExecuteQuery($sSQL0);

	if (sizeof($aRes0) > 0) {
		$sSQL = "UPDATE mb_funcionarios_datos SET 
					DATOS_FECHA_NAC = '$sFECHA_NAC',
					DATOS_DIRECCION = '$sDIRECCION',
					DATOS_TELEFONO = '$sTELEFONO',
					DATOS_MOVIL = '$sMOVIL',
					DATOS_EMAIL = '$sEMAIL'
				
				WHERE DATOS_FUNCIONARIO_ID = '$sID'
		";
		//echo $sSQL; die;
		$aDPersonales = LocalExecuteQuery($sSQL);
	}else{
		$sSQL = "INSERT INTO mb_funcionarios_datos 
					(DATOS_FUNCIONARIO_ID, DATOS_FECHA_NAC, DATOS_DIRECCION, DATOS_TELEFONO, DATOS_MOVIL, DATOS_EMAIL) VALUES 
					('$sID', '$sFECHA_NAC', '$sDIRECCION', '$sTELEFONO', '$sMOVIL', '$sEMAIL')
		
		";
		//echo $sSQL; die;
		$aDPersonales = LocalExecuteQuery($sSQL);
	}
		
	LocalCerrarConexion();
	header('Location: rh_ver.php?ID='.$sID);
	
} catch (Exception $e) {
    echo null;
}

//print $Todo;
?>