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
					ORDER BY FUNCIONARIO_NOMBRES ASC";
					$respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,$start,$limit);
                    break;
					
		 case "BSQ": 
					$valor = $_REQUEST["valor"];                  
                    
					$consultaSql = "SELECT * , CONCAT( FUNCIONARIO_NOMBRES, ' ', FUNCIONARIO_PATERNO, ' ', FUNCIONARIO_MATERNO ) AS FUNCIONARIO_NOMBRE_COMPLETO
					FROM sa_usuarios
					INNER JOIN MB_FUNCIONARIOS ON USUARIO_FUNCIONARIO_ID = FUNCIONARIO_ID
					WHERE CONCAT( FUNCIONARIO_NOMBRES, ' ', FUNCIONARIO_PATERNO, ' ', FUNCIONARIO_MATERNO ) LIKE '%$valor%'
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
					doGenerarJsonRespuesta($respuesta,0,10);
                    break;
					
		case "DEL": 
		            $sI = $_REQUEST["i"];
					$sModificado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sUsuario = $_SESSION["usr_session"];		
		
                    $consultaSql = "UPDATE sa_usuarios SET USUARIO_MODIFICADO='$sModificado',USUARIO_USUARIO='$sUsuario',USUARIO_ESTADO='INACTIVO' WHERE USUARIO_ID = '$sI'";
                    $respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,0,10);
                    break;			
					
        case "UPD": 
					$sI = $_REQUEST["i"];
					$sPersona = $_REQUEST["oculto_id_funcionario"];
					$sCodigo = $_REQUEST["USUARIO_CODIGO_LABEL"];
					$sClave = $_REQUEST["USUARIO_CLAVE_LABEL"];
										
					$sRegistrado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
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
					doGenerarJsonRespuesta($respuesta,0,10);
                    break;
    }
} catch (Exception $e) {
    echo null;
}
 LocalCerrarConexion();
?>