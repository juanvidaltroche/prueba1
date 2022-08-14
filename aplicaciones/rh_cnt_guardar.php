<?php
require '../lib/smarty/Smarty.class.php';
require('../servicios/dbVersion02.php');

/*print "<pre>";
	print_r($_POST);
print "</pre>";
die;*/

$sID = isset($_POST['CONTRATO_ID'])? $_POST['CONTRATO_ID'] : "";
$sFUNCIONARIO_ID = $_POST['FUNCIONARIO_ID'];
$sCODIGO_FUNCIONARIO = $_POST['CONTRATO_CODIGO_FUNCIONARIO'];
$sCODIGO_CONTRATO = $_POST['CONTRATO_CODIGO_CONTRATO'];
$sITEM = $_POST['CONTRATO_ITEM'];
$sFECHA_INICIO = $_POST['CONTRATO_FECHA_INICIO'];
$sFECHA_CONCLUSION = $_POST['CONTRATO_FECHA_CONCLUSION'];
$sOBSERVACIONES = $_POST['CONTRATO_OBSERVACIONES'];

LocalInstanciarConexion();
try {

	$sSQL0 = "SELECT CONTRATO_ID 
				FROM mb_funcionarios_contratos 
				WHERE CONTRATO_ID = '$sID'
			";
			
	//echo $sSQL0; die;
	
	$aRes0 = LocalExecuteQuery($sSQL0);

	if (sizeof($aRes0) > 0) {
		$sSQL = "UPDATE mb_funcionarios_contratos SET 
					CONTRATO_FUNCIONARIO_ID = '$sFUNCIONARIO_ID',
					CONTRATO_CODIGO_FUNCIONARIO = '$sCODIGO_FUNCIONARIO',
					CONTRATO_CODIGO_CONTRATO = '$sCODIGO_CONTRATO',
					CONTRATO_ITEM = '$sITEM',
					CONTRATO_FECHA_INICIO = '$sFECHA_INICIO',
					CONTRATO_FECHA_CONCLUSION = '$sFECHA_CONCLUSION',
					CONTRATO_OBSERVACIONES = '$sOBSERVACIONES'
				
				WHERE CONTRATO_ID = '$sID'
		";
		//echo $sSQL; die;
		$aDPersonales = LocalExecuteQuery($sSQL);
	}else{
		$sSQL = "INSERT INTO mb_funcionarios_contratos (
						CONTRATO_FUNCIONARIO_ID, 
						CONTRATO_CODIGO_FUNCIONARIO, 
						CONTRATO_CODIGO_CONTRATO, 
						CONTRATO_ITEM, 
						CONTRATO_FECHA_INICIO, 
						CONTRATO_FECHA_CONCLUSION,
						CONTRATO_OBSERVACIONES
						) VALUES (
						'$sFUNCIONARIO_ID', 
						'$sCODIGO_FUNCIONARIO', 
						'$sCODIGO_CONTRATO', 
						'$sITEM', 
						'$sFECHA_INICIO', 
						'$sFECHA_CONCLUSION',
						'$sOBSERVACIONES'
						)
		
		";
		//echo $sSQL; die;
		$aDPersonales = LocalExecuteQuery($sSQL);
	}
		
	LocalCerrarConexion();
	header('Location: rh_ver.php?ID='.$sFUNCIONARIO_ID);
	
} catch (Exception $e) {
    echo null;
}

//print $Todo;
?>