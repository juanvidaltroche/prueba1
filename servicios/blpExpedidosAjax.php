<?php
require('dbVersion02.php');
LocalInstanciarConexion();

/*function rowsGet($r, $i) {
    $sSQL = "SELECT *
             FROM sa_expedidos
             ORDER BY 2 ";
    $aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");
	
    return (array(sizeof($aResult), array_slice($aResult, $i, $r)));
}
*/
try {
    $option = $_REQUEST["option"];

    switch ($option) {
        case "LST": $consultaSql = "SELECT *
					 FROM sa_expedidos
					 ORDER BY 2";
					$respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,0,10);
                    break;
        case "NEW": 
					$sCodigo = $_REQUEST["EXPEDIDO_CODIGO_LABEL"];
					$sDescripcion = $_REQUEST["EXPEDIDO_DESCRIPCION_LABEL"];                    
					$sRegistrado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sModificado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sUsuario = $_SESSION["usr_session"];
					$sEstado = $_REQUEST["EXPEDIDO_ESTADO_COMBO"];					
					
                    $consultaSql = "INSERT INTO sa_expedidos(EXPEDIDO_CODIGO,EXPEDIDO_DESCRIPCION,EXPEDIDO_REGISTRADO,EXPEDIDO_MODIFICADO,EXPEDIDO_USUARIO, EXPEDIDO_ESTADO) 
                             VALUES ('$sCodigo','$sDescripcion', '$sRegistrado','$sModificado','$sUsuario','$sEstado') ";
                   $respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,0,10);
                    break;
					
		case "DEL": 
		            $sI = $_REQUEST["i"];
					$sModificado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sUsuario = $_SESSION["usr_session"];		
		
                    $consultaSql = "UPDATE sa_expedidos SET EXPEDIDO_MODIFICADO='$sModificado',EXPEDIDO_USUARIO='$sUsuario',EXPEDIDO_ESTADO='I' WHERE EXPEDIDO_ID = '$sI'";
                    $respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,0,10);
                    break;			
					
        case "UPD": 
					$sI = $_REQUEST["i"];
					$sCodigo = $_REQUEST["EXPEDIDO_CODIGO_LABEL"];
					$sDescripcion = $_REQUEST["EXPEDIDO_DESCRIPCION_LABEL"];
					$sModificado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sUsuario = $_SESSION["usr_session"];
					$sEstado = $_REQUEST["EXPEDIDO_ESTADO_COMBO"];	
					
                    $consultaSql = "UPDATE sa_expedidos SET EXPEDIDO_CODIGO='$sCodigo', EXPEDIDO_DESCRIPCION='$sDescripcion',EXPEDIDO_MODIFICADO='$sModificado',EXPEDIDO_USUARIO='$sUsuario',EXPEDIDO_ESTADO='$sEstado' WHERE EXPEDIDO_ID = '$sI'";
                    $respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,0,10);
                    break;
    }
} 
catch (Exception $e) {
    echo null;
}
 LocalCerrarConexion();

?>