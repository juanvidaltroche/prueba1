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
					 FROM MB_TIPOS_PASAJE p
					 ORDER BY 2";
					$respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,$start,$limit);
                    break;
        case "NEW": $sTipoPasajeCodigo = $_REQUEST["TIPO_PASAJE_CODIGO"];
                    $sTipoPasajeDescripcion = $_REQUEST["TIPO_PASAJE_DESCRIPCION"];
					$sUsuario = $_SESSION["usr_session"];
					$sEstado = $_REQUEST["categoria_estado"];
					$sFecha = localtime();
                    $consultaSql = "INSERT INTO MB_TIPOS_PASAJE (TIPO_PASAJE_CODIGO, TIPO_PASAJE_DESCRIPCION,TIPO_PASAJE_USUARIO,TIPO_PASAJE_ESTADO) 
                             VALUES ('$sTipoPasajeCodigo', '$sTipoPasajeDescripcion','$sUsuario','$sEstado') ";
                    $respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,0,10);
                    break;
		case "UPD": $sId = strtoupper($_REQUEST["UPDTIDTIPOPASAJE"]);  
					$sCodigo = strtoupper($_REQUEST["UPDCODIGO"]);  
		            $sDescripcion = strtoupper($_REQUEST["UPDTDESCRIPCION"]);  
                    
					$sUsuario = strtoupper($_SESSION["usr_session"]);
                    
					$consultaSql = "UPDATE MB_TIPOS_PASAJE SET TIPO_PASAJE_CODIGO='$sCodigo', TIPO_PASAJE_DESCRIPCION='$sDescripcion',TIPO_PASAJE_USUARIO='$sUsuario'
                             WHERE TIPO_PASAJE_ID = '$sId' ";
                    $respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,0,10);
                    break;	
        case "DEL": $sI = $_REQUEST["i"];
                    $consultaSql = "DELETE FROM MB_TIPOS_PASAJE WHERE TIPO_PASAJE_ID = '$sI'";
                    $respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,0,10);
                    break;
    }
} catch (Exception $e) {
    echo null;
}
 LocalCerrarConexion();
?>