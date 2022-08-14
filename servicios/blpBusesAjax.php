<?php
require('dbVersion02.php');
LocalInstanciarConexion();

try {
    $option = $_REQUEST["option"];

    switch ($option) {
        case "LST": $pageSize = $_REQUEST["pageSize"];                  
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
					$consultaSql = "SELECT TIPO_HERRAMIENTA_ID , TIPO_HERRAMIENTA_CODIGO , TIPO_HERRAMIENTA_DESCRIPCION, TIPO_BUSES_ICONO,
											TIPO_HERRAMIENTA_ASIENTOS , TIPO_HERRAMIENTA_ESTADO_A, TIPO_BUSES_ID, TIPO_BUSES_DESCRIPCION, 
											TIPO_HERRAMIENTA_PLACA, TIPO_HERRAMIENTA_CHASIS
									FROM mb_tipos_herramienta INNER JOIN mb_tipos_buses on TIPO_BUSES_ID = TIPO_HERRAMIENTA_DESCRIPCION
									WHERE TIPO_HERRAMIENTA_ESTADO LIKE 'ACTIVO' AND TIPO_BUSES_ESTADO LIKE 'ACTIVO'
									ORDER BY TIPO_HERRAMIENTA_ID";
					$respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,$start,$limit);
                    break;
		
        case "LST_TIPO": 
        			$sTipo = $_REQUEST["vTipo"];
        			$pageSize = $_REQUEST["pageSize"];                  
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
					$consultaSql = "SELECT TIPO_HERRAMIENTA_ID , TIPO_HERRAMIENTA_CODIGO , TIPO_HERRAMIENTA_DESCRIPCION, TIPO_BUSES_ICONO,
											TIPO_HERRAMIENTA_ASIENTOS , TIPO_HERRAMIENTA_ESTADO_A, TIPO_BUSES_ID, TIPO_BUSES_DESCRIPCION,
											TIPO_HERRAMIENTA_PLACA, TIPO_HERRAMIENTA_CHASIS
									FROM mb_tipos_herramienta INNER JOIN mb_tipos_buses on TIPO_BUSES_ID = TIPO_HERRAMIENTA_DESCRIPCION
									WHERE TIPO_HERRAMIENTA_ESTADO LIKE 'ACTIVO' AND TIPO_BUSES_ESTADO LIKE 'ACTIVO' AND TIPO_HERRAMIENTA_DESCRIPCION='$sTipo'
									ORDER BY TIPO_HERRAMIENTA_ID";
					$respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,$start,$limit);
                    break;
							

        case "NEW": 
					$sDesc = $_REQUEST["TIPO_HERRAMIENTA_DESCRIPCION"];
					$sAsiento = $_REQUEST["TIPO_HERRAMIENTA_ASIENTOS"];		
					$sCodigo = $_REQUEST["TIPO_HERRAMIENTA_CODIGO"];	
					$sPlaca = $_REQUEST["TIPO_HERRAMIENTA_PLACA"];	
					$sChasis = $_REQUEST["TIPO_HERRAMIENTA_CHASIS"];							
					$sRegistrado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sModificado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sUsuario = $_SESSION["usr_session"];
					
					$sEstado 	= 'ACTIVO';				
					$sEstadoA 	= 'LIBRE';
					$consultaSql2="SELECT COUNT(TIPO_HERRAMIENTA_ID) AS TOTAL FROM mb_tipos_herramienta WHERE TIPO_HERRAMIENTA_CODIGO='$sCodigo'";
					$respuesta2=LocalExecuteQuery($consultaSql2);
					//echo($respuesta2[0]["TOTAL"]);
					if($respuesta2[0]["TOTAL"]==0)
					{
                    $consultaSql = "INSERT INTO mb_tipos_herramienta(TIPO_HERRAMIENTA_DESCRIPCION,TIPO_HERRAMIENTA_CODIGO,
                    							TIPO_HERRAMIENTA_ASIENTOS,TIPO_HERRAMIENTA_REGISTRO,TIPO_HERRAMIENTA_MODIFICACION,
                    							TIPO_HERRAMIENTA_USUARIO,TIPO_HERRAMIENTA_ESTADO,TIPO_HERRAMIENTA_ESTADO_A,
                    							TIPO_HERRAMIENTA_PLACA, TIPO_HERRAMIENTA_CHASIS) 
                             VALUES('$sDesc',
                             		'$sCodigo',
									'$sAsiento',
									'$sRegistrado',
									'$sModificado',
									'$sUsuario',
									'$sEstado',
									'$sEstadoA',
									'$sPlaca',
									'$sChasis'			
										) ";
//echo($consultaSql);
					$respuesta=LocalExecuteQuery($consultaSql);
					$consultaSql2 = "SELECT 'LISTO' AS REGEXISTE";	
					$respuesta2=LocalExecuteQuery($consultaSql2);
					doGenerarJsonRespuesta($respuesta2,0,10);
					//echo "LISTO";

					}
					else{
					$consultaSql3 = "SELECT 'EXISTE' AS REGEXISTE";	
					$respuesta3=LocalExecuteQuery($consultaSql3);
					//echo ("1111");
					doGenerarJsonRespuesta($respuesta3,0,10);
					}

                    break;
					
		case "DEL": 
		            $sI = $_REQUEST["i"];
					$sModificado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sUsuario = $_SESSION["usr_session"];		
		
                    $consultaSql = "UPDATE mb_tipos_herramienta SET TIPO_HERRAMIENTA_MODIFICACION='$sModificado',TIPO_HERRAMIENTA_USUARIO='$sUsuario',TIPO_HERRAMIENTA_ESTADO='INACTIVO',TIPO_HERRAMIENTA_ESTADO_A='LIBRE' WHERE TIPO_HERRAMIENTA_ID = '$sI'";
                    $respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,0,10);
                    break;			
					
        case "UPD": 
					$sI = $_REQUEST["i"];
					$sPersona = $_REQUEST["TIPO_HERRAMIENTA_CODIGO"];
					$sCodigo = $_REQUEST["TIPO_HERRAMIENTA_DESCRIPCION"];
					$sClave = $_REQUEST["TIPO_HERRAMIENTA_ASIENTOS"];
					$sPlaca = $_REQUEST["TIPO_HERRAMIENTA_PLACA"];	
					$sChasis = $_REQUEST["TIPO_HERRAMIENTA_CHASIS"];	
					$sModificado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sUsuario = $_SESSION["usr_session"];
					
                    $consultaSql = "UPDATE mb_tipos_herramienta SET					
						TIPO_HERRAMIENTA_CODIGO='$sPersona',
						TIPO_HERRAMIENTA_DESCRIPCION='$sCodigo',
						TIPO_HERRAMIENTA_ASIENTOS='$sClave',
						TIPO_HERRAMIENTA_PLACA='$sPlaca',
						TIPO_HERRAMIENTA_CHASIS='$sChasis',
						TIPO_HERRAMIENTA_MODIFICACION='$sModificado',TIPO_HERRAMIENTA_USUARIO='$sUsuario'
										
					WHERE TIPO_HERRAMIENTA_ID = '$sI'";					
					
                    $respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,0,10);
                    break;

        case "CBOTIPO": $pageSize = $_REQUEST["pageSize"];                  
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
                    $consultaSql = "SELECT  TIPO_BUSES_ID, TIPO_BUSES_DESCRIPCION
                                    FROM mb_tipos_buses
                                    WHERE TIPO_BUSES_ESTADO LIKE 'ACTIVO'";
                    $respuesta=LocalExecuteQuery($consultaSql);
                    doGenerarJsonRespuesta($respuesta,$start,$limit);
                    break;
    }
} catch (Exception $e) {
    echo null;
}
 LocalCerrarConexion();
?>