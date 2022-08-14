<?php
require('dbVersion02.php');
LocalInstanciarConexion();

try {
    $option = $_REQUEST["option"];

    switch ($option) {
        case "LST": $pageSize = $_REQUEST["pageSize"];
                    
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
                     $consultaSql = "SELECT * FROM sa_roles	
									 WHERE ROL_ESTADO='A'	
									 ORDER BY 2";
					$respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,$start,$limit);
                    break;
        case "NEW": 
					$sDescripcion = $_REQUEST["ROL_DESCRIPCION_LABEL"];										
					$sRegistrado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sModificado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sUsuario = $_SESSION["usr_session"];
					$sEstado = $_REQUEST["ROL_ESTADO_COMBO"];					
					
					
                    $consultaSql = "INSERT INTO sa_roles( ROL_DESCRIPCION,ROL_REGISTRADO, ROL_MODIFICADO, ROL_USUARIO, ROL_ESTADO) 
                             VALUES('$sDescripcion',									
									'$sRegistrado',
									'$sModificado',
									'$sUsuario',
									'$sEstado') ";
                    $respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,10,10);
                    break;
					
		case "UPD": 
		            $sI = $_REQUEST["i"];
					
					$sDescripcion = $_REQUEST["ROL_DESCRIPCION_LABEL"];						
					$sModificado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sUsuario = $_SESSION["usr_session"];
					$sEstado = $_REQUEST["ROL_ESTADO_COMBO"];			
		
                    $consultaSql = "UPDATE sa_roles SET ROL_DESCRIPCION='$sDescripcion',ROL_MODIFICADO='$sModificado',ROL_USUARIO='$sUsuario',ROL_ESTADO='$sEstado' WHERE ROL_ID = '$sI'";
                   $respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,10,10);
                    break;			
					
        case "DEL": 
					$sI = $_REQUEST["i"];					
                   			
					$sModificado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sUsuario = $_SESSION["usr_session"];								
		
                    $consultaSql = "UPDATE sa_roles SET ROL_MODIFICADO='$sModificado',ROL_USUARIO='$sUsuario',ROL_ESTADO='I' WHERE ROL_ID = '$sI'";
                   $respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,10,10);
                    break;
    }
} catch (Exception $e) {
    echo null;
}
 LocalCerrarConexion();
?>