<?php
require('dbVersion02.php');
LocalInstanciarConexion();
try {
    $option = $_REQUEST["option"];
    switch ($option) {
        case "LST": //$sI = $_REQUEST["i"];
        			$pageSize = $_REQUEST["pageSize"]; 
        			$limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
                   
					$consultaSql = "SELECT 	RUTA_ID,RUTA_DESCRIPCION,RUTA_DETALLE,
											(SELECT COUNT( PARADA_ID )
                                            FROM mb_paradas
                                            WHERE PARADA_ESTADO = 'ACTIVO'
                                            AND RUTA_ID = PARADA_RUTA_ID) AS TOT_PARADA,
                                            (SELECT COUNT(RUTAS_BUSES_RUTA_ID)
                                            FROM mb_rutas_buses
                                            WHERE RUTAS_BUSES_ESTADO='ACTIVO'
                                            AND RUTAS_BUSES_RUTA_ID=RUTA_ID) AS TOT_BUSES,RUTA_TIPO_ESTADO
									FROM  mb_rutas 
									WHERE RUTA_ESTADO='ACTIVO' ORDER BY RUTA_ID DESC";
					
					$respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,$start,$limit);
					break;
	
		case "BUSES": 
		$pageSize = $_REQUEST["pageSize"]; 
        			$limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
					$consultaSql = "SELECT  TIPO_HERRAMIENTA_ID, 
											TIPO_HERRAMIENTA_CODIGO, 
											TIPO_BUSES_DESCRIPCION as TIPO_HERRAMIENTA_DESCRIPCION, 
											TIPO_HERRAMIENTA_ASIENTOS,
											TIPO_BUSES_ID,
											TIPO_BUSES_ICONO
									FROM mb_tipos_herramienta INNER JOIN mb_tipos_buses on TIPO_BUSES_ID = TIPO_HERRAMIENTA_DESCRIPCION
									WHERE TIPO_HERRAMIENTA_ESTADO='ACTIVO' AND TIPO_HERRAMIENTA_ESTADO_A='LIBRE' AND TIPO_BUSES_ESTADO LIKE 'ACTIVO'
									ORDER BY TIPO_HERRAMIENTA_ID ";
									
					$respuesta=LocalExecuteQuery($consultaSql);			
					doGenerarJsonRespuesta($respuesta,$start,$limit);
					break;

		case "LST_TIPO": 
        			$sTipo = $_REQUEST["vTipo"];
        			$pageSize = $_REQUEST["pageSize"];                  
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
					$consultaSql = "SELECT  TIPO_HERRAMIENTA_ID, 
											TIPO_HERRAMIENTA_CODIGO, 
											TIPO_BUSES_DESCRIPCION as TIPO_HERRAMIENTA_DESCRIPCION, 
											TIPO_HERRAMIENTA_ASIENTOS,
											TIPO_BUSES_ID,
											TIPO_BUSES_ICONO
									FROM mb_tipos_herramienta INNER JOIN mb_tipos_buses on TIPO_BUSES_ID = TIPO_HERRAMIENTA_DESCRIPCION
									WHERE TIPO_HERRAMIENTA_ESTADO='ACTIVO' AND TIPO_HERRAMIENTA_ESTADO_A='LIBRE' AND TIPO_BUSES_ESTADO LIKE 'ACTIVO' AND TIPO_HERRAMIENTA_DESCRIPCION='$sTipo'
									ORDER BY TIPO_HERRAMIENTA_ID";
					$respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,$start,$limit);
                    break;
							

		case "RUTABUS": 
		$pageSize = $_REQUEST["pageSize"]; 
        			$limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
					$Sid = $_REQUEST["vI"]; 
					$consultaSql = "SELECT  RUTAS_BUSES_ID,
											RUTAS_BUSES_RUTA_ID,
											RUTAS_BUSES_TIPO_HERRAMIENTA_ID, 
											TIPO_HERRAMIENTA_ID, 
											TIPO_HERRAMIENTA_ASIENTOS, 
											TIPO_HERRAMIENTA_CODIGO,
											TIPO_BUSES_ICONO,
											TIPO_BUSES_DESCRIPCION as TIPO_HERRAMIENTA_DESCRIPCION

									FROM  mb_rutas_buses INNER JOIN mb_tipos_herramienta ON TIPO_HERRAMIENTA_ID=RUTAS_BUSES_TIPO_HERRAMIENTA_ID
									INNER JOIN mb_tipos_buses on TIPO_BUSES_ID = TIPO_HERRAMIENTA_DESCRIPCION
									INNER JOIN mb_rutas ON RUTA_ID=RUTAS_BUSES_RUTA_ID
									WHERE RUTAS_BUSES_ESTADO='ACTIVO' AND  RUTAS_BUSES_RUTA_ID='$Sid' AND TIPO_BUSES_ESTADO LIKE 'ACTIVO' 
									ORDER BY RUTAS_BUSES_REGISTRADO";
									
					$respuesta=LocalExecuteQuery($consultaSql);								
					doGenerarJsonRespuesta($respuesta,$start,$limit);
					break;

			case "DELBUSALARUTA": 
					$sRutasBusesId = $_REQUEST["sRUTAS_BUSES_ID"]; 
					$sTipoHerramientaId = $_REQUEST["sTIPO_HERRAMIENTA_ID"]; 
					$consultaSql = "UPDATE  mb_tipos_herramienta SET  TIPO_HERRAMIENTA_ESTADO_A = 'LIBRE' 
									WHERE TIPO_HERRAMIENTA_ID ='$sTipoHerramientaId'";
				    $respuesta=LocalExecuteQuery($consultaSql);
					$consultaSql2 = "UPDATE mb_rutas_buses SET RUTAS_BUSES_ESTADO = 'INACTIVO' WHERE RUTAS_BUSES_ID ='$sRutasBusesId'";
					//UPDATE _dgir_cuadrillas_obreros SET _estado = 'B' WHERE id_asignacion_cuadrilla_obrero ='" + idObreroCuadrilla + "'				
					$respuesta2=LocalExecuteQuery($consultaSql2);								
					doGenerarJsonRespuesta($respuesta,0,10000);
			break;

			case "VUELTA2": 
        			$sI = $_REQUEST["sTIPO_RUTABUS_ID"];
					$sModificado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sUsuario = 'ADMIN';
					$sEstado 	= 'INACTIVO';	
					
                    $consultaSql = "UPDATE mb_rutas_buses SET	
									RUTAS_BUSES_MODIFICADO='$sModificado',
									RUTAS_BUSES_ESTADO='$sEstado'
										
									WHERE RUTAS_BUSES_ID = '$sI'";					
					
                    $respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,0,10);
            break;

            case "VUELTA1": 
        			$sI = $_REQUEST["sTIPO_HERRAMIENTA_ID"];
					$sModificado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sUsuario = 'ADMIN';
					$sEstado 	= 'LIBRE';	
					
                    $consultaSql = "UPDATE mb_tipos_herramienta SET	
									TIPO_HERRAMIENTA_MODIFICACION='$sModificado',
									TIPO_HERRAMIENTA_USUARIO='$sUsuario',
									TIPO_HERRAMIENTA_ESTADO_A='$sEstado'
										
									WHERE TIPO_HERRAMIENTA_ID = '$sI'";					
					
                    $respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,0,10);
            break;

            case "IDA1": 
					$sidBus = $_REQUEST["sTIPO_HERRAMIENTA_ID"];		
					$sidRuta = $_REQUEST["sRUTAS_BUSES_ID"];			
					$sRegistrado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sModificado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sUsuario = 'ADMIN';
					$sEstado 	= 'ACTIVO';	
					
                    $consultaSql = "INSERT INTO mb_rutas_buses(RUTAS_BUSES_ID, RUTAS_BUSES_RUTA_ID, RUTAS_BUSES_TIPO_HERRAMIENTA_ID, 
                    											RUTAS_BUSES_REGISTRADO, RUTAS_BUSES_MODIFICADO, RUTAS_BUSES_ESTADO) 
                             VALUES('',
									'$sidRuta',
									'$sidBus',
									'$sRegistrado',
									'$sModificado',
									'$sEstado') ";
					//echo ($consultaSql);
                    $respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,0,10);
            break;

            case "IDA2": 
        			$sI = $_REQUEST["sTIPO_HERRAMIENTA_ID"];
					$sModificado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sUsuario = 'ADMIN';
					$sEstado 	= 'OCUPADO';	
					
                    $consultaSql = "UPDATE mb_tipos_herramienta SET	
									TIPO_HERRAMIENTA_MODIFICACION='$sModificado',
									TIPO_HERRAMIENTA_USUARIO='$sUsuario',
									TIPO_HERRAMIENTA_ESTADO_A='$sEstado'
										
									WHERE TIPO_HERRAMIENTA_ID = '$sI'";					
					//echo ($consultaSql);
                    $respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,0,10);
            break;

			case "NEWBUSESPARADAS": 
					$sRutasBusesId = $_REQUEST["sTIPO_HERRAMIENTA_ID"]; 
					$sIdRuta = $_REQUEST["sIdRuta"]; 
				    //$sUsuario =$_SESSION["usr_session"];
                    $sParadaEstado = "ACTIVO";
					$sfechaRegistrado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sfechaModificado = strftime( "%Y-%m-%d-%H-%M-%S", time() );

					$consultaSql = "INSERT INTO mb_rutas_buses (RUTAS_BUSES_RUTA_ID,
																RUTAS_BUSES_TIPO_HERRAMIENTA_ID,
																RUTAS_BUSES_REGISTRADO,
																RUTAS_BUSES_MODIFICADO,
																RUTAS_BUSES_ESTADO) 
                            							 VALUES ('$sIdRuta',
                            						 			'$sRutasBusesId',                          						 			
                            						 			'$sfechaRegistrado',
                            						 			'$sfechaModificado',
                            						 			'$sParadaEstado'
                            						 			) ";
				    $respuesta=LocalExecuteQuery($consultaSql);
				    doGenerarJsonRespuesta($respuesta,0,10000);
				    $consultaSql2 = "UPDATE  mb_tipos_herramienta SET  TIPO_HERRAMIENTA_ESTADO_A = 'OCUPADO' 
									WHERE TIPO_HERRAMIENTA_ID ='$sRutasBusesId'";
				    $respuesta2=LocalExecuteQuery($consultaSql2);									
					doGenerarJsonRespuesta($respuesta2,0,10000);
			break;
			case "CANCELAR_ASIGNACIONPARADAS": 
					$sRUTAS_BUSES_ID = $_REQUEST["sRUTAS_BUSES_ID"];
					$sRUTAS_BUSES_TIPO_HERRAMIENTA_ID = $_REQUEST["sRUTAS_BUSES_TIPO_HERRAMIENTA_ID"];  
				    $consultaSql3 = "UPDATE   mb_rutas_buses SET  RUTAS_BUSES_ESTADO = 'INACTIVO' 
									WHERE  RUTAS_BUSES_ID='$sRUTAS_BUSES_ID'";
				    $respuesta3=LocalExecuteQuery($consultaSql3);									
					doGenerarJsonRespuesta($respuesta3,0,10000);
				    $consultaSql2 = "UPDATE   mb_tipos_herramienta SET  TIPO_HERRAMIENTA_ESTADO_A = 'LIBRE' 
									WHERE TIPO_HERRAMIENTA_ID ='$sRUTAS_BUSES_TIPO_HERRAMIENTA_ID'";
				    $respuesta2=LocalExecuteQuery($consultaSql2);									
					doGenerarJsonRespuesta($respuesta2,0,10000);


			break;


        
    }
} catch (Exception $e) {
    echo null;
}

?>