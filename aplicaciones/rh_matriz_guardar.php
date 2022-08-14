<?php
require '../lib/smarty/Smarty.class.php';
require('../servicios/dbVersion02.php');

/*print "<pre>";
	print_r($_POST);
print "</pre>";
die;*/

/*
Array
(
    [MATRIZ_FECHA] => 
    [MATRIZ_CORRESPONDE] => 
    [MATRIZ_RESUMEN] => 
    [MATRIZ_RESULTADOS] => -1
    [MATRIZ_OBSERVACIONES] => 
    [FUNCIONARIO_ID] => 200
)*/


/*Array
(
    [MATRIZ_ID] => 1
    [FUNCIONARIO_ID] => 200
    [MATRIZ_FECHA] => 2014-04-30 00:00:00
    [MATRIZ_CORRESPONDE] => WQWE
    [MATRIZ_RESUMEN] => SASDASF
    [MATRIZ_RESULTADOS] => REGULAR
    [MATRIZ_OBSERVACIONES] => FSDFSDF
)*/



$sID = isset($_POST['MATRIZ_ID'])? $_POST['MATRIZ_ID'] : "";
$sFUNCIONARIO_ID = $_POST['FUNCIONARIO_ID'];
$sFECHA = $_POST['MATRIZ_FECHA'];
$sCORRESPONDE = $_POST['MATRIZ_CORRESPONDE'];
$sRESUMEN = $_POST['MATRIZ_RESUMEN'];
$sRESULTADOS = $_POST['MATRIZ_RESULTADOS'];
$sOBSERVACIONES = $_POST['MATRIZ_OBSERVACIONES'];

LocalInstanciarConexion();
try {

	$sSQL0 = "SELECT MATRIZ_ID 
				FROM mb_funcionarios_matriz 
				WHERE MATRIZ_ID = '$sID'
			";
			
	//echo $sSQL0; die;
	
	$aRes0 = LocalExecuteQuery($sSQL0);

	if (sizeof($aRes0) > 0) {
		$sSQL = "UPDATE mb_funcionarios_matriz SET 
					MATRIZ_FUNCIONARIO_ID = '$sFUNCIONARIO_ID',
					MATRIZ_FECHA = '$sFECHA',
					MATRIZ_CORRESPONDE = '$sCORRESPONDE',
					MATRIZ_RESUMEN = '$sRESUMEN',
					MATRIZ_RESULTADOS = '$sRESULTADOS',
					MATRIZ_OBSERVACIONES = '$sOBSERVACIONES'
				WHERE MATRIZ_ID = '$sID'
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
						'$sFUNCIONARIO_ID', 
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
	header('Location: rh_ver_matriz.php?ID='.$sFUNCIONARIO_ID);
	
} catch (Exception $e) {
    echo null;
}

//print $Todo;
?>