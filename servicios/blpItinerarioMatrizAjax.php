<?php
require('dbVersion02.php');
LocalInstanciarConexion();
$LIMITE_DEFAULT    = 100000;
$PAGE_SIZE_DEFAULT = 0;
try {
    $option = $_REQUEST["option"];
    
    switch ($option) {
        case "LST":
            $RUTA_ID       = isset($_REQUEST["RUTA_ID"]) ? $_REQUEST["RUTA_ID"] : "0";
            $limit       = isset($_REQUEST["limit"]) ? $_REQUEST["limit"] : $LIMITE_DEFAULT;
            $start       = isset($_REQUEST["start"]) ? $_REQUEST["start"] : $PAGE_SIZE_DEFAULT;
			
			$cadena = " ";
			if($RUTA_ID != "0"){
			$cadena = " and PROGRAMACION_IT_RUTA_ID = '".$RUTA_ID."' ";
			}
			
            $consultaSql = "SELECT *
											FROM mb_itinerarios
											INNER JOIN mb_programacion_itinerarios ON PROGRAMACION_IT_ID = ITINERARIOS_PROGRAMACION_IT_ID
											INNER JOIN mb_tipos_herramienta ON  	TIPO_HERRAMIENTA_ID = PROGRAMACION_IT_TIPO_HERRAMIENTA_ID
											WHERE ITINERARIOS_ESTADO = 'ACTIVO'
											".$cadena."
											ORDER BY ITINERARIOS_FECHA DESC";
            $respuesta   = LocalExecuteQuery($consultaSql);
            
			$hoy = date("Y-m-d");
			
			//echo $hoy;
			
            $dimension = count($respuesta);
            if ($dimension > 0) {
                echo "{
								staff : [";
                for ($i = 0; $i < $dimension; $i++) {
                    echo "{";
                    echo "Id:'" . $respuesta[$i]["ITINERARIOS_PROGRAMACION_IT_ID"] . "',";
                    echo "Name:'PUMA" . ($i + 1) . "',";
                    echo "IdBus:'" . $respuesta[$i]["PROGRAMACION_IT_TIPO_HERRAMIENTA_ID"] . "',";
                    echo "Ba:'" . $respuesta[$i]["TIPO_HERRAMIENTA_CODIGO"] . "',";
                    echo "Ruta:'" . $respuesta[$i]["PROGRAMACION_IT_RUTA_ID"] . "'";
                    echo "},";
                }
                echo " ],tasks : [";
                
                for ($i = 0; $i < $dimension; $i++) {
                    echo "{";
                    echo "ResourceId:'" . $respuesta[$i]["ITINERARIOS_PROGRAMACION_IT_ID"] . "',";
                    echo "Name:'salida',";
                    echo "StartDate:'".$hoy . " ". $respuesta[$i]["ITINERARIOS_HR_SALIDA"] . "',";
                    echo "EndDate:'".$hoy . " ". $respuesta[$i]["ITINERARIOS_HR_LLEGADA"] . "',";
                    echo "Location:'LA PAZ'";
                    echo "},";
                   
                }                
                echo "		]
							}";
            } else {
                echo "{staff : [],tasks : []}";
            }
            //doGenerarJsonRespuesta($respuesta,$start,$LIMITE_DEFAULT);
            break;
        
        case "RUTAS":
            $limit       = isset($_REQUEST["limit"]) ? $_REQUEST["limit"] : $LIMITE_DEFAULT;
            $start       = isset($_REQUEST["start"]) ? $_REQUEST["start"] : $PAGE_SIZE_DEFAULT;
            $consultaSql = "SELECT *
											FROM mb_rutas
											WHERE RUTA_ESTADO = 'ACTIVO'
											";
            $respuesta   = LocalExecuteQuery($consultaSql);
            doGenerarJsonRespuesta($respuesta, $start, $LIMITE_DEFAULT);
            break;
			
			case "NUEVO":
			
			$limit       = isset($_REQUEST["limit"]) ? $_REQUEST["limit"] : $LIMITE_DEFAULT;
            $start       = isset($_REQUEST["start"]) ? $_REQUEST["start"] : $PAGE_SIZE_DEFAULT;
			
			$id       			= isset($_REQUEST["id"]) ? $_REQUEST["id"] : "0";	
			$fechainicio    = isset($_REQUEST["fechainicio"]) ? $_REQUEST["fechainicio"] : "0";
			$fechafin       = isset($_REQUEST["fechafin"]) ? $_REQUEST["fechafin"] : "0";
			$sRegistrado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
			$sModificado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
			
            $consultaSql = "INSERT INTO mb_itinerarios(
																		  ITINERARIOS_PROGRAMACION_IT_ID, 
																		  ITINERARIOS_HR_SALIDA, 
																		  ITINERARIOS_HR_LLEGADA,																		  
																		  ITINERARIOS_REGISTRADO, 
																		  ITINERARIOS_MODIFICADO, 
																		  ITINERARIOS_USUARIO, 
																		  ITINERARIOS_ESTADO) VALUES 
																		  (
																		  '$id',       		
																		  '$fechainicio' , 
																		  '$fechafin',     
																		  '$sRegistrado',
																		  '$sModificado',
																		  'admin',
																		  'ACTIVO'																		  
																		  
																		  );";
																		  
																		
																		  
            $respuesta   = LocalExecuteQuery($consultaSql);
			doGenerarJsonRespuesta($respuesta, $start, $LIMITE_DEFAULT);
			
			break;
            
            
            
    }
}
catch (Exception $e) {
    echo null;
}
LocalCerrarConexion();
?>