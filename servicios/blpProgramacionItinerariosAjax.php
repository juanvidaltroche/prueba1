<?php
//session_start();
require('dbVersion02.php');
LocalInstanciarConexion();


function doInsert($cadenaSql,$jsglobalRUTA_ID_CLONACION,$PROGRAMACION_IT_TIPO_HERRAMIENTA_ID,$diaSemana,$fechaInsertar,$usuario)
{
	$fechaInsertar01 = $fechaInsertar;
	if($diaSemana != "")
	{
		$sContenidoAuxiliar = explode('<br>', $diaSemana);
		
		$cadenaAux = "('$jsglobalRUTA_ID_CLONACION','$PROGRAMACION_IT_TIPO_HERRAMIENTA_ID','$fechaInsertar01','$usuario'),";
		$cadenaSql = $cadenaSql.$cadenaAux;
	}
	return $cadenaSql;
	//echo();
}
try {
    $option = $_REQUEST["option"];
    switch ($option) {
 		
        case "LST": 

            $consultaSql = "SELECT TIPO_HERRAMIENTA_CODIGO,TIPO_HERRAMIENTA_ID,RUTAS_BUSES_RUTA_ID,
									TIPO_HERRAMIENTA_DESCRIPCION,
									DATE(PROGRAMACION_IT_MODIFICADO) AS PROGRAMACION_IT_MODIFICADO ,
									DATE(PROGRAMACION_IT_REGISTRADO) AS PROGRAMACION_IT_REGISTRADO,
									PROGRAMACION_IT_LUNES AS LUNES, PROGRAMACION_IT_MARTES AS MARTES, PROGRAMACION_IT_MIERCOLES AS MIERCOLES, PROGRAMACION_IT_JUEVES AS JUEVES, PROGRAMACION_IT_VIERNES AS VIERNES, PROGRAMACION_IT_SABADO AS SABADO, PROGRAMACION_IT_DOMINGO AS DOMINGO 
 									FROM  mb_rutas_buses 
									INNER JOIN mb_tipos_herramienta ON TIPO_HERRAMIENTA_ID = RUTAS_BUSES_TIPO_HERRAMIENTA_ID 
									LEFT JOIN (SELECT *
							FROM mb_programacion_itinerarios
							WHERE PROGRAMACION_IT_RUTA_ID = '1'  AND PROGRAMACION_IT_ESTADO = 'ACTIVO') FILTRADO
							ON RUTAS_BUSES_TIPO_HERRAMIENTA_ID = PROGRAMACION_IT_TIPO_HERRAMIENTA_ID 
							WHERE   RUTAS_BUSES_RUTA_ID = '1' AND RUTAS_BUSES_ESTADO = 'ACTIVO'";
 	
			$respuesta=LocalExecuteQuery($consultaSql);
			doGenerarJsonRespuesta($respuesta,0,1000);

		break;		

case "BUSQUEDAFECHA": //$pageSize = $_REQUEST["pageSize"];                  
           	
           	$sFechaInicio = $_REQUEST["vFechaInicio"];
			$sFechaFinal = $_REQUEST["vFechaFinal"];
			$sglobalRUTA_ID = $_REQUEST["globalRUTA_ID"];

            $consultaSql = "SELECT TIPO_HERRAMIENTA_CODIGO,TIPO_HERRAMIENTA_ID,RUTAS_BUSES_RUTA_ID,
									TIPO_HERRAMIENTA_DESCRIPCION,
									DATE(PROGRAMACION_IT_MODIFICADO) AS PROGRAMACION_IT_MODIFICADO ,
									DATE(PROGRAMACION_IT_REGISTRADO) AS PROGRAMACION_IT_REGISTRADO,
									PROGRAMACION_IT_LUNES AS LUNES, PROGRAMACION_IT_MARTES AS MARTES, PROGRAMACION_IT_MIERCOLES AS MIERCOLES, PROGRAMACION_IT_JUEVES AS JUEVES, 
									PROGRAMACION_IT_VIERNES AS VIERNES, PROGRAMACION_IT_SABADO AS SABADO, PROGRAMACION_IT_DOMINGO AS DOMINGO 
 									FROM  mb_rutas_buses 
									INNER JOIN mb_tipos_herramienta ON TIPO_HERRAMIENTA_ID = RUTAS_BUSES_TIPO_HERRAMIENTA_ID 
									LEFT JOIN (SELECT *
									FROM mb_programacion_itinerarios
									WHERE PROGRAMACION_IT_RUTA_ID = '$sglobalRUTA_ID'  AND PROGRAMACION_IT_ESTADO = 'ACTIVO') FILTRADO
									ON RUTAS_BUSES_TIPO_HERRAMIENTA_ID = PROGRAMACION_IT_TIPO_HERRAMIENTA_ID 
									WHERE   RUTAS_BUSES_RUTA_ID = '$sglobalRUTA_ID' AND RUTAS_BUSES_ESTADO = 'ACTIVO' AND (DATE(PROGRAMACION_IT_FECHA_MATRIZ) BETWEEN '$sFechaInicio' AND '$sFechaFinal')";
 			//echo($consultaSql);
			$respuesta=LocalExecuteQuery($consultaSql);
			doGenerarJsonRespuesta($respuesta,0,1000);

		break;		
					
case "LST_CALENDARIO_COMBO_CONSULTORIO": 	
					$jsGlobal_RutaId = $_REQUEST["globalRUTA_ID"];	
					$sUsuario = $_SESSION["usr_session"];	
					
					$respuestaFinal = null;
								
					$consultaSql = " SELECT TIPO_HERRAMIENTA_CODIGO,TIPO_HERRAMIENTA_ID,RUTAS_BUSES_RUTA_ID,
									TIPO_HERRAMIENTA_DESCRIPCION,
									DATE(PROGRAMACION_IT_MODIFICADO) AS PROGRAMACION_IT_MODIFICADO ,
									DATE(PROGRAMACION_IT_REGISTRADO) AS PROGRAMACION_IT_REGISTRADO,
									PROGRAMACION_IT_LUNES AS LUNES, PROGRAMACION_IT_MARTES AS MARTES, PROGRAMACION_IT_MIERCOLES AS MIERCOLES, PROGRAMACION_IT_JUEVES AS JUEVES, PROGRAMACION_IT_VIERNES AS VIERNES, PROGRAMACION_IT_SABADO AS SABADO, PROGRAMACION_IT_DOMINGO AS DOMINGO 
 									FROM  mb_rutas_buses 
									INNER JOIN mb_tipos_herramienta ON TIPO_HERRAMIENTA_ID = RUTAS_BUSES_TIPO_HERRAMIENTA_ID 
									LEFT JOIN (SELECT *
									FROM mb_programacion_itinerarios
									WHERE PROGRAMACION_IT_RUTA_ID = '$jsGlobal_RutaId'  AND PROGRAMACION_IT_ESTADO = 'ACTIVO') FILTRADO
									ON RUTAS_BUSES_TIPO_HERRAMIENTA_ID = PROGRAMACION_IT_TIPO_HERRAMIENTA_ID 
									WHERE   RUTAS_BUSES_RUTA_ID = '$jsGlobal_RutaId' AND RUTAS_BUSES_ESTADO = 'ACTIVO' ";
					//echo ($consultaSql);
				    $respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,0,1000);
		break;

		case "NEW_ITINERARIO": 
						
					$GlobalNombreAnfitrion = $_REQUEST["GlobalNombreAnfitrion"];
					$globalNombre = $_REQUEST["globalNombre"];
					$globalC_DESCRIPCION = $_REQUEST["globalC_DESCRIPCION"];	
					$jsGlobalDiaSemana = $_REQUEST["jsGlobalDiaSemana"];
					$jsGlobalTIPO_HERRAMIENTA_ID = $_REQUEST["GlobalTIPO_HERRAMIENTA_ID"];
					$jsGlobalRUTAS_BUSES_RUTA_ID = $_REQUEST["GlobalRUTAS_BUSES_RUTA_ID"];
					$jsGlobalPROGRAMACION_IT_REGISTRADO = $_REQUEST["GlobalPROGRAMACION_IT_REGISTRADO"];
					
					$sRegistrado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sModificado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sUsuario = $_SESSION["usr_session"];

					$consultaSql1 = "SELECT COUNT(*) AS NUMERO_REGISTROS
									FROM mb_programacion_itinerarios
									WHERE PROGRAMACION_IT_RUTA_ID = '$jsGlobalRUTAS_BUSES_RUTA_ID' 
									AND PROGRAMACION_IT_TIPO_HERRAMIENTA_ID = '$jsGlobalTIPO_HERRAMIENTA_ID' 
									AND PROGRAMACION_IT_ESTADO = 'ACTIVO'";
					//echo $consultaSql;die;
					$respuesta1=LocalExecuteQuery($consultaSql1);
					$numeroRegistros = $respuesta1[0]["NUMERO_REGISTROS"];
					//echo($numeroRegistros);
					if($numeroRegistros == '0')
					{
					$consultaSql = " INSERT INTO  mb_programacion_itinerarios
										  ( PROGRAMACION_IT_RUTA_ID, 
											PROGRAMACION_IT_TIPO_HERRAMIENTA_ID, 
											PROGRAMACION_IT_$jsGlobalDiaSemana,
											PROGRAMACION_IT_FECHA_$jsGlobalDiaSemana,
											PROGRAMACION_IT_REGISTRADO,
											PROGRAMACION_IT_MODIFICADO, 
											PROGRAMACION_IT_USUARIO,
											PROGRAMACION_IT_FECHA_MATRIZ
										    )
										 VALUES (
										 	'$jsGlobalRUTAS_BUSES_RUTA_ID', 
										 	'$jsGlobalTIPO_HERRAMIENTA_ID',
										 	'$globalNombre<br>$GlobalNombreAnfitrion<br>$globalC_DESCRIPCION<br><h3><p><b>Fecha: $jsGlobalPROGRAMACION_IT_REGISTRADO</b></p></h3>', 
										 	'$jsGlobalPROGRAMACION_IT_REGISTRADO',
										 	'$sRegistrado',
										 	'$sModificado',
										 	'$sUsuario',
										 	'$jsGlobalPROGRAMACION_IT_REGISTRADO')";
					//echo ($consultaSql);
				    $respuestaFinal=LocalExecuteQuery($consultaSql);
				    doGenerarJsonRespuesta($respuestaFinal,0,10);
				    }
					else
					{
					$consultaSql = "UPDATE mb_programacion_itinerarios 
										SET    PROGRAMACION_IT_USUARIO = '$sUsuario', PROGRAMACION_IT_FECHA_MATRIZ='$jsGlobalPROGRAMACION_IT_REGISTRADO',
											   PROGRAMACION_IT_$jsGlobalDiaSemana = '$globalNombre<br>$GlobalNombreAnfitrion<br>$globalC_DESCRIPCION<br><h3><p><b>Fecha: $jsGlobalPROGRAMACION_IT_REGISTRADO</b></p></h3>',
											   PROGRAMACION_IT_FECHA_$jsGlobalDiaSemana ='$jsGlobalPROGRAMACION_IT_REGISTRADO'
											WHERE PROGRAMACION_IT_RUTA_ID = '$jsGlobalRUTAS_BUSES_RUTA_ID' 
											AND PROGRAMACION_IT_TIPO_HERRAMIENTA_ID = '$jsGlobalTIPO_HERRAMIENTA_ID' 
											AND PROGRAMACION_IT_ESTADO = 'ACTIVO'";
					echo ($consultaSql);
					$respuestaFinal=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuestaFinal,0,10);
					}
					doGenerarJsonRespuesta($respuestaFinal,0,10);
		break;
					
		case "DELETE":
					//reformulando inicio =======================================================
					$globalC_DESCRIPCION = $_REQUEST["globalC_DESCRIPCION"];	
					$jsGlobalDiaSemana = $_REQUEST["jsGlobalDiaSemana"];
					$jsGlobalTIPO_HERRAMIENTA_ID = $_REQUEST["GlobalTIPO_HERRAMIENTA_ID"];
					$jsGlobalRUTAS_BUSES_RUTA_ID = $_REQUEST["GlobalRUTAS_BUSES_RUTA_ID"];
					$sUsuario = $_SESSION["usr_session"];		
					$jsGlobalDiaSemana = $_REQUEST["jsGlobalDiaSemana"];
					$sUsuario = $_SESSION["usr_session"];	
					$consultaSql = "UPDATE mb_programacion_itinerarios 
										SET    PROGRAMACION_IT_USUARIO = '$sUsuario', 
											   PROGRAMACION_IT_$jsGlobalDiaSemana = '' 
											WHERE PROGRAMACION_IT_RUTA_ID = '$jsGlobalRUTAS_BUSES_RUTA_ID' 
											AND PROGRAMACION_IT_TIPO_HERRAMIENTA_ID = '$jsGlobalTIPO_HERRAMIENTA_ID' 
											AND PROGRAMACION_IT_ESTADO = 'ACTIVO'";
					$respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,0,10000);
					break;
		case "CLONAR_PLANIFICACION": 
                    $GlobalFechaIni = $_REQUEST ["GlobalFechaIni"];
                    $GlobalFechaFin = $_REQUEST ["GlobalFechaFin"];                    
	 				$jsGlobalDiaSemana = $_REQUEST["jsGlobalDiaSemana"];
					$jsGlobalTIPO_HERRAMIENTA_ID = $_REQUEST["GlobalTIPO_HERRAMIENTA_ID"];
					$jsGlobalRUTAS_BUSES_RUTA_ID = $_REQUEST["globalRUTA_ID_CLONACION"];
					$globalRUTA_ID_CLONADA = $_REQUEST["globalRUTA_ID_CLONADA"];
					$jsGlobalContenidoDiaSemana = $_REQUEST["jsGlobalContenidoDiaSemana"];
					
					$sContenidoAuxiliar = explode("<br>", $jsGlobalContenidoDiaSemana);
					$sRegistrado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sModificado = strftime( "%Y-%m-%d-%H-%M-%S", time() );	
					$sUsuario = $_SESSION["usr_session"];	
					$sEstado = 'ACTIVO';
					//if($jsGlobalRUTAS_BUSES_RUTA_ID == $globalRUTA_ID_CLONADA)
					//{
					$consultaSql = "INSERT INTO mb_programacion_itinerarios(PROGRAMACION_IT_RUTA_ID,
												PROGRAMACION_IT_TIPO_HERRAMIENTA_ID,
												PROGRAMACION_IT_LUNES,
												PROGRAMACION_IT_MARTES,
												PROGRAMACION_IT_MIERCOLES,
												PROGRAMACION_IT_JUEVES,
												PROGRAMACION_IT_VIERNES,
												PROGRAMACION_IT_SABADO,
												PROGRAMACION_IT_DOMINGO,
												PROGRAMACION_IT_REGISTRADO,
												PROGRAMACION_IT_MODIFICADO,
												PROGRAMACION_IT_USUARIO,
												PROGRAMACION_IT_ESTADO)
												SELECT '$globalRUTA_ID_CLONADA',
												PROGRAMACION_IT_TIPO_HERRAMIENTA_ID,
												PROGRAMACION_IT_LUNES,
												PROGRAMACION_IT_MARTES,
												PROGRAMACION_IT_MIERCOLES,
												PROGRAMACION_IT_JUEVES,
												PROGRAMACION_IT_VIERNES,
												PROGRAMACION_IT_SABADO,
												PROGRAMACION_IT_DOMINGO,
												'$sRegistrado',
												'$sModificado',
												'$sUsuario',
												'$sEstado'
												FROM mb_programacion_itinerarios 
												WHERE  PROGRAMACION_IT_RUTA_ID = '$jsGlobalRUTAS_BUSES_RUTA_ID' AND (DATE(PROGRAMACION_IT_FECHA_MATRIZ) BETWEEN '$GlobalFechaIni' AND '$GlobalFechaFin')";						
					//echo($consultaSql);
					$respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,0,10000);
					
					//if()
					$consultaSql3 = "SELECT RUTAS_BUSES_ID,RUTAS_BUSES_RUTA_ID,RUTAS_BUSES_TIPO_HERRAMIENTA_ID,RUTAS_BUSES_ESTADO 
									 FROM mb_rutas_buses";							
					$respuestaidRutasHerramientas=LocalExecuteQuery($consultaSql3);
   				    $sRUTAS_BUSES_RUTA_ID=$respuestaidRutasHerramientas[0]["RUTAS_BUSES_RUTA_ID"];
   				    $sRUTAS_BUSES_TIPO_HERRAMIENTA_ID=$respuestaidRutasHerramientas[0]["RUTAS_BUSES_TIPO_HERRAMIENTA_ID"];
   				    if($sRUTAS_BUSES_RUTA_ID !=  $jsGlobalRUTAS_BUSES_RUTA_ID OR $jsGlobalTIPO_HERRAMIENTA_ID != $sRUTAS_BUSES_TIPO_HERRAMIENTA_ID)
   				    {
					$consultaSql2 = "INSERT INTO mb_rutas_buses(RUTAS_BUSES_RUTA_ID,
												RUTAS_BUSES_TIPO_HERRAMIENTA_ID,
												RUTAS_BUSES_REGISTRADO,
												RUTAS_BUSES_MODIFICADO,
												RUTAS_BUSES_USUARIO,
												RUTAS_BUSES_ESTADO)
												SELECT PROGRAMACION_IT_RUTA_ID,
												PROGRAMACION_IT_TIPO_HERRAMIENTA_ID,
												'$sRegistrado',
												'$sModificado',
												'$sUsuario',
												'$sEstado'
												FROM mb_programacion_itinerarios ";							
					//echo($consultaSql2);
					$respuesta2=LocalExecuteQuery($consultaSql2);
					}
					else
					{
					$consultaSql2 = "INSERT INTO mb_rutas_buses(RUTAS_BUSES_RUTA_ID,
												RUTAS_BUSES_TIPO_HERRAMIENTA_ID,
												RUTAS_BUSES_REGISTRADO,
												RUTAS_BUSES_MODIFICADO,
												RUTAS_BUSES_USUARIO,
												RUTAS_BUSES_ESTADO)
												SELECT PROGRAMACION_IT_RUTA_ID,
												PROGRAMACION_IT_TIPO_HERRAMIENTA_ID,
												'$sRegistrado',
												'$sModificado',
												'$sUsuario',
												'$sEstado'
												FROM mb_programacion_itinerarios ";							
					//echo($consultaSql2);
					$respuesta2=LocalExecuteQuery($consultaSql2);
					}
					doGenerarJsonRespuesta($respuesta2,0,10000);						
         break;		
		/*case "CLONAR_PLANIFICACION": 

					$jsGlobalDiaSemana = $_REQUEST["jsGlobalDiaSemana"];
					$jsGlobalTIPO_HERRAMIENTA_ID = $_REQUEST["GlobalTIPO_HERRAMIENTA_ID"];
					$jsGlobalRUTAS_BUSES_RUTA_ID = $_REQUEST["globalRUTA_ID_CLONACION"];
					$jsGlobalContenidoDiaSemana = $_REQUEST["jsGlobalContenidoDiaSemana"];
					$sContenidoAuxiliar = explode("<br>", $jsGlobalContenidoDiaSemana);
					//$sPresentacionId = trim ($sContenidoAuxiliar[0]);	
					$sUsuario = $_SESSION["usr_session"];	
					//a) seleccionamos los registros-semanales para clonar
					$consultaSql = "SELECT *
									FROM mb_programacion_itinerarios
									WHERE PROGRAMACION_IT_RUTA_ID = '$jsGlobalRUTAS_BUSES_RUTA_ID'";
					//echo $consultaSql;die;
					$respuesta=LocalExecuteQuery($consultaSql);
					//b) realizamos el primer while de confirmacion de fechas-correctas
					//$stringdatetimeFin = $jsFechaFinClonacion;
					//$datetimeInicio = new DateTime($jsFechaInicioClonacion);
					//$datetimeFin = new DateTime($jsFechaFinClonacion);
					//$interval = $datetimeInicio->diff($datetimeFin);
					// echo $interval."</br>";
					$stringdatetimeInicio = '2014/08/15';
					$numeroDias = 2;
					
					$contadorDias = 0;
					//echo "</br>".$numeroDias;
					//$sw = 0;
					$cadenaSql = "INSERT INTO  mb_rutas_buses
										( RUTAS_BUSES_RUTA_ID ,RUTAS_BUSES_TIPO_HERRAMIENTA_ID,RUTAS_BUSES_REGISTRADO,RUTAS_BUSES_USUARIO) 
										VALUES ";
					while ($contadorDias <= $numeroDias)
					{
						//c) foreach-asociado-tipos-turnos
						
						//$stringdatetimeInicio = new DateTime();
						foreach($respuesta as $row) {
							$FECHA_TF_LUNES 		= date('Y/m/d', strtotime($stringdatetimeInicio. ' + '.$contadorDias.' days'));
							$contadorDias = $contadorDias + 1;
							$FECHA_TF_MARTES 		= date('Y/m/d', strtotime($stringdatetimeInicio. ' + '.$contadorDias.' days'));
							$contadorDias = $contadorDias + 1;
							$FECHA_TF_MIERCOLES 	= date('Y/m/d', strtotime($stringdatetimeInicio. ' + '.$contadorDias.' days'));
							$contadorDias = $contadorDias + 1;
							$FECHA_TF_JUEVES 		= date('Y/m/d', strtotime($stringdatetimeInicio. ' + '.$contadorDias.' days'));
							$contadorDias = $contadorDias + 1;
							$FECHA_TF_VIERNES 		= date('Y/m/d', strtotime($stringdatetimeInicio. ' + '.$contadorDias.' days'));
							$contadorDias = $contadorDias + 1;
							$FECHA_TF_SABADO 		= date('Y/m/d', strtotime($stringdatetimeInicio. ' + '.$contadorDias.' days'));
							$contadorDias = $contadorDias + 1;
							$FECHA_TF_DOMINGO 		= date('Y/m/d', strtotime($stringdatetimeInicio. ' + '.$contadorDias.' days'));
							$contadorDias = $contadorDias + 1;
							$PROGRAMACION_IT_TIPO_HERRAMIENTA_ID = $row['PROGRAMACION_IT_TIPO_HERRAMIENTA_ID'];
							$cadenaSql = doInsert($cadenaSql,$jsGlobalRUTAS_BUSES_RUTA_ID,$PROGRAMACION_IT_TIPO_HERRAMIENTA_ID, $row['PROGRAMACION_IT_LUNES'], $FECHA_TF_LUNES, $sUsuario);
							$cadenaSql = doInsert($cadenaSql,$jsGlobalRUTAS_BUSES_RUTA_ID,$PROGRAMACION_IT_TIPO_HERRAMIENTA_ID, $row['PROGRAMACION_IT_MARTES'], $FECHA_TF_MARTES, $sUsuario);
							$cadenaSql = doInsert($cadenaSql,$jsGlobalRUTAS_BUSES_RUTA_ID,$PROGRAMACION_IT_TIPO_HERRAMIENTA_ID, $row['PROGRAMACION_IT_MIERCOLES'], $FECHA_TF_MIERCOLES, $sUsuario);
							$cadenaSql = doInsert($cadenaSql,$jsGlobalRUTAS_BUSES_RUTA_ID,$PROGRAMACION_IT_TIPO_HERRAMIENTA_ID, $row['PROGRAMACION_IT_JUEVES'], $FECHA_TF_JUEVES, $sUsuario);
							$cadenaSql = doInsert($cadenaSql,$jsGlobalRUTAS_BUSES_RUTA_ID,$PROGRAMACION_IT_TIPO_HERRAMIENTA_ID, $row['PROGRAMACION_IT_VIERNES'], $FECHA_TF_VIERNES, $sUsuario);
							$cadenaSql = doInsert($cadenaSql,$jsGlobalRUTAS_BUSES_RUTA_ID,$PROGRAMACION_IT_TIPO_HERRAMIENTA_ID, $row['PROGRAMACION_IT_SABADO'], $FECHA_TF_SABADO, $sUsuario);
							$cadenaSql = doInsert($cadenaSql,$jsGlobalRUTAS_BUSES_RUTA_ID,$PROGRAMACION_IT_TIPO_HERRAMIENTA_ID, $row['PROGRAMACION_IT_DOMINGO'], $FECHA_TF_DOMINGO, $sUsuario);
							// date_sub($stringdatetimeInicio, date_interval_create_from_date_string('7 days'));
							//$stringdatetimeInicio = $stringdatetimeInicio->sub(date_interval_create_from_date_string('7 days')); 
							$contadorDias = $contadorDias - 7;
						}
						
						//$stringdatetimeInicio = $date('Y/m/d', strtotime($stringdatetimeInicio. ' + 7 days'));
						$contadorDias = $contadorDias + 7;
						//echo "</br>".$cadenaSql;
					}
					$cadenaSql = substr($cadenaSql, 0, strlen ( $cadenaSql)-1);
					echo($cadenaSql);
					/*echo "<br />";
						print_r($cadenaSql); 
					echo "<br />";
					die;*/
					
			/*		$respuesta=LocalExecuteQuery($cadenaSql);
					doGenerarJsonRespuesta($respuesta,0,10000);					
                    break;*/
			case "LST_TURNOS": 
					//$sHospital_id = $_REQUEST["jsGlobal_TF_HSP_ID"];
					$consultaSql = "SELECT RUTA_ID,RUTA_DESCRIPCION,RUTA_DETALLE,RUTA_ESTADO FROM MB_RUTAS WHERE RUTA_ESTADO='ACTIVO'";

					$respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,0,1000);
			break;
			case "LST_CONDUCTORES": 
					//$sHospital_id = $_REQUEST["jsGlobal_TF_HSP_ID"];
					$consultaSql = "SELECT USUARIO_ID, USUARIO_CODIGO, CONCAT( FUNCIONARIO_NOMBRES, ',', FUNCIONARIO_PATERNO, ',', FUNCIONARIO_MATERNO ) AS NOMBRE 
									FROM sa_usuarios
									INNER JOIN mb_funcionarios ON FUNCIONARIO_ID = USUARIO_FUNCIONARIO_ID
									INNER JOIN sa_usuario_tipos_funcionario ON UTF_USUARIO_ID = USUARIO_ID
									WHERE UTF_TIPO_FUNCIONARIO_ID = '2'  AND UTF_ESTADO = 'A'";

					$respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,0,1000);
			break;
			case "LST_ANFITRIONES": 
					//$sHospital_id = $_REQUEST["jsGlobal_TF_HSP_ID"];
					$consultaSql = "SELECT USUARIO_ID, USUARIO_CODIGO, CONCAT( FUNCIONARIO_NOMBRES, ',', FUNCIONARIO_PATERNO, ',', FUNCIONARIO_MATERNO ) AS NOMBRE 
									FROM sa_usuarios
									INNER JOIN mb_funcionarios ON FUNCIONARIO_ID = USUARIO_FUNCIONARIO_ID
									INNER JOIN sa_usuario_tipos_funcionario ON UTF_USUARIO_ID = USUARIO_ID
									WHERE UTF_TIPO_FUNCIONARIO_ID = '5'  AND UTF_ESTADO = 'A'";

					$respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,0,1000);
			break;
			case "LST_TURNOS_CATALOGOS": 
					$consultaSql = "SELECT C_ID,C_DESCRIPCION,C_CLASIFICADOR
									FROM mb_catalogo 
									WHERE C_ESTADO = 'ACTIVO'";

					$respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,0,1000);
			break;


					
								
    }
} catch (Exception $e) {
    echo null;
}
LocalCerrarConexion();
?>