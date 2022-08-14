<?php
require '../lib/smarty/Smarty.class.php';
require('../servicios/dbVersion02.php');
/*
print "<pre>";
	print_r($_POST);
print "</pre>";
die;
*/
LocalInstanciarConexion();
try {
	
	$idPersonal = isset($_REQUEST["FUNCIONARIO_ID"])? $_REQUEST["FUNCIONARIO_ID"] : "";
	//echo $idPersonal; die;
	$sSQL = "SELECT CONTRATO_ID, 
					FUNCIONARIO_ID,
					CONTRATO_FUNCIONARIO_ID, 
					CONTRATO_CODIGO_FUNCIONARIO

				FROM mb_funcionarios_contratos 
				RIGHT JOIN mb_funcionarios ON CONTRATO_FUNCIONARIO_ID=FUNCIONARIO_ID 
				WHERE FUNCIONARIO_ID='$idPersonal'
			";

	$aAnalisis = LocalExecuteQuery($sSQL);

	$smarty = new Smarty;
	$smarty->assign('ANALISIS', $aAnalisis);
	$smarty->display('rh_cnt_nuevo.tpl');

} catch (Exception $e) {
    echo null;
}
LocalCerrarConexion();