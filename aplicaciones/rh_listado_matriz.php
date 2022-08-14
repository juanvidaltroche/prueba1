<?php
require '../lib/smarty/Smarty.class.php';
require('../servicios/dbVersion02.php');
/*
print "<pre>";
	print_r($_REQUEST);
print "</pre>";
die;
*/

LocalInstanciarConexion();
try {
	$sSQL = "	SELECT 	FUNCIONARIO_ID, 
						FUNCIONARIO_CI, 
						FUNCIONARIO_NOMBRES, 
						FUNCIONARIO_PATERNO, 
						FUNCIONARIO_MATERNO, 
						USUARIO_CODIGO,
						USUARIO_FUNCIONARIO_ID, 
						TIPO_FUNCIONARIO_ID,
						TIPO_FUNCIONARIO_DESCRIPCION
									
					FROM mb_funcionarios 
					INNER JOIN sa_usuarios ON USUARIO_FUNCIONARIO_ID=FUNCIONARIO_ID
					INNER JOIN sa_usuario_tipos_funcionario ON UTF_USUARIO_ID=USUARIO_ID 
					INNER JOIN mb_tipos_funcionario ON TIPO_FUNCIONARIO_ID=UTF_TIPO_FUNCIONARIO_ID
			";
	
	$aRespuestas = LocalExecuteQuery($sSQL);
	$smarty = new Smarty;
	$smarty->assign('PERSONAL', $aRespuestas);
	$smarty->display('rh_listado_matriz.tpl');
} catch (Exception $e) {
    echo null;
}
LocalCerrarConexion();