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
	$idContrato = isset($_REQUEST["CONTRATO_ID"])? $_REQUEST["CONTRATO_ID"] : 0;
	
	$sSQL = "SELECT CONTRATO_ID, 
					FUNCIONARIO_ID,
					CONTRATO_FUNCIONARIO_ID, 
					CONTRATO_CODIGO_FUNCIONARIO,
					CONTRATO_CODIGO_CONTRATO,
					CONTRATO_ITEM,
					CONTRATO_FECHA_INICIO,
					CONTRATO_FECHA_CONCLUSION,
					CONTRATO_OBSERVACIONES 
					
					FROM mb_funcionarios_contratos 
					RIGHT JOIN mb_funcionarios ON CONTRATO_FUNCIONARIO_ID=FUNCIONARIO_ID 
					WHERE CONTRATO_ID='$idContrato'
			";

	$aAnalisis = LocalExecuteQuery($sSQL);

	$smarty = new Smarty;
	$smarty->assign('ANALISIS', $aAnalisis);
	$smarty->display('rh_cnt_editar.tpl');

} catch (Exception $e) {
    echo null;
}
LocalCerrarConexion();