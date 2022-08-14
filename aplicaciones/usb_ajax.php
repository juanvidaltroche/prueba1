<?php
require('../servicios/dbVersion02.php');
LocalInstanciarConexion();

try {
	$opcion = $_REQUEST["opcion"];  
    switch ($opcion) {
		case "LST_USUARIO": 
			
			$consultaSql = "SELECT (SELECT CONCAT(FUNCIONARIO_PATERNO, ' ', FUNCIONARIO_MATERNO, ' ', FUNCIONARIO_NOMBRES ) 
									FROM mb_funcionarios 
									WHERE FUNCIONARIO_ID = USUARIO_FUNCIONARIO_ID)AS USUARIO,USUARIO_ID
							FROM sa_usuarios
							INNER JOIN sa_usuario_tipos_funcionario ON UTF_USUARIO_ID = USUARIO_ID
							WHERE USUARIO_ESTADO = 'A'
							AND UTF_TIPO_FUNCIONARIO_ID = '5'
							ORDER BY USUARIO_ID DESC;";									
			$respuesta=LocalExecuteQuery($consultaSql);
			doGenerarJsonRespuesta($respuesta,0,500);
		break;
		case "USUARIO": 
			$id = $_REQUEST["id"];
			$consultaSql = "SELECT USUARIO_ID, 
								   USUARIO_CODIGO,
								   USUARIO_TIPO_USUARIO, 	
								   TIPO_FUNCIONARIO_DESCRIPCION 	 
			FROM sa_usuarios 
			INNER JOIN sa_usuario_tipos_funcionario ON UTF_USUARIO_ID= USUARIO_ID
			INNER JOIN mb_tipos_funcionario ON 	TIPO_FUNCIONARIO_ID = UTF_TIPO_FUNCIONARIO_ID	
			WHERE USUARIO_ID ='$id'";									
			$respuesta=LocalExecuteQuery($consultaSql);
			doGenerarJsonRespuesta($respuesta,0,500);
		break;
		
    }
} catch (Exception $e) {
    echo null;
}
LocalCerrarConexion();
?>