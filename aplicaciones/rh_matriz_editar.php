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
	$idMatriz = isset($_REQUEST["MATRIZ_ID"])? $_REQUEST["MATRIZ_ID"] : 0;
	
	$sSQL = "SELECT MATRIZ_ID, 
					FUNCIONARIO_ID,
					MATRIZ_FUNCIONARIO_ID, 
					MATRIZ_FECHA,
					MATRIZ_CORRESPONDE,
					MATRIZ_RESUMEN,
					MATRIZ_RESULTADOS,
					MATRIZ_OBSERVACIONES 
					
					FROM mb_funcionarios_matriz 
					RIGHT JOIN mb_funcionarios ON MATRIZ_FUNCIONARIO_ID=FUNCIONARIO_ID 
					WHERE MATRIZ_ID='$idMatriz'
			";

	$aAnalisis = LocalExecuteQuery($sSQL);

	$smarty = new Smarty;
	$smarty->assign('ANALISIS', $aAnalisis);
	$smarty->display('rh_matriz_editar.tpl');

} catch (Exception $e) {
    echo null;
}
LocalCerrarConexion();