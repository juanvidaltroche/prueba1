<?php
require('dbVersion02.php');
LocalInstanciarConexion();

try {
    $option = $_REQUEST["option"];

    switch ($option) {
        case "LST": $pageSize = $_REQUEST["pageSize"];                  
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
                    $consultaSql = "SELECT * FROM MB_PARADAS 
                                    INNER JOIN mb_rutas ON PARADA_RUTA_ID=RUTA_ID
                                    WHERE PARADA_ESTADO='ACTIVO' ORDER BY PARADA_RUTA_ID";
					$respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,$start,$limit);
                    break;

        case "LST_RUTAS": 
                    $sglobalRUTA_ID = $_REQUEST["globalRUTA_ID"];                  
                    $consultaSql = "SELECT * FROM MB_PARADAS 
                                    INNER JOIN mb_rutas ON PARADA_RUTA_ID=RUTA_ID
                                    WHERE PARADA_ESTADO='ACTIVO' AND PARADA_RUTA_ID = '$sglobalRUTA_ID' ORDER BY PARADA_RUTA_ID";
                    $respuesta=LocalExecuteQuery($consultaSql);
                    doGenerarJsonRespuesta($respuesta,0,1000);
        break;
		case "LST1":$pageSize = $_REQUEST["pageSize"];
					$idRuta = $_REQUEST["idRuta"];
					//echo $idRuta;
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
                    $consultaSql = "SELECT PARADA_DESCRIPCION,PARADA_DETALLE,PARADA_LONGITUD,PARADA_LATITUD,PARADA_ORDEN,PARADA_ESTADO
					FROM MB_RTS_PRDS     
					INNER JOIN MB_RUTAS ON RTS_PRD_RUTA_ID=RUTA_ID 
					INNER JOIN MB_PARADAS ON RTS_PRD_PARADA_ID=PARADA_ID 
					WHERE RUTA_ID='$idRuta' AND RUTA_ESTADO='ACTIVO' AND PARADA_ESTADO='ACTIVO' AND RTS_PRD_ESTADO='ACTIVO' ORDER BY RUTA_ID";
					$respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,$start,$limit);
                    break;
         case "LSTCOMBO_PARADAS": $pageSize = $_REQUEST["pageSize"];                  
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
                    $consultaSql = "SELECT RUTA_ID,RUTA_DESCRIPCION,RUTA_DETALLE
									FROM mb_rutas
									WHERE RUTA_ESTADO = 'ACTIVO'";
					$respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,$start,$limit);
                    break;
        case "CUENTA_ORDEN":
                    $cuenta = "SELECT COUNT(*) AS PARADA_ORDEN
                                FROM mb_paradas
                                WHERE PARADA_ESTADO = 'ACTIVO' AND PARADA_RUTA_ID = '$sParadaRutaId' 
                                AND PARADA_DETALLE = '$sGlobalDetalle'";
                    $respuestacuenta= LocalExecuteQuery($cuenta);
        break;         
        case "NEW":
					
                    $sParadaDescripcion = $_REQUEST["PARADA_DESCRIPCION"];
					$sParadaRutaId= $_REQUEST["sRUTA_ID"];
                    $sGlobalDetalle = utf8_decode($_REQUEST["globalDetalle"]);	
                    $sParadaDetalle = $_REQUEST["PARADA_DETALLE"];	
					$sParadaLongitud= $_REQUEST["PARADA_LONGITUD"];	
					//$sParadaLongitud= "111";	
					$sParadaLatitud = $_REQUEST["PARADA_LATITUD"];						
					//$sParadaLatitud = "222";
					//$sParadaOrden = $_REQUEST["PARADA_ORDEN"];						
					$sUsuario =$_SESSION["usr_session"];
                    $sParadaEstado = 'ACTIVO';
					$sfecha = strftime( "%Y-%m-%d-%H-%M-%S", time() );
                    $cuenta = "SELECT COUNT(*) AS PARADA_ORDEN
                                FROM mb_paradas
                                WHERE PARADA_ESTADO = 'ACTIVO' AND PARADA_RUTA_ID = '$sParadaRutaId' 
                                AND PARADA_DETALLE = '$sGlobalDetalle'";
                    //echo($cuenta);
                    $respuestacuenta= LocalExecuteQuery($cuenta);
                    $orden = $respuestacuenta[0]["PARADA_ORDEN"];
                    if($orden == '0')
                    {

                    $consultaSql = "INSERT INTO MB_PARADAS (PARADA_DESCRIPCION,PARADA_DETALLE,PARADA_LONGITUD,PARADA_LATITUD,PARADA_ORDEN,PARADA_RUTA_ID,PARADA_REGISTRO,PARADA_USUARIO,PARADA_ESTADO) 
                             VALUES ('$sParadaDescripcion','$sParadaDetalle','$sParadaLongitud','$sParadaLatitud','1','$sParadaRutaId','$sfecha','$sUsuario','$sParadaEstado') ";
					//echo($consultaSql);
                    $respuesta=LocalExecuteQuery($consultaSql);
                    }
                    else
                    {
                        $orden = $orden + 1;
                        $consultaSql = "INSERT INTO MB_PARADAS (PARADA_DESCRIPCION,PARADA_DETALLE,PARADA_LONGITUD,PARADA_LATITUD,PARADA_ORDEN,PARADA_RUTA_ID,PARADA_REGISTRO,PARADA_USUARIO,PARADA_ESTADO) 
                             VALUES ('$sParadaDescripcion','$sParadaDetalle','$sParadaLongitud','$sParadaLatitud','$orden','$sParadaRutaId','$sfecha','$sUsuario','$sParadaEstado')";
                    //echo($consultaSql);
                    $respuesta=LocalExecuteQuery($consultaSql);
                    }  
					doGenerarJsonRespuesta($respuesta,10,10);
         break;
		case "UPD": $sI = $_REQUEST["i"];
					$sParadaDescripcionUpd = $_REQUEST["PARADA_DESCRIPCION"];
					$sParadaRuta = $_REQUEST["RUTA_ID"];
                    $sParadaDetalleUpd = utf8_decode($_REQUEST["PARADA_DETALLE"]);	
					$sParadaLongitudUpd= $_REQUEST["PARADA_LONGITUD"];	
					$sParadaLatitudUpd = $_REQUEST["PARADA_LATITUD"];
					//$sParadaOrdenUpd = $_REQUEST["PARADA_ORDEN"];	
		            $sParadaEstadoUpd = 'ACTIVO';
                    $consultaSql = "UPDATE MB_PARADAS SET PARADA_DESCRIPCION='$sParadaDescripcionUpd',
                    									  PARADA_RUTA_ID ='$sParadaRuta',
                    									  PARADA_DETALLE='$sParadaDetalleUpd',
                    									  PARADA_LONGITUD='$sParadaLongitudUpd',
                    									  PARADA_LATITUD='$sParadaLatitudUpd',
                    									  
                    									  PARADA_ESTADO='$sParadaEstadoUpd' 
                    									  WHERE PARADA_ID='$sI'";	
                   // echo($consultaSql);				
                    $respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,10,10);
                    break;									
        case "DEL": $sI = $_REQUEST["i"];
					//echo $sI;
                    $consultaSql = "UPDATE MB_PARADAS SET PARADA_ESTADO = 'INACTIVO'  WHERE PARADA_ID = '$sI'";
                    $respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,10,10);
                    break;
        case "LST_TURNOS": 
                    //$sHospital_id = $_REQUEST["jsGlobal_TF_HSP_ID"];
                    $consultaSql = "SELECT RUTA_ID,RUTA_DESCRIPCION,RUTA_DETALLE,RUTA_ESTADO FROM MB_RUTAS WHERE RUTA_ESTADO='ACTIVO'";
                    $respuesta=LocalExecuteQuery($consultaSql);
                    doGenerarJsonRespuesta($respuesta,0,1000);
        break;
		
    }
} catch (Exception $e) {
    echo null;
}
 LocalCerrarConexion();
?>