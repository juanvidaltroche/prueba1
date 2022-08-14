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
					 FROM sa_opciones
					 INNER JOIN sa_grupos ON OPCION_GRUPO_ID = GRUPO_ID
					 WHERE OPCION_ESTADO = 'A'
					 ORDER BY 2";
					$respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,$start,$limit);
                    break;
        case "NEW": 
					$sGrupo = $_REQUEST["H_GRUPO_ID"];
					$sDescripcion = $_REQUEST["OPCION_DESCRIPCION_LABEL"];
					$sContenido = $_REQUEST["OPCION_CONTENIDO_LABEL"];
					$sAdicional = $_REQUEST["OPCION_ADICIONAL_LABEL"];
					$sOrden = $_REQUEST["OPCION_ORDEN_LABEL"];
					$sOpcion = $_REQUEST["OPCION_IMAGEN_LABEL"];									
					$sRegistrado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sModificado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sUsuario = $_SESSION["usr_session"];
					$sEstado = $_REQUEST["OPCION_ESTADO_COMBO"];
					
					
                    $consultaSql = "INSERT INTO sa_opciones(OPCION_GRUPO_ID,OPCION_DESCRIPCION,OPCION_CONTENIDO,OPCION_ADICIONAL,OPCION_ORDEN,OPCION_IMAGEN,OPCION_REGISTRADO,OPCION_MODIFICADO,OPCION_USUARIO,OPCION_ESTADO) 
                             VALUES('$sGrupo',
									'$sDescripcion',
									'$sContenido',
									'$sAdicional',
									'$sOrden',
									'$sOpcion',
									'$sRegistrado',
									'$sModificado',
									'$sUsuario',
									'$sEstado'
										) ";
                    $respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,10,10);
                    break;
					
		case "DEL": 
		            $sI = $_REQUEST["i"];
					$sModificado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sUsuario = $_SESSION["usr_session"];		
		
                    $consultaSql = "UPDATE sa_opciones SET OPCION_MODIFICADO='$sModificado',OPCION_USUARIO='$sUsuario',OPCION_ESTADO='I' WHERE OPCION_ID = '$sI'";
                    $respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,10,10);			
					
        case "UPD": 
					$sI = $_REQUEST["i"];
					
					$sGrupo = $_REQUEST["H_GRUPO_ID"];
					$sDescripcion = $_REQUEST["OPCION_DESCRIPCION_LABEL"];
					$sContenido = $_REQUEST["OPCION_CONTENIDO_LABEL"];
					$sAdicional = $_REQUEST["OPCION_ADICIONAL_LABEL"];
					$sOrden = $_REQUEST["OPCION_ORDEN_LABEL"];
					$sOpcion = $_REQUEST["OPCION_IMAGEN_LABEL"];					
					$sModificado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sUsuario = $_SESSION["usr_session"];
					$sEstado = $_REQUEST["OPCION_ESTADO_COMBO"];	
					
                    $consultaSql = "UPDATE sa_opciones SET
					OPCION_GRUPO_ID='$sGrupo',
					OPCION_DESCRIPCION='$sDescripcion',
					OPCION_CONTENIDO='$sContenido',
					OPCION_ADICIONAL='$sAdicional',
					OPCION_ORDEN='$sOrden',
					OPCION_IMAGEN='$sOpcion',
					OPCION_MODIFICADO='$sModificado',
					OPCION_USUARIO='$sUsuario',
					OPCION_ESTADO='$sEstado'					
					
					WHERE OPCION_ID = '$sI'";					
					
                   $respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,10,10);
                    break;
    }
} catch (Exception $e) {
    echo null;
}

?>