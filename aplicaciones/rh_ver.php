<?php
require '../lib/smarty/Smarty.class.php';
require('../servicios/dbVersion02.php');

/*
print "<pre>";
	print_r($_POST);
print "</pre>";
die;*/

LocalInstanciarConexion();
try {
	$idPersonal = isset($_REQUEST["ID"])? $_REQUEST["ID"] : $_POST['PRS_ID'];
	//echo $idPersonal; die;
	$sSQL = "SELECT 	FUNCIONARIO_ID, 
						FUNCIONARIO_CI, 
						FUNCIONARIO_NOMBRES, 
						FUNCIONARIO_PATERNO, 
						FUNCIONARIO_MATERNO, 
						DATOS_BIOMETRICO,
						DATOS_FECHA_NAC,
						DATOS_DIRECCION,
						DATOS_TELEFONO,
						DATOS_MOVIL,
						DATOS_EMAIL,
						USUARIO_CODIGO,
						USUARIO_FUNCIONARIO_ID, 
						TIPO_FUNCIONARIO_ID,
						TIPO_FUNCIONARIO_DESCRIPCION
									
					FROM mb_funcionarios 
					LEFT JOIN mb_funcionarios_datos ON DATOS_FUNCIONARIO_ID=FUNCIONARIO_ID 
					INNER JOIN sa_usuarios ON USUARIO_FUNCIONARIO_ID=FUNCIONARIO_ID
					INNER JOIN sa_usuario_tipos_funcionario ON UTF_USUARIO_ID=USUARIO_ID 
					INNER JOIN mb_tipos_funcionario ON TIPO_FUNCIONARIO_ID=UTF_TIPO_FUNCIONARIO_ID

					WHERE FUNCIONARIO_ID = '$idPersonal'
			";
			
	$aPersonal = LocalExecuteQuery($sSQL);
	
	$sSQL2 = "SELECT 	CONTRATO_ID, 
						CONTRATO_FUNCIONARIO_ID, 
						CONTRATO_CODIGO_FUNCIONARIO, 
						CONTRATO_CODIGO_CONTRATO, 
						CONTRATO_ITEM, 
						CONTRATO_FECHA_INICIO, 
						CONTRATO_FECHA_CONCLUSION, 
						CONTRATO_OBSERVACIONES
	
						FROM mb_funcionarios_contratos
						WHERE CONTRATO_FUNCIONARIO_ID = '$idPersonal' 
			";
	$aCargo = LocalExecuteQuery($sSQL2);
	
	$smarty = new Smarty;
	$smarty->assign('ANALISIS', $aPersonal);
	$smarty->assign('CARGO', $aCargo);
	$smarty->display('rh_ver.tpl');

} catch (Exception $e) {
    echo null;
}
LocalCerrarConexion();