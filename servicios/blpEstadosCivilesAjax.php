<?php
require('dbVersion02.php');
LocalInstanciarConexion();

try {
    $option = $_REQUEST["option"];

    switch ($option) {
        case "LST": $pageSize = $_REQUEST["pageSize"];                  
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
					$consultaSql = "SELECT *
					 FROM sa_estados_civiles
					 ORDER BY 2";
					$respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,$start,$limit);
                    break;
        case "NEW": 
					$sDescripcion = $_REQUEST["ESTADO_CIVIL_DESCRIPCION_LABEL"];                    
					$sRegistrado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sModificado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sUsuario = $_SESSION["usr_session"];
					$sEstado = $_REQUEST["ESTADO_CIVIL_ESTADO_COMBO"];					
					
                    $consultaSql = "INSERT INTO sa_estados_civiles(ESTADO_CIVIL_DESCRIPCION,ESTADO_CIVIL_REGISTRADO,ESTADO_CIVIL_MODIFICADO,ESTADO_CIVIL_USUARIO, ESTADO_CIVIL_ESTADO) 
                             VALUES ('$sDescripcion', '$sRegistrado','$sModificado','$sUsuario','$sEstado') ";
                    $respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,0,10);
                    break;
					
		case "DEL": 
		            $sI = $_REQUEST["i"];
					$sModificado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sUsuario = $_SESSION["usr_session"];		
		
                    $consultaSql = "UPDATE sa_estados_civiles SET ESTADO_CIVIL_MODIFICADO='$sModificado',ESTADO_CIVIL_USUARIO='$sUsuario',ESTADO_CIVIL_ESTADO='I' WHERE ESTADO_CIVIL_ID = '$sI'";
                    $respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,0,10);
                    break;			
					
        case "UPD": 
					$sI = $_REQUEST["i"];		
					$sDescripcion = $_REQUEST["ESTADO_CIVIL_DESCRIPCION_LABEL"];
					$sModificado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sUsuario = $_SESSION["usr_session"];
					$sEstado = $_REQUEST["ESTADO_CIVIL_ESTADO_COMBO"];	
					
                    $consultaSql = "UPDATE sa_estados_civiles SET ESTADO_CIVIL_DESCRIPCION='$sDescripcion',ESTADO_CIVIL_MODIFICADO='$sModificado',ESTADO_CIVIL_USUARIO='$sUsuario',ESTADO_CIVIL_ESTADO='$sEstado' WHERE ESTADO_CIVIL_ID = '$sI'";
                  $respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,0,10);
                    break;
    }
} catch (Exception $e) {
    echo null;
}
 LocalCerrarConexion();
?>