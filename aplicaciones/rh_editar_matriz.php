<?php
require '../lib/smarty/Smarty.class.php';
require('../servicios/dbVersion02.php');

/*print "<pre>";
	print_r($_POST);
print "</pre>";
die;*/

LocalInstanciarConexion();
try {
	$idPersonal = $_POST['PRS_ID'];

	$sSQL = "SELECT 	FUNCIONARIO_ID, 
						FUNCIONARIO_CI, 
						FUNCIONARIO_NOMBRES, 
						FUNCIONARIO_PATERNO, 
						FUNCIONARIO_MATERNO, 
						MATRIZ_FECHA,
						MATRIZ_CORRESPONDE,
						MATRIZ_RESUMEN,
						MATRIZ_RESULTADOS,
						MATRIZ_OBSERVACIONES,
						USUARIO_CODIGO,
						USUARIO_FUNCIONARIO_ID, 
						TIPO_FUNCIONARIO_ID,
						TIPO_FUNCIONARIO_DESCRIPCION
									
					FROM mb_funcionarios 
					LEFT JOIN mb_funcionarios_matriz ON MATRIZ_FUNCIONARIO_ID=FUNCIONARIO_ID 
					INNER JOIN sa_usuarios ON USUARIO_FUNCIONARIO_ID=FUNCIONARIO_ID
					INNER JOIN sa_usuario_tipos_funcionario ON UTF_USUARIO_ID=USUARIO_ID 
					INNER JOIN mb_tipos_funcionario ON TIPO_FUNCIONARIO_ID=UTF_TIPO_FUNCIONARIO_ID

					WHERE FUNCIONARIO_ID = '$idPersonal'
			";
	$aAnalisis = LocalExecuteQuery($sSQL);

	$smarty = new Smarty;
	$smarty->assign('ANALISIS', $aAnalisis);
	$smarty->display('rh_editar_matriz.tpl');

} catch (Exception $e) {
    echo null;
}
LocalCerrarConexion();