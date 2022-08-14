<?php
require('dbVersion02.php');
LocalInstanciarConexion();
try {
    $option = $_REQUEST["option"];

    switch ($option) {
        case "LST": $pageSize = $_REQUEST["pageSize"];                  
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
					$consultaSql = "SELECT *,(SELECT COUNT( PARADA_ID )
                                            FROM mb_paradas
                                            WHERE PARADA_ESTADO = 'ACTIVO'
                                            AND RUTA_ID = PARADA_RUTA_ID) AS TOTAL
                                    FROM MB_RUTAS WHERE RUTA_ESTADO='ACTIVO'";
					$respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,$start,$limit);
                    break;
       
        case "NEW": 

                    $sDescripcionLabel = trim($_REQUEST["RUTA_DESCRIPCION_LABEL"]);   
					$sDetalleLabel = trim($_REQUEST["RUTA_DETALLE_LABEL"]);
                   // $sCategoriaEstado = trim($_REQUEST["RUTA_ESTADO_COMBO"]);
                    
					$sUsuario = trim($_SESSION["usr_session"]);
					$sfecha = strftime( "%Y-%m-%d-%H-%M-%S", time() );
                    $cuenta = "SELECT COUNT(*) AS NUMERO
                                FROM mb_rutas
                                WHERE RUTA_ESTADO = 'ACTIVO' AND RUTA_TIPO_ESTADO = 'PRINCIPAL'";
                    $RespuestaCuenta=LocalExecuteQuery($cuenta);                                
                    $Numero=$RespuestaCuenta[0]["NUMERO"];
                    $consultaSql = "INSERT INTO MB_RUTAS (RUTA_DESCRIPCION,RUTA_DETALLE,RUTA_ESTADO, RUTA_TIPO_ESTADO, RUTA_USUARIO,RUTA_REGISTRO,RUTA_ID_CLON) 
                             VALUES ('$sDescripcionLabel','$sDetalleLabel', 'ACTIVO', 'PRINCIPAL','$sUsuario','$sfecha','$Numero') ";
					
                    //echo($consultaSql);
                    $respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,0,10);
                    break;
					
		case "UPD": $sI = $_REQUEST["i"];
					$sDescripcionLabel = trim($_REQUEST["RUTA_DESCRIPCION_LABEL1"]);   
					$sDetalleLabel = trim($_REQUEST["RUTA_DETALLE_LABEL1"]);
                    $sCategoriaEstado = trim($_REQUEST["RUTA_ESTADO_COMBO1"]);
					$sUsuario = $_SESSION["usr_session"];
					$sfecha = strftime( "%Y-%m-%d-%H-%M-%S", time() );
                    $consultaSql = "UPDATE MB_RUTAS SET RUTA_DESCRIPCION = '$sDescripcionLabel' ,RUTA_DETALLE='$sDetalleLabel',RUTA_TIPO_ESTADO='$sCategoriaEstado', RUTA_USUARIO='$sUsuario'
					WHERE RUTA_ID='$sI'";					
                    $respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,0,10);
                    break;					
					
        case "DEL":$sI = $_REQUEST["i"];
					$consultaSql = "UPDATE MB_RUTAS SET RUTA_ESTADO = 'INACTIVO'  WHERE RUTA_ID = '$sI'";
                   $respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,0,10);
                    break;

        case "PARADAS":$sI = $_REQUEST["i"];
                    $consultaSql = "SELECT RUTA_ID, RUTA_DESCRIPCION, PARADA_ID, PARADA_DESCRIPCION, PARADA_ESTADO, PARADA_RUTA_ID, COUNT(PARADA_ID) AS TOTAL 
                                    FROM mb_rutas INNER JOIN mb_paradas ON RUTA_ID = PARADA_RUTA_ID
                                    WHERE RUTA_ID = '$sI' AND PARADA_ESTADO = 'ACTIVO'";
                   $respuesta=LocalExecuteQuery($consultaSql);
                    doGenerarJsonRespuesta($respuesta,0,10);
                    break;
        case "LST_TURNOS": 
                    //$sHospital_id = $_REQUEST["jsGlobal_TF_HSP_ID"];
                    $consultaSql = "SELECT RUTA_ID,RUTA_DESCRIPCION,RUTA_DETALLE,RUTA_ESTADO FROM MB_RUTAS WHERE RUTA_ESTADO='ACTIVO'  AND RUTA_TIPO_ESTADO = 'PRINCIPAL'";
                    $respuesta=LocalExecuteQuery($consultaSql);
                    doGenerarJsonRespuesta($respuesta,0,1000);
        break;
        case "LST_PRINCIPAL": 
                    //$sHospital_id = $_REQUEST["jsGlobal_TF_HSP_ID"];
                    $consultaSql = "SELECT *,(SELECT COUNT( PARADA_ID ) FROM mb_paradas WHERE PARADA_ESTADO = 'ACTIVO' AND RUTA_ID = PARADA_RUTA_ID) AS PARADAS,
                                     (SELECT COUNT( RUTAS_BUSES_RUTA_ID)FROM mb_rutas_buses WHERE RUTAS_BUSES_ESTADO = 'ACTIVO' AND RUTAS_BUSES_RUTA_ID = RUTA_ID) AS BUSES,RUTA_TIPO_ESTADO 
                                        FROM MB_RUTAS 
                                        WHERE RUTA_ESTADO='ACTIVO' AND RUTA_TIPO_ESTADO = 'PRINCIPAL'";
                    $respuesta=LocalExecuteQuery($consultaSql);
                    doGenerarJsonRespuesta($respuesta,0,1000);
        break;
        case "LST_ALTERNA": 
                    $sGlobalRuta_Principal = $_REQUEST["globalRUTA_IDPrincipal"];
                    $sRUTA_TIPO_ESTADO= $_REQUEST["RUTA_TIPO_ESTADO"]; 
                    $consultaSql = "SELECT *,(SELECT COUNT( PARADA_ID )
                                            FROM mb_paradas
                                            WHERE PARADA_ESTADO = 'ACTIVO'
                                            AND RUTA_ID = PARADA_RUTA_ID) AS PARADAS
                                    FROM MB_RUTAS WHERE RUTA_ESTADO='ACTIVO' AND RUTA_TIPO_ESTADO = 'ALTERNA' AND RUTA_ID_CLON = '$sGlobalRuta_Principal'";
                    $respuesta=LocalExecuteQuery($consultaSql);
                    doGenerarJsonRespuesta($respuesta,0,1000);
        break;
         case "LST_PRINCIPALM": 
                    //$sHospital_id = $_REQUEST["jsGlobal_TF_HSP_ID"];
                    $consultaSql = "SELECT *,(SELECT COUNT( PARADA_ID ) FROM mb_paradas WHERE PARADA_ESTADO = 'ACTIVO' AND RUTA_ID = PARADA_RUTA_ID) AS PARADAS,
                                     (SELECT COUNT( RUTAS_BUSES_RUTA_ID)FROM mb_rutas_buses WHERE RUTAS_BUSES_ESTADO = 'ACTIVO' AND RUTAS_BUSES_RUTA_ID = RUTA_ID) AS BUSES,RUTA_TIPO_ESTADO 
                                        FROM MB_RUTAS 
                                        WHERE RUTA_ESTADO='ACTIVO' AND RUTA_TIPO_ESTADO = 'ALTERNA'";
                    $respuesta=LocalExecuteQuery($consultaSql);
                    doGenerarJsonRespuesta($respuesta,0,1000);
        break;
        case "LST_ALTERNAM": 
                    $sGlobalRuta_Principal = $_REQUEST["globalRUTA_IDPrincipal"];
                    
                    $consultaSql = "SELECT *,(SELECT COUNT( PARADA_ID )
                                            FROM mb_paradas
                                            WHERE PARADA_ESTADO = 'ACTIVO'
                                            AND RUTA_ID = PARADA_RUTA_ID) AS PARADAS
                                    FROM MB_RUTAS WHERE RUTA_ESTADO='ACTIVO' AND RUTA_TIPO_ESTADO = 'ALTERNA' AND RUTA_ID_CLON = '$sGlobalRuta_Principal'";
                    $respuesta=LocalExecuteQuery($consultaSql);
                    doGenerarJsonRespuesta($respuesta,0,1000);
        break;
        case "LST_LISTAR_INFORMACION": 
                    $sGlobalRuta_Principal = $_REQUEST["globalRUTA_IDPrincipal"];
                    $consultaSql = "SELECT *,NROP.BUSES AS BUSES2 , NROP2.PARADAS AS PARADAS2
                                    FROM (SELECT *,COUNT(RUTAS_BUSES_ID) AS BUSES 
                                    FROM mb_rutas_buses
                                    WHERE RUTAS_BUSES_ESTADO = 'ACTIVO' AND RUTAS_BUSES_RUTA_ID = '$sGlobalRuta_Principal') AS NROP,
                                    (SELECT *,COUNT(PARADA_ID) AS PARADAS 
                                    FROM mb_rutas INNER JOIN mb_paradas ON RUTA_ID = PARADA_RUTA_ID
                                    WHERE RUTA_ID = '$sGlobalRuta_Principal' AND PARADA_ESTADO = 'ACTIVO' ) AS NROP2";
                    $respuesta=LocalExecuteQuery($consultaSql);
                    doGenerarJsonRespuesta($respuesta,0,1000);
        break;



        
        case "CLONAR_PARADASRUTAS": 
                    $jsGlobalRUTAS_BUSES_RUTA_ID = $_REQUEST["globalRUTA_ID_CLONACION"];
                    $TRN_CLONAR_DESCRIPCION = $_REQUEST["TRN_CLONAR_DESCRIPCION"];
                    $TRN_CLONAR_DETALLE = $_REQUEST["TRN_CLONAR_DETALLE"];
                    $sRegistrado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
                    $sModificado = strftime( "%Y-%m-%d-%H-%M-%S", time() ); 
                    $sUsuario = $_SESSION["usr_session"];   
                    $sEstado = 'ACTIVO';
                    $consultaInsertar = "INSERT INTO MB_RUTAS (RUTA_DESCRIPCION,
                                                                RUTA_DETALLE,
                                                                RUTA_REGISTRO,
                                                                RUTA_MODIFICACION,
                                                                RUTA_USUARIO,
                                                                RUTA_ESTADO,
                                                                RUTA_TIPO_ESTADO,
                                                                RUTA_ID_CLON) 
                                                        VALUES ('$TRN_CLONAR_DESCRIPCION',
                                                                '$TRN_CLONAR_DETALLE',
                                                                '$sRegistrado',
                                                                '$sModificado',
                                                                '$sUsuario',
                                                                '$sEstado',                                                             
                                                                'ALTERNA',
                                                                '$jsGlobalRUTAS_BUSES_RUTA_ID')";   
                    //echo($consultaInsertar);                   
                    $respuesta2=LocalExecuteQuery($consultaInsertar);
                    $consultaListar =" SELECT MAX(RUTA_ID) AS RUTA_ID  FROM MB_RUTAS WHERE RUTA_ESTADO = 'ACTIVO'";
                    $respuestaListar=LocalExecuteQuery($consultaListar); 
                    $globalRUTA_ID_CLONADA=$respuestaListar[0]["RUTA_ID"];
                   // echo "cadena....";
                   // echo($globalRUTA_ID_CLONADA);
                    $consultaSql = "INSERT INTO mb_paradas(PARADA_DESCRIPCION,
                                    PARADA_DETALLE,
                                    PARADA_LONGITUD,
                                    PARADA_LATITUD,                                      
                                    PARADA_ORDEN,
                                    PARADA_REGISTRO,
                                    PARADA_MODIFICACION,
                                    PARADA_USUARIO,
                                    PARADA_ESTADO,
                                    PARADA_RUTA_ID,
                                    PARADA_TIPO,
                                    PARADA_KMS,
                                    PARADA_CLONACION_ID
                                    )
                                    SELECT PARADA_DESCRIPCION,
                                    PARADA_DETALLE,
                                    PARADA_LONGITUD,
                                    PARADA_LATITUD,
                                    PARADA_ORDEN,
                                    '$sRegistrado',
                                    '$sModificado',
                                    '$sUsuario',
                                    '$sEstado',
                                    '$globalRUTA_ID_CLONADA',
                                    PARADA_TIPO,
                                    PARADA_KMS,
                                    '$jsGlobalRUTAS_BUSES_RUTA_ID'
                                    FROM mb_paradas 
                                    WHERE  PARADA_RUTA_ID = '$jsGlobalRUTAS_BUSES_RUTA_ID'";                      
                   // echo($consultaSql);
                    $respuesta=LocalExecuteQuery($consultaSql);
                    doGenerarJsonRespuesta($respuesta,0,10000);                       
         break; 
         case "ASIGNAR_PRINCIPAL_ALTERNA": 
                    $sGlobalRuta_Principal = $_REQUEST["globalRuta_Principal"];
                    $sGlobalRUTA_IDPrincipal = $_REQUEST["globalRUTA_IDPrincipal"];
                    $sGlobalRuta_Alterna = $_REQUEST["globalRuta_Alterna"];
                    $sGlobalRUTA_IDAlterno = $_REQUEST["globalRUTA_IDAlterno"];
                    $sRUTA_ID_CLON = $_REQUEST["RUTA_ID_CLON"];
                    
                    $sRegistrado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
                    $sModificado = strftime( "%Y-%m-%d-%H-%M-%S", time() ); 
                    $sUsuario = $_SESSION["usr_session"];   
                    $sEstado = 'ACTIVO';

                    $consultaSql11 = "SELECT RUTAS_BUSES_ID,RUTAS_BUSES_RUTA_ID, (SELECT(COUNT(RUTAS_BUSES_ID)) AS TOT FROM mb_rutas_buses WHERE RUTAS_BUSES_RUTA_ID='$sGlobalRUTA_IDPrincipal') AS TOTAL
                                    FROM mb_rutas_buses
                                    WHERE RUTAS_BUSES_RUTA_ID='$sGlobalRUTA_IDPrincipal' AND RUTAS_BUSES_ESTADO='ACTIVO'";
                  
                    $respuesta11=LocalExecuteQuery($consultaSql11);
                    $cont=$respuesta11[0]["TOTAL"];
                    if($cont!=0)
                    {
                        for($ii=0; $ii<$cont; $ii++)
                        {
                            $ID=$respuesta11[$ii]["RUTAS_BUSES_ID"];
                            $consultaSql22 = "UPDATE mb_rutas_buses 
                                    SET  RUTAS_BUSES_RUTA_ID='$sGlobalRUTA_IDAlterno'
                                    WHERE RUTAS_BUSES_ID = $ID";
                           // echo($consultaSql);
                            $respuesta22=LocalExecuteQuery($consultaSql22);
                            
                        }

                    }

                    
                    $consultaSql = "UPDATE MB_RUTAS 
                                    SET  RUTA_TIPO_ESTADO='ALTERNA',
                                         RUTA_ID_CLON = '$sGlobalRUTA_IDAlterno'
                                    WHERE RUTA_ID = '$sGlobalRUTA_IDPrincipal'";
                   // echo($consultaSql);
                    $respuesta=LocalExecuteQuery($consultaSql);
                    $consultaSql2 = "UPDATE MB_RUTAS 
                                    SET  RUTA_TIPO_ESTADO='PRINCIPAL',
                                         RUTA_ID_CLON = '$sGlobalRUTA_IDPrincipal'
                                    WHERE RUTA_ID = '$sGlobalRUTA_IDAlterno'";
                    //echo($consultaSql2);
                    $respuesta2=LocalExecuteQuery($consultaSql2);
                    doGenerarJsonRespuesta($respuesta3,0,1000);
        break; 
            
        case "ASIGNAR_PRINCIPAL_ALTERNA_MODIFICAR": 
                    $sGlobalRuta_Principal = $_REQUEST["globalRuta_Principal"];
                    $sGlobalRUTA_IDPrincipal = $_REQUEST["globalRUTA_IDPrincipal"];
                    $sGlobalRuta_Alterna = $_REQUEST["globalRuta_Alterna"];
                    $sGlobalRUTA_IDAlterno = $_REQUEST["globalRUTA_IDAlterno"];
                    $sRUTA_ID_CLON = $_REQUEST["RUTA_ID_CLON"];
                    
                    $sRegistrado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
                    $sModificado = strftime( "%Y-%m-%d-%H-%M-%S", time() ); 
                    $sUsuario = $_SESSION["usr_session"];   
                    $sEstado = 'ACTIVO';
                    $consultaSql = "UPDATE MB_RUTAS 
                                    SET  RUTA_TIPO_ESTADO='PRINCIPAL',
                                         RUTA_ID_CLON = '$sGlobalRUTA_IDAlterno'
                                    WHERE RUTA_ID = '$sGlobalRUTA_IDPrincipal'";
                    echo($consultaSql);
                    $respuesta=LocalExecuteQuery($consultaSql);
                    $consultaSql2 = "UPDATE MB_RUTAS 
                                    SET  RUTA_TIPO_ESTADO='ALTERNA',
                                         RUTA_ID_CLON = '$sGlobalRUTA_IDPrincipal'
                                    WHERE RUTA_ID = '$sGlobalRUTA_IDAlterno'";
                    echo($consultaSql2);
                    $consultaSql3 = "INSERT INTO mb_rutas_buses('$sGlobalRUTA_IDAlterno',
                                                            RUTAS_BUSES_TIPO_HERRAMIENTA_ID,
                                                            RUTAS_BUSES_REGISTRADO, 
                                                            RUTAS_BUSES_MODIFICADO,
                                                            RUTAS_BUSES_USUARIO,
                                                            RUTAS_BUSES_ESTADO)
                                                            SELECT RUTAS_BUSES_RUTA_ID,
                                                                   RUTAS_BUSES_TIPO_HERRAMIENTA_ID,
                                                                   '$sRegistrado',                                    
                                                                   '$sModificado',
                                                                   '$sUsuario',
                                                                   '$sEstado'
                                                            FROM mb_rutas_buses 
                                                            WHERE  RUTAS_BUSES_RUTA_ID = '$sGlobalRUTA_IDPrincipal'";
                 
                    echo($consultaSql3);
                    $respuesta3=LocalExecuteQuery($consultaSql3);
                    doGenerarJsonRespuesta($respuesta3,0,1000);
        break;
    }
} catch (Exception $e) {
    echo null;
}
LocalCerrarConexion();
?>