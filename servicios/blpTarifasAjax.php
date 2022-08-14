<?php
require('dbVersion02.php');
LocalInstanciarConexion();

try {
    $option = $_REQUEST["option"];

    switch ($option) {
        case "LST": $pageSize = $_REQUEST["pageSize"];                  
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
					$consultaSql = "SELECT TARIFA_ID,TARIFA_TIPO_PASAJE_ID,TP.TIPO_PASAJE_DESCRIPCION,TARIFA_DESCRIPCION,TARIFA_NRO_RESOLUCION,TARIFA_MONTO,TARIFA_REGISTRO,TARIFA_MODIFICACION,TARIFA_USUARIO,TARIFA_ESTADO FROM MB_TARIFAS AS T
					 INNER JOIN MB_TIPOS_PASAJE AS TP ON T.TARIFA_TIPO_PASAJE_ID =TP.TIPO_PASAJE_ID 
					 ORDER BY 2";
					$respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,$start,$limit);
                    break;
        case "NEW": $sTarifaTipoPasajeId = $_REQUEST["H_TIPO_PASAJE_ID"];
                    $sTarifaDescricion = $_REQUEST["TARIFA_DESCRIPCION"];
					$sTarifaNroResolucion = $_REQUEST["TARIFA_NRO_RESOLUCION"];
					$sTarifaMonto = $_REQUEST["TARIFA_MONTO"];
					$sEstado = $_REQUEST["TARIFA_ESTADO"];
					$sUsuario = $_SESSION["usr_session"];
					$sfecha = strftime( "%Y-%m-%d-%H-%M-%S", time() );
                    $consultaSql = "INSERT INTO MB_TARIFAS( TARIFA_TIPO_PASAJE_ID, TARIFA_DESCRIPCION, TARIFA_NRO_RESOLUCION, TARIFA_MONTO,TARIFA_REGISTRO,TARIFA_USUARIO,TARIFA_ESTADO) 
					                         VALUES('$sTarifaTipoPasajeId','$sTarifaDescricion','$sTarifaNroResolucion','$sTarifaMonto','$sfecha','$sUsuario','$sEstado')";
                    $respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,0,10);
                    break;
         case "UPD": $sI = $_REQUEST["i"];
		             $sTarifaTipoPasajeId = $_REQUEST["H_TIPO_PASAJE_ID"];
					 $sTarifaDescricion = $_REQUEST["TARIFA_DESCRIPCION"];
					 $sTarifaNroResolucion = $_REQUEST["TARIFA_NRO_RESOLUCION"];
					 $sTarifaMonto = $_REQUEST["TARIFA_MONTO"];
					 $sEstado = $_REQUEST["TARIFA_ESTADO"];
					 $sUsuario = $_SESSION["usr_session"];
					 $sfecha = strftime( "%Y-%m-%d-%H-%M-%S", time() );
                     $consultaSql = "UPDATE MB_TARIFAS SET TARIFA_TIPO_PASAJE_ID='$sTarifaTipoPasajeId',TARIFA_DESCRIPCION='$sTarifaDescricion',TARIFA_NRO_RESOLUCION='$sTarifaNroResolucion',TARIFA_MONTO='$sTarifaMonto',TARIFA_USUARIO='$sUsuario',TARIFA_ESTADO='$sEstado',TARIFA_REGISTRO='$sfecha' 
                              WHERE TARIFA_ID='$sI'";
					 
                   $respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,0,10);
                    break;					
        case "DEL": $sI = $_REQUEST["i"];
                     $consultaSql = "UPDATE MB_TARIFAS SET TARIFA_ESTADO = 'INACTIVO'  WHERE TARIFA_ID = '$sI'";
					 
                    $respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,0,10);
                    break;
    }
} catch (Exception $e) {
    echo null;
}
 LocalCerrarConexion();
?>