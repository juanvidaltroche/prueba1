<?php
require('dbVersion02.php');
LocalInstanciarConexion();

try {
    $option = $_REQUEST["option"];

    switch ($option) {
        case "LST":  $pageSize = $_REQUEST["pageSize"];                  
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
					$consultaSql = "SELECT p.*
					 FROM MB_PATIOS p
					 ORDER BY 2";
					$respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,$start,$limit);
                    break;
        case "NEW": $sDescripcionLabel = $_REQUEST["PATIO_DESCRIPCION_LABEL"];   
					$sDetalleLabel = $_REQUEST["PATIO_DETALLE_LABEL"];
                    $sCategoriaEstado = $_REQUEST["PATIO_ESTADO_COMBO"];
					$sUsuario = $_SESSION["usr_session"];
					$sfecha = strftime( "%Y-%m-%d-%H-%M-%S", time() );
                    $consultaSql = "INSERT INTO MB_PATIOS (PATIO_DESCRIPCION,PATIO_DETALLE,PATIO_ESTADO, PATIO_USUARIO,PATIO_REGISTRO) 
                             VALUES ('$sDescripcionLabel','$sDetalleLabel', '$sCategoriaEstado','$sUsuario','$sfecha') ";
							
                    $respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,0,10);
                    break;
		case "UPD": $sI = $_REQUEST["i"];
					$sDescripcionLabel = $_REQUEST["PATIO_DESCRIPCION_LABEL"];   
					$sDetalleLabel = $_REQUEST["PATIO_DETALLE_LABEL"];
                    $sCategoriaEstado = $_REQUEST["PATIO_ESTADO_COMBO"];
					$sUsuario = $_SESSION["usr_session"];
					$sfecha = strftime( "%Y-%m-%d-%H-%M-%S", time() );
                    $consultaSql = "UPDATE MB_PATIOS SET PATIO_DESCRIPCION = '$sDescripcionLabel' ,PATIO_DETALLE='$sDetalleLabel',PATIO_ESTADO='$sCategoriaEstado', PATIO_USUARIO='$sUsuario'
					WHERE PATIO_ID='$sI'";					
                    $respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,0,10);
                    break;					
					
        case "DEL": $sI = $_REQUEST["i"];
					$consultaSql = "UPDATE MB_PATIOS SET PATIO_ESTADO = 'INACTIVO'  WHERE PATIO_ID = '$sI'";
                    $sRes = executeInsert($consultaSql, "COBRO_BUSES_ORIGEN" );
                    $respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,0,10);
                    break;
    }
} catch (Exception $e) {
    echo null;
}
LocalCerrarConexion();
?>