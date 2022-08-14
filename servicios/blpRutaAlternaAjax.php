<?php
require('dbVersion02.php');
LocalInstanciarConexion();
try {
    $option = $_REQUEST["option"];
    switch ($option) {
        case "LST": $pageSize = $_REQUEST["pageSize"];                    
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
                    $consultaSql = "SELECT * FROM MB_RUTAS WHERE RUTA_ESTADO='ACTIVO'";
					$respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,$start,$limit);
                    break;
        case "NEW": $sDescripcionLabel = $_REQUEST["RUTA_DESCRIPCION"];   
					$sDetalleLabel = $_REQUEST["RUTA_DETALLE"];
                    $sCategoriaEstado = $_REQUEST["RUTA_ESTADO"];
					$sUsuario = $_SESSION["usr_session"];
					$sfecha = strftime( "%Y-%m-%d-%H-%M-%S", time() );
                    $consultaSql = "INSERT INTO MB_RUTAS (RUTA_DESCRIPCION,RUTA_DETALLE,RUTA_ESTADO, RUTA_USUARIO,RUTA_REGISTRO) 
                             VALUES ('$sDescripcionLabel','$sDetalleLabel', '$sCategoriaEstado','$sUsuario','$sfecha') ";
					$respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,10,10);
                    break;
					
		case "UPD": $sI = $_REQUEST["UPD_RUTA_ID"];
					$sDescripcionLabel = $_REQUEST["UPD_RUTA_DESCRIPCION"];   
					$sDetalleLabel = $_REQUEST["UPD_RUTA_DETALLE"];
                    $sCategoriaEstado = $_REQUEST["UPD_RUTA_ESTADO"];
					$sUsuario = $_SESSION["usr_session"];
					$sfecha = strftime( "%Y-%m-%d-%H-%M-%S", time() );
                    $consultaSql = "UPDATE MB_RUTAS SET RUTA_DESCRIPCION = '$sDescripcionLabel' ,RUTA_DETALLE='$sDetalleLabel',RUTA_ESTADO='$sCategoriaEstado', RUTA_USUARIO='$sUsuario',RUTA_MODIFICACION='$sfecha' WHERE RUTA_ID='$sI'";					
                   $respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,10,10);
                    break;					
					
        case "DEL":$sI = $_REQUEST["i"];
					$consultaSql = "UPDATE MB_RUTAS SET RUTA_ESTADO = 'INACTIVO' WHERE RUTA_ID = '$sI'";
                    $respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,10,10);
                    break;
    }
} catch (Exception $e) {
    echo null;
}
 LocalCerrarConexion();
?>