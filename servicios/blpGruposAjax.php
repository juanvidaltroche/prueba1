<?php
require('dbVersion02.php');
LocalInstanciarConexion();

try {
    $option = $_REQUEST["option"];

    switch ($option) {
        case "LST": $consultaSql = "SELECT * FROM sa_grupos
					 WHERE	GRUPO_ESTADO='A'
					ORDER BY 2";
					$respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,0,10);
                    break;
        case "NEW": 
					$sDescripcion = $_REQUEST["GRUPO_DESCRIPCION_LABEL"];
					$sImagen = $_REQUEST["GRUPO_IMAGEN_LABEL"];								
					$sRegistrado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sModificado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sUsuario = $_SESSION["usr_session"];
					$sEstado = $_REQUEST["GRUPO_ESTADO_COMBO"];					
					
					
                    $consultaSql = "INSERT INTO sa_grupos( GRUPO_DESCRIPCION, GRUPO_IMAGEN, GRUPO_REGISTRADO, GRUPO_MODIFICADO, GRUPO_USUARIO, GRUPO_ESTADO) 
                             VALUES('$sDescripcion',
									'$sImagen',
									'$sRegistrado',
									'$sModificado',
									'$sUsuario',
									'$sEstado') ";
                   $respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,0,10);
                    break;
					
		case "UPD": 
		            $sI = $_REQUEST["i"];
					
					$sDescripcion = $_REQUEST["GRUPO_DESCRIPCION_LABEL"];
					$sImagen = $_REQUEST["GRUPO_IMAGEN_LABEL"];					
					$sModificado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sUsuario = $_SESSION["usr_session"];
					$sEstado = $_REQUEST["GRUPO_ESTADO_COMBO"];			
		
                    $consultaSql = "UPDATE sa_grupos SET GRUPO_DESCRIPCION='$sDescripcion',GRUPO_IMAGEN='$sImagen',GRUPO_MODIFICADO='$sModificado',GRUPO_USUARIO='$sUsuario',GRUPO_ESTADO='$sEstado' WHERE GRUPO_ID = '$sI'";
                    $respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,0,10);
                    break;			
					
        case "DEL": 
					$sI = $_REQUEST["i"];					
                   			
					$sModificado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sUsuario = $_SESSION["usr_session"];								
		
                    $consultaSql = "UPDATE sa_grupos SET GRUPO_MODIFICADO='$sModificado',GRUPO_USUARIO='$sUsuario',GRUPO_ESTADO='I' WHERE GRUPO_ID = '$sI'";
                   $respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,0,10);
                    break;
    }
} catch (Exception $e) {
    echo null;
}
 LocalCerrarConexion();
?>