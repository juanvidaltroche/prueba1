<?php
require '../lib/smarty/Smarty.class.php';
require('../servicios/dbVersion02.php');

/*print "<pre>";
	print_r($_POST);
print "</pre>";
die;*/

LocalInstanciarConexion();
try {
	
	$idPersonal = isset($_REQUEST["FUNCIONARIO_ID"])? $_REQUEST["FUNCIONARIO_ID"] : "";
	//echo $idPersonal; die;
	
	$sSQL = "SELECT MATRIZ_ID, 
				FUNCIONARIO_ID,
				MATRIZ_FUNCIONARIO_ID

			FROM mb_funcionarios_matriz 
			RIGHT JOIN mb_funcionarios ON MATRIZ_FUNCIONARIO_ID=FUNCIONARIO_ID 
			WHERE FUNCIONARIO_ID='$idPersonal'
		";
	
	$aAnalisis = LocalExecuteQuery($sSQL);

	$smarty = new Smarty;
	$smarty->assign('ANALISIS', $aAnalisis);
	$smarty->display('rh_matriz_nuevo.tpl');

} catch (Exception $e) {
    echo null;
}
LocalCerrarConexion();