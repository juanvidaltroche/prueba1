<?php
//session_start();
require('dbVersion02.php');
LocalInstanciarConexion();


function doInsert($cadenaSql,$jsglobalRUTA_ID_CLONACION,$PROGRAMACION_IT_TIPO_HERRAMIENTA_ID,$diaSemana,$fechaInsertar,$usuario)
{
	//echo $diaSemana;
	/*
	INSERT INTO hsp_turnos 
	( TRN_HSP_ID, TRN_CNSL_ID, TRN_HSPCAT_ID, TRN_HSPUSR_MEDICO_ID, TRN_TPTRN_ID, TRN_FECHA, TRN_USUARIO) 
	VALUES 
	( 0, 0, 0, 0, 0, '', 0, 0, 0, 0, '', '');
	*/
	$fechaInsertar01 = $fechaInsertar;
	if($diaSemana != "")
	{
		$sContenidoAuxiliar = explode('<br>', $diaSemana);
		//print_r($sContenidoAuxiliar);
		//$TRN_HSPCAT_ID = trim ($sContenidoAuxiliar[2]);
		//$TRN_HSPUSR_MEDICO_ID = trim ($sContenidoAuxiliar[3]);
		//echo "</br>$TRN_HSPCAT_ID </br>";
									
		$cadenaAux = "('$jsglobalRUTA_ID_CLONACION','$PROGRAMACION_IT_TIPO_HERRAMIENTA_ID','$fechaInsertar01','$usuario'),";
		$cadenaSql = $cadenaSql.$cadenaAux;
	}
	return $cadenaSql;
	//echo();
}




try {
    $option = $_REQUEST["option"];
    switch ($option) {
 		
    	      
        case "LST": //$pageSize = $_REQUEST["pageSize"];                  
            // $sw = 0;
			//$sglobalRUTA_ID = $_REQUEST["globalRUTA_ID"];
          // if($sw==0)
          //   {

            $consultaSql = "(SELECT PROGRAMACION_IT_ID,ITINERARIOS_ID,RUTA_DESCRIPCION,TIPO_HERRAMIENTA_ID ,TIPO_HERRAMIENTA_CODIGO,			
									DATE(PROGRAMACION_IT_MODIFICADO) AS PROGRAMACION_IT_MODIFICADO ,
									DATE(PROGRAMACION_IT_REGISTRADO) AS PROGRAMACION_IT_REGISTRADO,
									PROGRAMACION_IT_LUNES AS DESCRIPCION,PROGRAMACION_IT_FECHA_MATRIZ,PROGRAMACION_IT_ESTADO,
									ITINERARIOS_HR_SALIDA,ITINERARIOS_HR_PUC,ITINERARIOS_HR_PUC2,ITINERARIOS_HR_LLEGADA,
									ITINERARIOS_FECHA
									FROM mb_itinerarios
									INNER JOIN mb_programacion_itinerarios ON PROGRAMACION_IT_ID = ITINERARIOS_PROGRAMACION_IT_ID
									INNER JOIN mb_tipos_herramienta ON TIPO_HERRAMIENTA_ID = PROGRAMACION_IT_TIPO_HERRAMIENTA_ID
									INNER JOIN mb_rutas ON RUTA_ID = PROGRAMACION_IT_RUTA_ID 
									WHERE  PROGRAMACION_IT_ESTADO = 'ACTIVO' AND  ITINERARIOS_ESTADO = 'ACTIVO' AND PROGRAMACION_IT_LUNES  LIKE '%2014/08/04%' AND  ITINERARIOS_FECHA = '2014-08-04')
									UNION
									(SELECT PROGRAMACION_IT_ID,ITINERARIOS_ID,RUTA_DESCRIPCION,TIPO_HERRAMIENTA_ID ,TIPO_HERRAMIENTA_CODIGO,			
									DATE(PROGRAMACION_IT_MODIFICADO) AS PROGRAMACION_IT_MODIFICADO ,
									DATE(PROGRAMACION_IT_REGISTRADO) AS PROGRAMACION_IT_REGISTRADO,
									PROGRAMACION_IT_MARTES AS DESCRIPCION,PROGRAMACION_IT_FECHA_MATRIZ,PROGRAMACION_IT_ESTADO,
									ITINERARIOS_HR_SALIDA,ITINERARIOS_HR_PUC,ITINERARIOS_HR_PUC2,ITINERARIOS_HR_LLEGADA,
									ITINERARIOS_FECHA
									FROM mb_itinerarios
									INNER JOIN mb_programacion_itinerarios ON PROGRAMACION_IT_ID = ITINERARIOS_PROGRAMACION_IT_ID
									INNER JOIN mb_tipos_herramienta ON TIPO_HERRAMIENTA_ID = PROGRAMACION_IT_TIPO_HERRAMIENTA_ID
									INNER JOIN mb_rutas ON RUTA_ID = PROGRAMACION_IT_RUTA_ID 
									WHERE  PROGRAMACION_IT_ESTADO = 'ACTIVO' AND  ITINERARIOS_ESTADO = 'ACTIVO' AND PROGRAMACION_IT_MARTES  LIKE '%2014/08/04%' AND ITINERARIOS_FECHA = '2014-08-04')
									UNION
									(SELECT PROGRAMACION_IT_ID,ITINERARIOS_ID,RUTA_DESCRIPCION,TIPO_HERRAMIENTA_ID ,TIPO_HERRAMIENTA_CODIGO,			
									DATE(PROGRAMACION_IT_MODIFICADO) AS PROGRAMACION_IT_MODIFICADO ,
									DATE(PROGRAMACION_IT_REGISTRADO) AS PROGRAMACION_IT_REGISTRADO,
									PROGRAMACION_IT_MIERCOLES AS DESCRIPCION,PROGRAMACION_IT_FECHA_MATRIZ,PROGRAMACION_IT_ESTADO,
									ITINERARIOS_HR_SALIDA,ITINERARIOS_HR_PUC,ITINERARIOS_HR_PUC2,ITINERARIOS_HR_LLEGADA,
									ITINERARIOS_FECHA
									FROM mb_itinerarios
									INNER JOIN mb_programacion_itinerarios ON PROGRAMACION_IT_ID = ITINERARIOS_PROGRAMACION_IT_ID
									INNER JOIN mb_tipos_herramienta ON TIPO_HERRAMIENTA_ID = PROGRAMACION_IT_TIPO_HERRAMIENTA_ID
									INNER JOIN mb_rutas ON RUTA_ID = PROGRAMACION_IT_RUTA_ID 
									WHERE  PROGRAMACION_IT_ESTADO = 'ACTIVO' AND  ITINERARIOS_ESTADO = 'ACTIVO' AND PROGRAMACION_IT_MIERCOLES  LIKE '%2014/08/04%' AND ITINERARIOS_FECHA = '2014-08-04')
									UNION
									(SELECT PROGRAMACION_IT_ID,ITINERARIOS_ID,RUTA_DESCRIPCION,TIPO_HERRAMIENTA_ID ,TIPO_HERRAMIENTA_CODIGO,			
									DATE(PROGRAMACION_IT_MODIFICADO) AS PROGRAMACION_IT_MODIFICADO ,
									DATE(PROGRAMACION_IT_REGISTRADO) AS PROGRAMACION_IT_REGISTRADO,
									PROGRAMACION_IT_JUEVES AS DESCRIPCION,PROGRAMACION_IT_FECHA_MATRIZ,PROGRAMACION_IT_ESTADO,
									ITINERARIOS_HR_SALIDA,ITINERARIOS_HR_PUC,ITINERARIOS_HR_PUC2,ITINERARIOS_HR_LLEGADA,
									ITINERARIOS_FECHA
									FROM mb_itinerarios
									INNER JOIN mb_programacion_itinerarios ON PROGRAMACION_IT_ID = ITINERARIOS_PROGRAMACION_IT_ID
									INNER JOIN mb_tipos_herramienta ON TIPO_HERRAMIENTA_ID = PROGRAMACION_IT_TIPO_HERRAMIENTA_ID
									INNER JOIN mb_rutas ON RUTA_ID = PROGRAMACION_IT_RUTA_ID 
									WHERE  PROGRAMACION_IT_ESTADO = 'ACTIVO' AND  ITINERARIOS_ESTADO = 'ACTIVO' AND PROGRAMACION_IT_JUEVES  LIKE '%2014/08/04%' AND ITINERARIOS_FECHA = '2014-08-04')
									UNION
									(SELECT PROGRAMACION_IT_ID,ITINERARIOS_ID,RUTA_DESCRIPCION,TIPO_HERRAMIENTA_ID ,TIPO_HERRAMIENTA_CODIGO,			
									DATE(PROGRAMACION_IT_MODIFICADO) AS PROGRAMACION_IT_MODIFICADO ,
									DATE(PROGRAMACION_IT_REGISTRADO) AS PROGRAMACION_IT_REGISTRADO,
									PROGRAMACION_IT_VIERNES AS DESCRIPCION,PROGRAMACION_IT_FECHA_MATRIZ,PROGRAMACION_IT_ESTADO,
									ITINERARIOS_HR_SALIDA,ITINERARIOS_HR_PUC,ITINERARIOS_HR_PUC2,ITINERARIOS_HR_LLEGADA,
									ITINERARIOS_FECHA
									FROM mb_itinerarios
									INNER JOIN mb_programacion_itinerarios ON PROGRAMACION_IT_ID = ITINERARIOS_PROGRAMACION_IT_ID
									INNER JOIN mb_tipos_herramienta ON TIPO_HERRAMIENTA_ID = PROGRAMACION_IT_TIPO_HERRAMIENTA_ID
									INNER JOIN mb_rutas ON RUTA_ID = PROGRAMACION_IT_RUTA_ID 
									WHERE  PROGRAMACION_IT_ESTADO = 'ACTIVO' AND  ITINERARIOS_ESTADO = 'ACTIVO' AND PROGRAMACION_IT_VIERNES  LIKE '%2014/08/04%' AND ITINERARIOS_FECHA = '2014-08-04')
									UNION
									(SELECT PROGRAMACION_IT_ID,ITINERARIOS_ID,RUTA_DESCRIPCION,TIPO_HERRAMIENTA_ID ,TIPO_HERRAMIENTA_CODIGO,			
									DATE(PROGRAMACION_IT_MODIFICADO) AS PROGRAMACION_IT_MODIFICADO ,
									DATE(PROGRAMACION_IT_REGISTRADO) AS PROGRAMACION_IT_REGISTRADO,
									PROGRAMACION_IT_SABADO AS DESCRIPCION,PROGRAMACION_IT_FECHA_MATRIZ,PROGRAMACION_IT_ESTADO,
									ITINERARIOS_HR_SALIDA,ITINERARIOS_HR_PUC,ITINERARIOS_HR_PUC2,ITINERARIOS_HR_LLEGADA,
									ITINERARIOS_FECHA
									FROM mb_itinerarios
									INNER JOIN mb_programacion_itinerarios ON PROGRAMACION_IT_ID = ITINERARIOS_PROGRAMACION_IT_ID
									INNER JOIN mb_tipos_herramienta ON TIPO_HERRAMIENTA_ID = PROGRAMACION_IT_TIPO_HERRAMIENTA_ID
									INNER JOIN mb_rutas ON RUTA_ID = PROGRAMACION_IT_RUTA_ID 
									WHERE  PROGRAMACION_IT_ESTADO = 'ACTIVO' AND  ITINERARIOS_ESTADO = 'ACTIVO' AND PROGRAMACION_IT_SABADO  LIKE '%2014/08/04%' AND ITINERARIOS_FECHA = '2014-08-04')
									UNION
									(SELECT PROGRAMACION_IT_ID,ITINERARIOS_ID,RUTA_DESCRIPCION,TIPO_HERRAMIENTA_ID ,TIPO_HERRAMIENTA_CODIGO,			
									DATE(PROGRAMACION_IT_MODIFICADO) AS PROGRAMACION_IT_MODIFICADO ,
									DATE(PROGRAMACION_IT_REGISTRADO) AS PROGRAMACION_IT_REGISTRADO,
									PROGRAMACION_IT_DOMINGO AS DESCRIPCION,PROGRAMACION_IT_FECHA_MATRIZ,PROGRAMACION_IT_ESTADO,
									ITINERARIOS_HR_SALIDA,ITINERARIOS_HR_PUC,ITINERARIOS_HR_PUC2,ITINERARIOS_HR_LLEGADA,
									ITINERARIOS_FECHA
									FROM mb_itinerarios
									INNER JOIN mb_programacion_itinerarios ON PROGRAMACION_IT_ID = ITINERARIOS_PROGRAMACION_IT_ID
									INNER JOIN mb_tipos_herramienta ON TIPO_HERRAMIENTA_ID = PROGRAMACION_IT_TIPO_HERRAMIENTA_ID
									INNER JOIN mb_rutas ON RUTA_ID = PROGRAMACION_IT_RUTA_ID 
									WHERE  PROGRAMACION_IT_ESTADO = 'ACTIVO' AND  ITINERARIOS_ESTADO = 'ACTIVO' AND PROGRAMACION_IT_DOMINGO  LIKE '%2014/08/04%' AND ITINERARIOS_FECHA = '2014-08-04')";
 	
			$respuesta=LocalExecuteQuery($consultaSql);
			doGenerarJsonRespuesta($respuesta,0,1000);

break;
 
 case "LST_TURNOS": 
					//$sHospital_id = $_REQUEST["jsGlobal_TF_HSP_ID"];
					$consultaSql = "SELECT DISTINCT(PROGRAMACION_IT_RUTA_ID) AS PROGRAMACION_IT_RUTA_ID,RUTA_DESCRIPCION 
									FROM  mb_programacion_itinerarios
									INNER JOIN mb_rutas ON RUTA_ID = PROGRAMACION_IT_RUTA_ID
									WHERE RUTA_ESTADO = 'ACTIVO' AND PROGRAMACION_IT_ESTADO = 'ACTIVO'";

					$respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,0,1000);
break;

 case "LST_BUSES": 
					$i = $_REQUEST["i"];
					$consultaSql = "SELECT PROGRAMACION_IT_ID, PROGRAMACION_IT_RUTA_ID, PROGRAMACION_IT_TIPO_HERRAMIENTA_ID,TIPO_HERRAMIENTA_CODIGO
									FROM mb_programacion_itinerarios
									INNER JOIN mb_tipos_herramienta ON PROGRAMACION_IT_TIPO_HERRAMIENTA_ID = TIPO_HERRAMIENTA_ID
									WHERE PROGRAMACION_IT_ESTADO = 'ACTIVO' AND PROGRAMACION_IT_RUTA_ID = '$i'";
					$respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,0,1000);
break;
 case "LST_FECHAS": 
					$sglobalFecha_ID = $_REQUEST["globalFecha_ID"];
					$sglobalRUTA_ID = $_REQUEST["globalRUTA_ID"];
					$consultaSql = "(SELECT PROGRAMACION_IT_ID,PROGRAMACION_IT_RUTA_ID ,DATE(PROGRAMACION_IT_FECHA_LUNES) AS FECHA
										FROM mb_programacion_itinerarios
										where PROGRAMACION_IT_ESTADO = 'ACTIVO' 
										AND PROGRAMACION_IT_TIPO_HERRAMIENTA_ID = '$sglobalFecha_ID'  AND PROGRAMACION_IT_RUTA_ID = '$sglobalRUTA_ID' AND PROGRAMACION_IT_FECHA_LUNES<>'0000-00-00 00:00:00')
										UNION
										(SELECT PROGRAMACION_IT_ID,PROGRAMACION_IT_RUTA_ID,DATE(PROGRAMACION_IT_FECHA_MARTES) AS FECHA
										FROM mb_programacion_itinerarios
										where PROGRAMACION_IT_ESTADO = 'ACTIVO' 
										AND PROGRAMACION_IT_TIPO_HERRAMIENTA_ID = '$sglobalFecha_ID' AND PROGRAMACION_IT_RUTA_ID = '$sglobalRUTA_ID' AND PROGRAMACION_IT_FECHA_MARTES<>'0000-00-00 00:00:00')
										UNION
										(SELECT PROGRAMACION_IT_ID,PROGRAMACION_IT_RUTA_ID,DATE(PROGRAMACION_IT_FECHA_MIERCOLES) AS FECHA
										FROM mb_programacion_itinerarios
										where PROGRAMACION_IT_ESTADO = 'ACTIVO' 
										AND PROGRAMACION_IT_TIPO_HERRAMIENTA_ID = '$sglobalFecha_ID' AND PROGRAMACION_IT_RUTA_ID = '$sglobalRUTA_ID' AND PROGRAMACION_IT_FECHA_MIERCOLES<>'0000-00-00 00:00:00')
										UNION
										(SELECT PROGRAMACION_IT_ID,PROGRAMACION_IT_RUTA_ID,DATE(PROGRAMACION_IT_FECHA_JUEVES) AS FECHA
										FROM mb_programacion_itinerarios
										where PROGRAMACION_IT_ESTADO = 'ACTIVO' 
										AND PROGRAMACION_IT_TIPO_HERRAMIENTA_ID = '$sglobalFecha_ID' AND PROGRAMACION_IT_RUTA_ID = '$sglobalRUTA_ID' AND PROGRAMACION_IT_FECHA_JUEVES<>'0000-00-00 00:00:00')
										UNION
										(SELECT PROGRAMACION_IT_ID,PROGRAMACION_IT_RUTA_ID,DATE(PROGRAMACION_IT_FECHA_VIERNES) AS FECHA
										FROM mb_programacion_itinerarios
										where PROGRAMACION_IT_ESTADO = 'ACTIVO' 
										AND PROGRAMACION_IT_TIPO_HERRAMIENTA_ID = '$sglobalFecha_ID' AND PROGRAMACION_IT_RUTA_ID = '$sglobalRUTA_ID' AND PROGRAMACION_IT_FECHA_VIERNES<>'0000-00-00 00:00:00')
										UNION
										(SELECT PROGRAMACION_IT_ID,PROGRAMACION_IT_RUTA_ID,DATE(PROGRAMACION_IT_FECHA_SABADO) AS FECHA
										FROM mb_programacion_itinerarios
										where PROGRAMACION_IT_ESTADO = 'ACTIVO' 
										AND PROGRAMACION_IT_TIPO_HERRAMIENTA_ID = '$sglobalFecha_ID' AND PROGRAMACION_IT_RUTA_ID = '$sglobalRUTA_ID' AND PROGRAMACION_IT_FECHA_SABADO<>'0000-00-00 00:00:00')
										UNION
										(SELECT PROGRAMACION_IT_ID,PROGRAMACION_IT_RUTA_ID,DATE(PROGRAMACION_IT_FECHA_DOMINGO) AS FECHA
										FROM mb_programacion_itinerarios
										where PROGRAMACION_IT_ESTADO = 'ACTIVO' 
										AND PROGRAMACION_IT_TIPO_HERRAMIENTA_ID = '$sglobalFecha_ID' AND PROGRAMACION_IT_RUTA_ID = '$sglobalRUTA_ID' AND PROGRAMACION_IT_FECHA_DOMINGO<>'0000-00-00 00:00:00')";
					//echo($consultaSql);
					$respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,0,1000);
break;

			

case "BUSCARPORFECHA": //$pageSize = $_REQUEST["pageSize"];                  
           	
          	$sFechaBuscar = $_REQUEST["vFechaFinal"];
            $consultaSql = "(SELECT PROGRAMACION_IT_ID,ITINERARIOS_ID,RUTA_DESCRIPCION,TIPO_HERRAMIENTA_ID ,TIPO_HERRAMIENTA_CODIGO,			
									DATE(PROGRAMACION_IT_MODIFICADO) AS PROGRAMACION_IT_MODIFICADO ,
									DATE(PROGRAMACION_IT_REGISTRADO) AS PROGRAMACION_IT_REGISTRADO,
									PROGRAMACION_IT_LUNES AS DESCRIPCION,PROGRAMACION_IT_FECHA_MATRIZ,PROGRAMACION_IT_ESTADO,
									ITINERARIOS_HR_SALIDA,ITINERARIOS_HR_PUC,ITINERARIOS_HR_PUC2,ITINERARIOS_HR_LLEGADA,
									ITINERARIOS_FECHA
									FROM mb_itinerarios
									INNER JOIN mb_programacion_itinerarios ON PROGRAMACION_IT_ID = ITINERARIOS_PROGRAMACION_IT_ID
									INNER JOIN mb_tipos_herramienta ON TIPO_HERRAMIENTA_ID = PROGRAMACION_IT_TIPO_HERRAMIENTA_ID
									INNER JOIN mb_rutas ON RUTA_ID = PROGRAMACION_IT_RUTA_ID 
									WHERE  PROGRAMACION_IT_ESTADO = 'ACTIVO' AND  ITINERARIOS_ESTADO = 'ACTIVO' AND PROGRAMACION_IT_LUNES  LIKE '%$sFechaBuscar%' AND  ITINERARIOS_FECHA = '$sFechaBuscar')
									UNION
									(SELECT PROGRAMACION_IT_ID,ITINERARIOS_ID,RUTA_DESCRIPCION,TIPO_HERRAMIENTA_ID ,TIPO_HERRAMIENTA_CODIGO,			
									DATE(PROGRAMACION_IT_MODIFICADO) AS PROGRAMACION_IT_MODIFICADO ,
									DATE(PROGRAMACION_IT_REGISTRADO) AS PROGRAMACION_IT_REGISTRADO,
									PROGRAMACION_IT_MARTES AS DESCRIPCION,PROGRAMACION_IT_FECHA_MATRIZ,PROGRAMACION_IT_ESTADO,
									ITINERARIOS_HR_SALIDA,ITINERARIOS_HR_PUC,ITINERARIOS_HR_PUC2,ITINERARIOS_HR_LLEGADA,
									ITINERARIOS_FECHA
									FROM mb_itinerarios
									INNER JOIN mb_programacion_itinerarios ON PROGRAMACION_IT_ID = ITINERARIOS_PROGRAMACION_IT_ID
									INNER JOIN mb_tipos_herramienta ON TIPO_HERRAMIENTA_ID = PROGRAMACION_IT_TIPO_HERRAMIENTA_ID
									INNER JOIN mb_rutas ON RUTA_ID = PROGRAMACION_IT_RUTA_ID 
									WHERE  PROGRAMACION_IT_ESTADO = 'ACTIVO' AND  ITINERARIOS_ESTADO = 'ACTIVO' AND PROGRAMACION_IT_MARTES  LIKE '%$sFechaBuscar%' AND  ITINERARIOS_FECHA = '$sFechaBuscar')
									UNION
									(SELECT PROGRAMACION_IT_ID,ITINERARIOS_ID,RUTA_DESCRIPCION,TIPO_HERRAMIENTA_ID ,TIPO_HERRAMIENTA_CODIGO,			
									DATE(PROGRAMACION_IT_MODIFICADO) AS PROGRAMACION_IT_MODIFICADO ,
									DATE(PROGRAMACION_IT_REGISTRADO) AS PROGRAMACION_IT_REGISTRADO,
									PROGRAMACION_IT_MIERCOLES AS DESCRIPCION,PROGRAMACION_IT_FECHA_MATRIZ,PROGRAMACION_IT_ESTADO,
									ITINERARIOS_HR_SALIDA,ITINERARIOS_HR_PUC,ITINERARIOS_HR_PUC2,ITINERARIOS_HR_LLEGADA,
									ITINERARIOS_FECHA
									FROM mb_itinerarios
									INNER JOIN mb_programacion_itinerarios ON PROGRAMACION_IT_ID = ITINERARIOS_PROGRAMACION_IT_ID
									INNER JOIN mb_tipos_herramienta ON TIPO_HERRAMIENTA_ID = PROGRAMACION_IT_TIPO_HERRAMIENTA_ID
									INNER JOIN mb_rutas ON RUTA_ID = PROGRAMACION_IT_RUTA_ID 
									WHERE  PROGRAMACION_IT_ESTADO = 'ACTIVO' AND  ITINERARIOS_ESTADO = 'ACTIVO' AND PROGRAMACION_IT_MIERCOLES  LIKE '%$sFechaBuscar%' AND  ITINERARIOS_FECHA = '$sFechaBuscar')
									UNION
									(SELECT PROGRAMACION_IT_ID,ITINERARIOS_ID,RUTA_DESCRIPCION,TIPO_HERRAMIENTA_ID ,TIPO_HERRAMIENTA_CODIGO,			
									DATE(PROGRAMACION_IT_MODIFICADO) AS PROGRAMACION_IT_MODIFICADO ,
									DATE(PROGRAMACION_IT_REGISTRADO) AS PROGRAMACION_IT_REGISTRADO,
									PROGRAMACION_IT_JUEVES AS DESCRIPCION,PROGRAMACION_IT_FECHA_MATRIZ,PROGRAMACION_IT_ESTADO,
									ITINERARIOS_HR_SALIDA,ITINERARIOS_HR_PUC,ITINERARIOS_HR_PUC2,ITINERARIOS_HR_LLEGADA,
									ITINERARIOS_FECHA
									FROM mb_itinerarios
									INNER JOIN mb_programacion_itinerarios ON PROGRAMACION_IT_ID = ITINERARIOS_PROGRAMACION_IT_ID
									INNER JOIN mb_tipos_herramienta ON TIPO_HERRAMIENTA_ID = PROGRAMACION_IT_TIPO_HERRAMIENTA_ID
									INNER JOIN mb_rutas ON RUTA_ID = PROGRAMACION_IT_RUTA_ID 
									WHERE  PROGRAMACION_IT_ESTADO = 'ACTIVO' AND  ITINERARIOS_ESTADO = 'ACTIVO' AND PROGRAMACION_IT_JUEVES LIKE '%$sFechaBuscar%' AND  ITINERARIOS_FECHA = '$sFechaBuscar')
									UNION
									(SELECT PROGRAMACION_IT_ID,ITINERARIOS_ID,RUTA_DESCRIPCION,TIPO_HERRAMIENTA_ID ,TIPO_HERRAMIENTA_CODIGO,			
									DATE(PROGRAMACION_IT_MODIFICADO) AS PROGRAMACION_IT_MODIFICADO ,
									DATE(PROGRAMACION_IT_REGISTRADO) AS PROGRAMACION_IT_REGISTRADO,
									PROGRAMACION_IT_VIERNES AS DESCRIPCION,PROGRAMACION_IT_FECHA_MATRIZ,PROGRAMACION_IT_ESTADO,
									ITINERARIOS_HR_SALIDA,ITINERARIOS_HR_PUC,ITINERARIOS_HR_PUC2,ITINERARIOS_HR_LLEGADA,
									ITINERARIOS_FECHA
									FROM mb_itinerarios
									INNER JOIN mb_programacion_itinerarios ON PROGRAMACION_IT_ID = ITINERARIOS_PROGRAMACION_IT_ID
									INNER JOIN mb_tipos_herramienta ON TIPO_HERRAMIENTA_ID = PROGRAMACION_IT_TIPO_HERRAMIENTA_ID
									INNER JOIN mb_rutas ON RUTA_ID = PROGRAMACION_IT_RUTA_ID 
									WHERE  PROGRAMACION_IT_ESTADO = 'ACTIVO' AND  ITINERARIOS_ESTADO = 'ACTIVO' AND PROGRAMACION_IT_VIERNES  LIKE '%$sFechaBuscar%' AND  ITINERARIOS_FECHA = '$sFechaBuscar')
									UNION
									(SELECT PROGRAMACION_IT_ID,ITINERARIOS_ID,RUTA_DESCRIPCION,TIPO_HERRAMIENTA_ID ,TIPO_HERRAMIENTA_CODIGO,			
									DATE(PROGRAMACION_IT_MODIFICADO) AS PROGRAMACION_IT_MODIFICADO ,
									DATE(PROGRAMACION_IT_REGISTRADO) AS PROGRAMACION_IT_REGISTRADO,
									PROGRAMACION_IT_SABADO AS DESCRIPCION,PROGRAMACION_IT_FECHA_MATRIZ,PROGRAMACION_IT_ESTADO,
									ITINERARIOS_HR_SALIDA,ITINERARIOS_HR_PUC,ITINERARIOS_HR_PUC2,ITINERARIOS_HR_LLEGADA,
									ITINERARIOS_FECHA
									FROM mb_itinerarios
									INNER JOIN mb_programacion_itinerarios ON PROGRAMACION_IT_ID = ITINERARIOS_PROGRAMACION_IT_ID
									INNER JOIN mb_tipos_herramienta ON TIPO_HERRAMIENTA_ID = PROGRAMACION_IT_TIPO_HERRAMIENTA_ID
									INNER JOIN mb_rutas ON RUTA_ID = PROGRAMACION_IT_RUTA_ID 
									WHERE  PROGRAMACION_IT_ESTADO = 'ACTIVO' AND  ITINERARIOS_ESTADO = 'ACTIVO' AND PROGRAMACION_IT_SABADO  LIKE '%$sFechaBuscar%' AND  ITINERARIOS_FECHA = '$sFechaBuscar')
									UNION
									(SELECT PROGRAMACION_IT_ID,ITINERARIOS_ID,RUTA_DESCRIPCION,TIPO_HERRAMIENTA_ID ,TIPO_HERRAMIENTA_CODIGO,			
									DATE(PROGRAMACION_IT_MODIFICADO) AS PROGRAMACION_IT_MODIFICADO ,
									DATE(PROGRAMACION_IT_REGISTRADO) AS PROGRAMACION_IT_REGISTRADO,
									PROGRAMACION_IT_DOMINGO AS DESCRIPCION,PROGRAMACION_IT_FECHA_MATRIZ,PROGRAMACION_IT_ESTADO,
									ITINERARIOS_HR_SALIDA,ITINERARIOS_HR_PUC,ITINERARIOS_HR_PUC2,ITINERARIOS_HR_LLEGADA,
									ITINERARIOS_FECHA
									FROM mb_itinerarios
									INNER JOIN mb_programacion_itinerarios ON PROGRAMACION_IT_ID = ITINERARIOS_PROGRAMACION_IT_ID
									INNER JOIN mb_tipos_herramienta ON TIPO_HERRAMIENTA_ID = PROGRAMACION_IT_TIPO_HERRAMIENTA_ID
									INNER JOIN mb_rutas ON RUTA_ID = PROGRAMACION_IT_RUTA_ID 
									WHERE  PROGRAMACION_IT_ESTADO = 'ACTIVO' AND  ITINERARIOS_ESTADO = 'ACTIVO' AND PROGRAMACION_IT_DOMINGO  LIKE '%$sFechaBuscar%' AND  ITINERARIOS_FECHA = '$sFechaBuscar')
							";
 			//echo($consultaSql);
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
									ITINERARIOS_HR_SALIDA,ITINERARIOS_HR_PUC,ITINERARIOS_HR_LLEGADA,ITINERARIOS_ID,
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
					
		case "NEW_ITINERARIO_HORAS": 
					//reformulando inicio =======================================================
					$sGlobalPROGRAMACION_IT_ID = $_REQUEST["GlobalPROGRAMACION_IT_ID"];
					$sGlobalFecha_Encontrada =  $_REQUEST["globalFecha_Encontrada"];
					$sGlobalHoraSalida = $_REQUEST["globalHoraSalida"];					
					$sGlobalHoraPuc = $_REQUEST["globalHoraPuc"];
					$sGlobalHoraPuc2 =  $_REQUEST["globalHoraPuc2"];
					$sGlobalHorallegada = $_REQUEST["globalHorallegada"];						
					$sRegistrado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sModificado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sUsuario = $_SESSION["usr_session"];
					$consultaSql1 = "INSERT INTO mb_itinerarios(ITINERARIOS_PROGRAMACION_IT_ID,
												ITINERARIOS_FECHA,
												ITINERARIOS_HR_SALIDA,
												ITINERARIOS_HR_PUC,
												ITINERARIOS_HR_PUC2,
												ITINERARIOS_HR_LLEGADA,
												ITINERARIOS_REGISTRADO,
												ITINERARIOS_MODIFICADO,
												ITINERARIOS_USUARIO)
										VALUES ('$sGlobalPROGRAMACION_IT_ID',
											    '$sGlobalFecha_Encontrada',
												'$sGlobalHoraSalida',
												'$sGlobalHoraPuc',
												'$sGlobalHoraPuc2',
												'$sGlobalHorallegada',
												'$sRegistrado',
												'$sModificado',
												'$sUsuario')";
					//ECHO($consultaSql1);
					$respuesta1=LocalExecuteQuery($consultaSql1);
					doGenerarJsonRespuesta($respuesta1,0,10);
		break;
		case "UPD_ITINERARIO_HORAS": 
					//reformulando inicio =======================================================
					$sGlobalITINERARIOS_ID = $_REQUEST["GlobalITINERARIOS_ID"];
					$sGlobalFecha_Encontrada =  $_REQUEST["globalFecha_Encontrada"];
					$sGlobalHoraSalida = $_REQUEST["globalHoraSalida"];
					$sGlobalHoraPuc = $_REQUEST["globalHoraPuc"];
					$sGlobalHoraPuc2 = $_REQUEST["globalHoraPuc2"];
					$sGlobalHorallegada = $_REQUEST["globalHorallegada"];						
					$sRegistrado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sModificado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sUsuario = $_SESSION["usr_session"];
					$consultaSql1 = " UPDATE mb_itinerarios
										SET     ITINERARIOS_FECHA = '$sGlobalFecha_Encontrada',
												ITINERARIOS_HR_LLEGADA= '$sGlobalHorallegada',
												ITINERARIOS_HR_PUC = '$sGlobalHoraPuc',
												ITINERARIOS_HR_PUC2 ='$sGlobalHoraPuc2',
												ITINERARIOS_HR_SALIDA = '$sGlobalHoraSalida',
												ITINERARIOS_REGISTRADO = '$sRegistrado',
												ITINERARIOS_MODIFICADO = '$sModificado' ,
												ITINERARIOS_USUARIO = '$sUsuario'
									  WHERE ITINERARIOS_ID = '$sGlobalITINERARIOS_ID' AND ITINERARIOS_ESTADO = 'ACTIVO'";
					//echo($consultaSql1);
					$respuesta1=LocalExecuteQuery($consultaSql1);
					doGenerarJsonRespuesta($respuesta1,0,10);
		break;				
		case "DELETE":
					$GlobalITINERARIOS_ID = $_REQUEST["GlobalITINERARIOS_ID"];	
					$sUsuario = $_SESSION["usr_session"];	
					$consultaSql = "UPDATE mb_itinerarios 
										SET    ITINERARIOS_USUARIO = '$sUsuario', 
											   ITINERARIOS_ESTADO = 'INACTIVO' 
											WHERE ITINERARIOS_ID = '$GlobalITINERARIOS_ID'";
					$respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,0,10000);
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