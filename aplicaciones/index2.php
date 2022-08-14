<?php
require '../lib/smarty/Smarty.class.php';
require('../servicios/dbVersion02.php');

LocalInstanciarConexion();
try {
	$sSQL = "SELECT 	TIPO_FUNCIONARIO_ID, 
						TIPO_FUNCIONARIO_DESCRIPCION 
						
						FROM mb_tipos_funcionario 
	";
	
	$aRespuestas = LocalExecuteQuery($sSQL);
	$smarty = new Smarty;
	$smarty->assign('TIPO', $aRespuestas);
	$smarty->display('index2.tpl');
} catch (Exception $e) {
    echo null;
}
LocalCerrarConexion();
