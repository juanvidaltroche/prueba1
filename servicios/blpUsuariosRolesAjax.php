<?php
require('dbVersion02.php');
LocalInstanciarConexion();

try {
    $option = $_REQUEST["option"];

    switch ($option) {
        case "LST": $pageSize = $_REQUEST["pageSize"];
                    
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
                   $consultaSql = "SELECT * FROM sa_usuario_tipos_funcionario
								 INNER JOIN mb_tipos_funcionario ON  UTF_TIPO_FUNCIONARIO_ID  =  TIPO_FUNCIONARIO_ID  
								 INNER JOIN sa_usuarios ON  UTF_USUARIO_ID  = USUARIO_ID
								 WHERE USUARIO_ESTADO='A' AND TIPO_FUNCIONARIO_ESTADO='ACTIVO'
								 ORDER BY USUARIO_CODIGO ASC";
					$respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,$start,$limit);
                    break;
		case "LST_TIPOS_FUNCIONARIO": 
					$pageSize = $_REQUEST["pageSize"];                    
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
                    $consultaSql = "SELECT * FROM mb_tipos_funcionario
								 WHERE TIPO_FUNCIONARIO_ESTADO='ACTIVO'
								 ORDER BY TIPO_FUNCIONARIO_DESCRIPCION ASC";
					$respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,$start,$limit);
                    break;
        case "NEW": 					
					$sOpcion = $_REQUEST["oculto_id_usuario"];
					$sRol = $_REQUEST["oculto_id_tipo_funcionario"];
					$sRegistrado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sModificado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sUsuario = $_SESSION["usr_session"];
					$sEstado = 'A';//$_REQUEST["UR_ESTADO_COMBO"];
				
					
                    $consultaSql = "INSERT INTO sa_usuario_tipos_funcionario(
																			   UTF_USUARIO_ID, 
																			   UTF_TIPO_FUNCIONARIO_ID, 
																			   UTF_REGISTRADO, 
																			   UTF_MODIFICADO, 
																			   UTF_USUARIO, 
																			   UTF_ESTADO) VALUES  
									('$sOpcion',
									'$sRol',									
									'$sRegistrado',
									'$sModificado',
									'$sUsuario',
									'$sEstado'									
										) ";
                    $respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,10,10);
                    break;
					
		case "DEL": 
		            $sI = $_REQUEST["i"];
					$sModificado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sUsuario = $_SESSION["usr_session"];		
		
                    $consultaSql = "UPDATE sa_usuario_tipos_funcionario SET UTF_MODIFICADO='$sModificado',UTF_USUARIO='$sUsuario',UTF_ESTADO='INACTIVO' WHERE UTF_ID = '$sI'";
                   $respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,10,10);
                    break;			
					
        case "UPD": 
					$sI = $_REQUEST["i"];
					
					$sOpcion = $_REQUEST["oculto_id_usuario"];
					$sRol = $_REQUEST["oculto_id_tipo_funcionario"];					
					$sModificado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sUsuario = $_SESSION["usr_session"];
					$sEstado = 'A';//$_REQUEST["UR_ESTADO_COMBO"];
					$consultaSql = "UPDATE sa_usuario_tipos_funcionario SET
					UTF_USUARIO_ID	='$sOpcion',
					UTF_TIPO_FUNCIONARIO_ID		='$sRol',					
					UTF_MODIFICADO	='$sModificado',
					UTF_USUARIO		='$sUsuario',
					UTF_ESTADO='$sEstado'				
					
					WHERE UTF_ID = '$sI'";					
					
                    $respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,10,10);
                    break;
    }
} catch (Exception $e) {
    echo null;
}
 LocalCerrarConexion();
?>