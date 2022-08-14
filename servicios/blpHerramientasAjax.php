<?php
require('dbVersion02.php');
LocalInstanciarConexion();

try {
    $option = $_REQUEST["option"];
    switch ($option) {
        case "LST": $pageSize = $_REQUEST["pageSize"];                  
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
					$consultaSql = "SELECT H.*, TH.TIPO_HERRAMIENTA_CODIGO
					 FROM MB_HERRAMIENTAS H INNER JOIN MB_TIPOS_HERRAMIENTA TH 
					 ON H.HRR_TIPO_HERRAMIENTA_ID = TH.TIPO_HERRAMIENTA_ID			 
					 ORDER BY 2";
					$respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,$start,$limit);
                    break;					
        case "NEW": $sIdHerramienta = $_REQUEST["H_HERRAMIENTA_ID"];					
                    $sDescripcion = $_REQUEST["HRR_DESCRIPCION"];
					$sDetalle = $_REQUEST["HRR_DETALLE"];
					$sUsuario = $_SESSION["usr_session"];					
					$sfecha = strftime( "%Y-%m-%d-%H-%M-%S", time() );
                    $consultaSql = "INSERT INTO MB_HERRAMIENTAS (HRR_TIPO_HERRAMIENTA_ID,HRR_DESCRIPCION, HRR_DETALLE,HRR_REGISTRO,HRR_USUARIO,HRR_ESTADO) 
                             VALUES ('$sIdHerramienta', '$sDescripcion', '$sDetalle','$sfecha', '$sUsuario','ACTIVO') ";					                   							 					
					$respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,0,10);
                    break;
        case "UPD": $sI = $_REQUEST["HRR_HERRAMIENTA_ID"];									
					$sIdTipoHerramienta = $_REQUEST["H_HERRAMIENTA_ID"];				
					$sDescripcion = $_REQUEST["HRR_DESCRIPCION"];
					$sDetalle = $_REQUEST["HRR_DETALLE"];
					$consultaSql = "UPDATE MB_HERRAMIENTAS SET HRR_TIPO_HERRAMIENTA_ID = '$sIdTipoHerramienta', HRR_DESCRIPCION = '$sDescripcion', HRR_DETALLE = '$sDetalle' WHERE  HRR_ID = '$sI'";					
					$respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,0,10);
                    break;						
        case "DEL": $sI = $_REQUEST["i"];					                    
					$consultaSql = "UPDATE MB_HERRAMIENTAS SET HRR_ESTADO = 'INACTIVO' WHERE  HRR_ID = '$sI'";
					$respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,0,10);
                    break;
				
    }
} catch (Exception $e) {
    echo null;
}
 LocalCerrarConexion();
?>