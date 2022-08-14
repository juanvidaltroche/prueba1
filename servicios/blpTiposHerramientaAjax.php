<?php
require('dbVersion02.php');
LocalInstanciarConexion();

try {
    $option = $_REQUEST["option"];

    switch ($option) {
        case "LST": $pageSize = $_REQUEST["pageSize"];                  
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
					$consultaSql = "SELECT p.*
					 FROM MB_TIPOS_HERRAMIENTA p
					 WHERE p.TIPO_HERRAMIENTA_ESTADO='ACTIVO'
					 ORDER BY 2";
					$respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,$start,$limit);
                    break;
        case "NEW": 
                    $sCodigo = $_REQUEST["tipo_herramienta_codigo"];
					$sDescripcion = $_REQUEST["tipo_herramienta_descripcion"];
					$sAsiento = $_REQUEST["tipo_herramienta_asientos"];	
					$sEstado = $_REQUEST["tipo_herramienta_estado"];	
					$sUsuario = $_SESSION["usr_session"];					
                    $consultaSql = "INSERT INTO MB_TIPOS_HERRAMIENTA (TIPO_HERRAMIENTA_CODIGO,TIPO_HERRAMIENTA_DESCRIPCION,TIPO_HERRAMIENTA_ASIENTOS,TIPO_HERRAMIENTA_USUARIO,TIPO_HERRAMIENTA_ESTADO,TIPO_HERRAMIENTA_REGISTRO) 
                             VALUES ('$sCodigo', '$sDescripcion', '$sAsiento','$sUsuario','$sEstado',localtime())";
					$respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,0,10);
                    break;
        case "DEL": 
					$sId = $_REQUEST["i"];				
                    $consultaSql = "UPDATE MB_TIPOS_HERRAMIENTA SET TIPO_HERRAMIENTA_ESTADO='INACTIVO' WHERE TIPO_HERRAMIENTA_ID = '$sId'";
                  $respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,0,10);
                    break;
		case "UPD":
					$sId = $_REQUEST["UPD_TIPO_HERRAMIENTA_ID"];	
					$sCodigo = $_REQUEST["UPD_TIPO_HERRAMIENTA_CODIGO"];
					$sDescripcion = $_REQUEST["UPD_TIPO_HERRAMIENTA_DESCRIPCION"];
					$sAsiento = $_REQUEST["UPD_TIPO_HERRAMIENTA_ASIENTOS"];	
					$sEstado = $_REQUEST["UPD_TIPO_HERRAMIENTA_ESTADO"];	
					$sUsuario = $_SESSION["usr_session"];					
                    $consultaSql = "UPDATE MB_TIPOS_HERRAMIENTA SET TIPO_HERRAMIENTA_CODIGO= '$sCodigo', TIPO_HERRAMIENTA_DESCRIPCION= '$sDescripcion', TIPO_HERRAMIENTA_ASIENTOS='$sAsiento',TIPO_HERRAMIENTA_ESTADO='$sEstado',TIPO_HERRAMIENTA_USUARIO='$sUsuario' WHERE TIPO_HERRAMIENTA_ID = '$sId'";
                    $respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,0,10);
                    break;
    }
} catch (Exception $e) {
    echo null;
}
 LocalCerrarConexion();
?>