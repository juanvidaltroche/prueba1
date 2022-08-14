<?php
require '../lib/smarty/Smarty.class.php';
require('../servicios/dbVersion02.php');

print "<pre>";
	print_r($_POST);
print "</pre>";
die;

$sID = $_POST['FUNCIONARIO_ID'];
$sFECHA = $_POST['MATRIZ_FECHA'];
$sCORRESPONDE = $_POST['MATRIZ_CORRESPONDE'];
$sRESUMEN = $_POST['MATRIZ_RESUMEN'];
$sRESULTADOS = $_POST['MATRIZ_RESULTADOS'];
$sOBSERVACIONES = $_POST['MATRIZ_OBSERVACIONES'];

LocalInstanciarConexion();
try {

	$sSQL0 = "SELECT MATRIZ_FUNCIONARIO_ID 
				FROM mb_funcionarios_matriz 
				WHERE MATRIZ_FUNCIONARIO_ID = '$sID'
			";
	//echo $sSQL0; die;
	$aRes0 = LocalExecuteQuery($sSQL0);

	if (sizeof($aRes0) > 0) {
		$sSQL = "UPDATE mb_funcionarios_matriz SET 
					MATRIZ_FECHA = '$sFECHA',
					MATRIZ_CORRESPONDE = '$sCORRESPONDE',
					MATRIZ_RESUMEN = '$sRESUMEN',
					MATRIZ_RESULTADOS = '$sRESULTADOS',
					MATRIZ_OBSERVACIONES = '$sOBSERVACIONES'
				WHERE MATRIZ_FUNCIONARIO_ID = '$sID'
		";
		//echo $sSQL; die;
		$aDPersonales = LocalExecuteQuery($sSQL);
	}else{
		$sSQL = "INSERT INTO mb_funcionarios_matriz (
					MATRIZ_FUNCIONARIO_ID, 
					MATRIZ_FECHA, 
					MATRIZ_CORRESPONDE, 
					MATRIZ_RESUMEN, 
					MATRIZ_RESULTADOS, 
					MATRIZ_OBSERVACIONES
				) VALUES (
					'$sID', 
					'$sFECHA', 
					'$sCORRESPONDE', 
					'$sRESUMEN', 
					'$sRESULTADOS', 
					'$sOBSERVACIONES'
				)
		";
		//echo $sSQL; die;
		$aDPersonales = LocalExecuteQuery($sSQL);
	}
		
	LocalCerrarConexion();
	header('Location: rh_ver_matriz.php?ID='.$sID);
	
} catch (Exception $e) {
    echo null;
}

//print $Todo;
?>