<?php
require('dbVersion02.php');
LocalInstanciarConexion();

try {
    $option = $_REQUEST["option"];

    switch ($option) {
        case "LST": $pageSize = $_REQUEST["pageSize"];                  
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
					$consultaSql = "SELECT * , CONCAT( FUNCIONARIO_NOMBRES, ' ', FUNCIONARIO_PATERNO, ' ', FUNCIONARIO_MATERNO ) AS FUNCIONARIO_NOMBRE_COMPLETO
					FROM sa_usuarios
					INNER JOIN MB_FUNCIONARIOS ON USUARIO_FUNCIONARIO_ID = FUNCIONARIO_ID	
					INNER JOIN sa_usuario_tipos_funcionario ON UTF_USUARIO_ID = USUARIO_ID
					INNER JOIN mb_tipos_funcionario ON UTF_TIPO_FUNCIONARIO_ID = TIPO_FUNCIONARIO_ID
					AND (TIPO_FUNCIONARIO_ID = '4' OR TIPO_FUNCIONARIO_ID = '5')
					ORDER BY FUNCIONARIO_NOMBRES ASC";
					$respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,$start,$limit);
                    break;
					
		 case "BSQ": 
					$valor = $_REQUEST["valor"];                  
                    
					$consultaSql = "SELECT * , CONCAT( FUNCIONARIO_NOMBRES, ' ', FUNCIONARIO_PATERNO, ' ', FUNCIONARIO_MATERNO ) AS FUNCIONARIO_NOMBRE_COMPLETO
					FROM sa_usuarios
					INNER JOIN MB_FUNCIONARIOS ON USUARIO_FUNCIONARIO_ID = FUNCIONARIO_ID
					INNER JOIN sa_usuario_tipos_funcionario ON UTF_USUARIO_ID = USUARIO_ID
					INNER JOIN mb_tipos_funcionario ON UTF_TIPO_FUNCIONARIO_ID = TIPO_FUNCIONARIO_ID
					WHERE CONCAT( FUNCIONARIO_NOMBRES, ' ', FUNCIONARIO_PATERNO, ' ', FUNCIONARIO_MATERNO ) LIKE '%$valor%' AND  (TIPO_FUNCIONARIO_ID = '4' OR TIPO_FUNCIONARIO_ID = '5')
					ORDER BY FUNCIONARIO_NOMBRES ASC";
					$respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,0,1000);
                    break;
					
		case "LST_FUNCIONARIO":
					$pageSize    = $_REQUEST["pageSize"];
					$limit       = isset($_REQUEST["limit"]) ? $_REQUEST["limit"] : $pageSize;
					$start       = isset($_REQUEST["start"]) ? $_REQUEST["start"] : 0;
					$consultaSql = "SELECT *, CONCAT(FUNCIONARIO_NOMBRES,' ',FUNCIONARIO_PATERNO,' ',FUNCIONARIO_MATERNO) AS FUNCIONARIO
							FROM MB_FUNCIONARIOS
							WHERE FUNCIONARIO_ID NOT IN(SELECT USUARIO_FUNCIONARIO_ID FROM SA_USUARIOS )	 						
							ORDER BY FUNCIONARIO_NOMBRES ASC";
					$respuesta   = LocalExecuteQuery($consultaSql);
				
					doGenerarJsonRespuesta($respuesta, $start, $limit);
					break;
					
        case "NEW": 
					$sPersona = $_REQUEST["H_FUNCIONARIO_ID"];
					$sCodigo = $_REQUEST["USUARIO_CODIGO_LABEL"];
					$sClave = $_REQUEST["USUARIO_CLAVE_LABEL"];										
					$sRegistrado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sModificado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sUsuario = $_SESSION["usr_session"];
					
					$sControl 	= '';
					$sEstado 	= 'ACTIVO';				
					$sCorreo 	= '';
					$sTipo 		= '';
					$sDominio 	= '';
					
                    $consultaSql = "INSERT INTO sa_usuarios(USUARIO_FUNCIONARIO_ID, USUARIO_CODIGO, USUARIO_CLAVE, USUARIO_CONTROLAR_IP, USUARIO_REGISTRADO, USUARIO_MODIFICADO, USUARIO_USUARIO, USUARIO_ESTADO, USUARIO_CORREO, USUARIO_TIPO_USUARIO, USUARIO_DOMINIO) 
                             VALUES('$sPersona',
									'$sCodigo',
									'$sClave',
									'$sControl',
									'$sRegistrado',
									'$sModificado',
									'$sUsuario',
									'$sEstado',
									'$sCorreo',
									'$sTipo ',
									'$sDominio'								
										) ";
                   $respuesta=LocalExecuteQuery($consultaSql);
				   
				   $RESREMOT     = LocalExecuteQuery("SELECT @@identity AS USUARIO_ID;");
				   $ID_USUARIO = $RESREMOT[0]["USUARIO_ID"];
				   
				  
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
									('$ID_USUARIO',
									'$sRol',									
									'$sRegistrado',
									'$sModificado',
									'$sUsuario',
									'$sEstado'									
										) ";
                    $respuesta=LocalExecuteQuery($consultaSql);
					  $consultaSql = "UPDATE mb_funcionarios SET 							
							   FUNCIONARIO_TIPO='0' 
							   WHERE FUNCIONARIO_ID='$sPersona'";
                    $respuesta=LocalExecuteQuery($consultaSql);
				   
					doGenerarJsonRespuesta($respuesta,0,10);
                    break;
					
		case "DEL": 
		            $sI = $_REQUEST["i"];
					$sModificado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sUsuario = $_SESSION["usr_session"];		
		
                    
					
					 $consultaSql = "DELETE FROM sa_usuario_tipos_funcionario  WHERE UTF_USUARIO_ID = '$sI'";
                    $respuesta=LocalExecuteQuery($consultaSql);					
					 
					
					 $consultaSql = "UPDATE sa_usuarios SET USUARIO_MODIFICADO='$sModificado',USUARIO_USUARIO='$sUsuario',USUARIO_ESTADO='INACTIVO' WHERE USUARIO_ID = '$sI'";
                    $respuesta=LocalExecuteQuery($consultaSql);
					
					doGenerarJsonRespuesta($respuesta,0,10);
                    break;			
					
        case "UPD": 
					$sI = $_REQUEST["i"];
					$sPersona = $_REQUEST["oculto_id_funcionario"];
					$sCodigo = $_REQUEST["USUARIO_CODIGO_LABEL"];
					$sClave = $_REQUEST["USUARIO_CLAVE_LABEL"];
										
				
					$sModificado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sUsuario = $_SESSION["usr_session"];
					$sEstado  = 'ACTIVO';
					
					$sControl = '';
					$sCorreo  = '';
					$sTipo 	  = '';
					$sDominio = '';
					
                    $consultaSql = "UPDATE sa_usuarios SET					
						USUARIO_FUNCIONARIO_ID='$sPersona',
						USUARIO_CODIGO='$sCodigo',
						USUARIO_CLAVE='$sClave',
						USUARIO_MODIFICADO='$sModificado',
						USUARIO_USUARIO='$sUsuario',
						USUARIO_ESTADO='$sEstado',					
						USUARIO_CONTROLAR_IP='$sControl',					
						USUARIO_CORREO='$sCorreo',
						USUARIO_TIPO_USUARIO='$sTipo',
						USUARIO_DOMINIO='$sDominio'					
					WHERE USUARIO_ID = '$sI'";					
					
                    $respuesta=LocalExecuteQuery($consultaSql);	
				
					
					$sOpcion = $_REQUEST["oculto_id_usuario"];
					$sRol = $_REQUEST["oculto_id_tipo_funcionario"];					
				
				
				
					$consultaSql = "UPDATE sa_usuario_tipos_funcionario SET
					UTF_USUARIO_ID	='$sOpcion',
					UTF_TIPO_FUNCIONARIO_ID		='$sRol',					
					UTF_MODIFICADO	='$sModificado',
					UTF_USUARIO		='$sUsuario',
					UTF_ESTADO='A'				
					
					WHERE UTF_ID = '$sI'";	
					
					
					doGenerarJsonRespuesta($respuesta,0,10);
                    break;
    }
} catch (Exception $e) {
    echo null;
}
 LocalCerrarConexion();
?>