<?php
require('dbVersion02.php');
LocalInstanciarConexion();
$sLiquidacionesUsuario = isset($_REQUEST["usr_session"]) ? $_REQUEST["usr_session"] : 0;
try {
    $option = $_REQUEST["option"];
    
    switch ($option) {
        case "LST":
            $pageSize    = $_REQUEST["pageSize"];
			$sLiquidacionesUsuario  = $_SESSION["usr_session"];
            $limit       = isset($_REQUEST["limit"]) ? $_REQUEST["limit"] : $pageSize;
            $start       = isset($_REQUEST["start"]) ? $_REQUEST["start"] : 0;
            $vFechaInicio = $_REQUEST["vFechaInicio"];
			$consultaSql='';
			if($vFechaInicio != 'Desde'){
				$consultaSql = "SELECT 	LQD_ID, 
									LQD_ID as iddd,
									LQD_ANFITRION,
									LQD_CAJERO,
									LQD_HRR_ID,
									TIPO_HERRAMIENTA_CODIGO,
									LQD_PRG_ID,
									LQD_GIRO_ID,
									RUTA_ID AS RUTAID_CRILLA,
									RUTA_DESCRIPCION AS RUTA_DESC_GRILLA,
									(CAST(LQD_MONTO AS DECIMAL(20,2)))  AS LQD_MONTO,
									LQD_CONFIRMADO,
									LQD_FLUJO,
									LQD_TIPO,
									(CAST(LQD_MONTOSF AS DECIMAL(20,2)))  AS LQD_MONTOSF,
									LQD_REGISTRO AS  LQD_REGISTRO2,
									LQD_MODIFICACION,
									LQD_USUARIO,
									LQD_ESTADO,
									CONCAT( F1.FUNCIONARIO_PATERNO, ' ', F1.FUNCIONARIO_MATERNO, ' ', F1.FUNCIONARIO_NOMBRES ) AS ANFITRION_NOMBRES,
									CONCAT( F2.FUNCIONARIO_PATERNO, ' ', F2.FUNCIONARIO_MATERNO, ' ', F2.FUNCIONARIO_NOMBRES ) AS CAJERO_NOMBRES,
									(CAST(LQD_MONTO AS DECIMAL(20,2)) + CAST(LQD_MONTOSF AS DECIMAL(20,2)))  AS RESULTADO,
									LQD_NRO_MAGICO,
                                    LQD_ND,
                                    LQD_NN,
                                    LQD_PD,
                                    LQD_PN,
                                    LQD_TURNO
									FROM  mb_liq_manuales 
									INNER JOIN SA_USUARIOS U1 ON LQD_ANFITRION= U1.USUARIO_ID
									INNER JOIN SA_USUARIOS U2 ON LQD_CAJERO= U2.USUARIO_ID

									INNER JOIN MB_FUNCIONARIOS F1 ON F1.FUNCIONARIO_ID = U1.USUARIO_FUNCIONARIO_ID  
									LEFT JOIN MB_FUNCIONARIOS F2 ON F2.FUNCIONARIO_ID = U2.USUARIO_FUNCIONARIO_ID 
									INNER JOIN mb_tipos_herramienta ON TIPO_HERRAMIENTA_ID = LQD_HRR_ID 
									LEFT JOIN mb_rutas  ON LQD_RUTA_ID = RUTA_ID 
                                    where  DATE( LQD_REGISTRO )	BETWEEN '$vFechaInicio' AND '$vFechaInicio' AND LQD_ESTADO = 'ACTIVO' 
                                    ORDER BY iddd DESC
									";
									/*CASE LQD_TIPO
									WHEN 'NINGUNO'
									THEN LQD_MONTO
									WHEN 'SOBRANTE'
									THEN LQD_MONTO + LQD_MONTOSF
									WHEN 'FALTANTE'
									THEN LQD_MONTO + LQD_MONTOSF
									END AS RESULTADO,*/
									
			}else{
				$consultaSql = "SELECT 	LQD_ID, 
									LQD_ID as iddd,
									LQD_ANFITRION,
									LQD_CAJERO,
									LQD_HRR_ID,
									TIPO_HERRAMIENTA_CODIGO,
									LQD_PRG_ID,
									LQD_GIRO_ID,
									RUTA_ID AS RUTAID_CRILLA,
									RUTA_DESCRIPCION AS RUTA_DESC_GRILLA,
									(CAST(LQD_MONTO AS DECIMAL(20,2)))  AS LQD_MONTO,
									LQD_CONFIRMADO,
									LQD_FLUJO,
									LQD_TIPO,
									(CAST(LQD_MONTOSF AS DECIMAL(20,2)))  AS LQD_MONTOSF,
									LQD_REGISTRO AS  LQD_REGISTRO2,
									LQD_MODIFICACION,
									LQD_USUARIO,
									LQD_ESTADO,
									CONCAT( F1.FUNCIONARIO_PATERNO, ' ', F1.FUNCIONARIO_MATERNO, ' ', F1.FUNCIONARIO_NOMBRES ) AS ANFITRION_NOMBRES,
									CONCAT( F2.FUNCIONARIO_PATERNO, ' ', F2.FUNCIONARIO_MATERNO, ' ', F2.FUNCIONARIO_NOMBRES ) AS CAJERO_NOMBRES,
									(CAST(LQD_MONTO AS DECIMAL(20,2)) + CAST(LQD_MONTOSF AS DECIMAL(20,2)))  AS RESULTADO,
									LQD_NRO_MAGICO,
                                    LQD_ND,
                                    LQD_NN,
                                    LQD_PD,
                                    LQD_PN,
									LQD_TIPO_HERRAMIENTA_ID,
									LQD_TURNO
									FROM mb_liq_manuales 
									
									INNER JOIN SA_USUARIOS U1 ON LQD_ANFITRION= U1.USUARIO_ID
									INNER JOIN SA_USUARIOS U2 ON LQD_CAJERO= U2.USUARIO_ID

									INNER JOIN MB_FUNCIONARIOS F1 ON F1.FUNCIONARIO_ID = U1.USUARIO_FUNCIONARIO_ID  
									LEFT JOIN MB_FUNCIONARIOS F2 ON F2.FUNCIONARIO_ID = U2.USUARIO_FUNCIONARIO_ID 
									INNER JOIN mb_tipos_herramienta ON TIPO_HERRAMIENTA_ID = LQD_TIPO_HERRAMIENTA_ID 
									LEFT JOIN mb_rutas  ON LQD_RUTA_ID = RUTA_ID 
									where LQD_ESTADO = 'ACTIVO' 
                                    GROUP BY LQD_ID
                                    ORDER BY iddd DESC
                                    ";
                                    /*
                                    CASE LQD_TIPO
									WHEN 'NINGUNO'
									THEN LQD_MONTO
									WHEN 'SOBRANTE'
									THEN LQD_MONTO + LQD_MONTOSF
									WHEN 'FALTANTE'
									THEN LQD_MONTO + LQD_MONTOSF
									END AS RESULTADO,


                                    */
									
			}
			
			//print_r($consultaSql);
            $respuesta   = LocalExecuteQuery($consultaSql);
            doGenerarJsonRespuesta($respuesta, $start, $limit);
            break;
			
		case "LSTANF":
            $pageSize    = $_REQUEST["pageSize"];
            $limit       = isset($_REQUEST["limit"]) ? $_REQUEST["limit"] : $pageSize;
            $start       = isset($_REQUEST["start"]) ? $_REQUEST["start"] : 0;
            $consultaSql = "SELECT CONCAT( FUNCIONARIO_PATERNO, ' ', FUNCIONARIO_MATERNO, ' ', FUNCIONARIO_NOMBRES ) AS FUNCIONARIO_NOMBRES, FUNCIONARIO_ID AS FUNCIONARIO_ID
							FROM MB_FUNCIONARIOS f
							INNER JOIN SA_USUARIOS su ON f.FUNCIONARIO_ID = su.USUARIO_FUNCIONARIO_ID
							INNER JOIN SA_USUARIO_TIPOS_FUNCIONARIO sutf ON su.USUARIO_ID = sutf.UTF_USUARIO_ID
							WHERE UTF_TIPO_FUNCIONARIO_ID =5
							ORDER BY FUNCIONARIO_PATERNO, FUNCIONARIO_MATERNO";
			
            $respuesta   = LocalExecuteQuery($consultaSql);
            doGenerarJsonRespuesta($respuesta, $start, 1000);
            break;
			
		case "LSTRUTA":
            $pageSize    = $_REQUEST["pageSize"];
            $limit       = isset($_REQUEST["limit"]) ? $_REQUEST["limit"] : $pageSize;
            $start       = isset($_REQUEST["start"]) ? $_REQUEST["start"] : 0;
            $consultaSql = "SELECT RUTA_ID, RUTA_DESCRIPCION FROM mb_rutas where RUTA_ESTADO = 'ACTIVO'";
			$respuesta   = LocalExecuteQuery($consultaSql);
            doGenerarJsonRespuesta($respuesta, $start, 1000);
            break;
			
		case "LSTHRR":
            $pageSize    = $_REQUEST["pageSize"];
            $limit       = isset($_REQUEST["limit"]) ? $_REQUEST["limit"] : $pageSize;
            $start       = isset($_REQUEST["start"]) ? $_REQUEST["start"] : 0;
            $consultaSql = "SELECT * FROM mb_tipos_herramienta where TIPO_HERRAMIENTA_ESTADO = 'ACTIVO'";
            $respuesta   = LocalExecuteQuery($consultaSql);
            doGenerarJsonRespuesta($respuesta, $start, 1000);
            break;
		
		case "LSTRUTA":
            $pageSize    = $_REQUEST["pageSize"];
            $limit       = isset($_REQUEST["limit"]) ? $_REQUEST["limit"] : $pageSize;
            $start       = isset($_REQUEST["start"]) ? $_REQUEST["start"] : 0;
            $consultaSql = "SELECT RUTA_ID, RUTA_DESCRIPCION FROM mb_rutas where RUTA_ESTADO = 'ACTIVO'";
            $respuesta   = LocalExecuteQuery($consultaSql);
            doGenerarJsonRespuesta($respuesta, $start, 1000);
            break;
			
        case "NEW":
			$sTotalEntregado = isset($_REQUEST["LABEL_CI"]) ? $_REQUEST["LABEL_CI"] : 0;
			$sBolivianos = isset($_REQUEST["LABEL_NOMBRE"]) ? $_REQUEST["LABEL_NOMBRE"] : 0;
			$sSobrantes = isset($_REQUEST["LABEL_PATERNO"]) ? $_REQUEST["LABEL_PATERNO"] : '0';
			if (trim($sSobrantes)=='')
				{ $sSobrantes='0';}
			$sFaltantes = isset($_REQUEST["LABEL_MATERNO"]) ? $_REQUEST["LABEL_MATERNO"] : 0;
			$sFuncionario = isset($_REQUEST["H_FUNCIONARIO_ID"]) ? $_REQUEST["H_FUNCIONARIO_ID"] : 0;
			$sTipoHrr_Id = isset($_REQUEST["TIPO_HERRAMIENTA_ID"]) ? $_REQUEST["TIPO_HERRAMIENTA_ID"] : 0;
			$sRuta_Id = isset($_REQUEST["H_RUTA_ID"]) ? $_REQUEST["H_RUTA_ID"] : 0;
			$sNroMagico = isset($_REQUEST["LABEL_MAGICO"]) ? $_REQUEST["LABEL_MAGICO"] : 'EXCEPCIONAL';
			$sNormalDiurno = isset($_REQUEST["LABEL_NORMALDIURNO"]) ? $_REQUEST["LABEL_NORMALDIURNO"] : 0;
			$sNormalNocturno = isset($_REQUEST["LABEL_NORMALNOCTURNO"]) ? $_REQUEST["LABEL_NORMALNOCTURNO"] : 0;
			$sPrefDiurno = isset($_REQUEST["LABEL_PREFERENCIALDIURNO"]) ? $_REQUEST["LABEL_PREFERENCIALDIURNO"] : 0;
			$sPrefNoc = isset($_REQUEST["LABEL_PREFERENCIALNOCTURNO"]) ? $_REQUEST["LABEL_PREFERENCIALNOCTURNO"] : 0;
			$sTurno = isset($_REQUEST["turno"]) ? $_REQUEST["turno"] : 0;

            $sLiquidacionesRegistro = strftime("%Y-%m-%d-%H-%M-%S", time());
            $sLiquidacionesUsuario  = $_SESSION["usr_session"];
			$sIdUsuario  = $_SESSION["idUsuario"];
            $sluiquidacionesEstado   = "ACTIVO";
            $variable = '';
			$MONTO = '';
			if(($sSobrantes!=''|| $sSobrantes!='0')&& ($sFaltantes !='' || $sFaltantes!='0')){
			$variable = 'NINGUNO';
			}
			if(($sSobrantes!='' || $sSobrantes!='0') && $sFaltantes ==''){
			$variable = 'SOBRANTE';
			$MONTO = $sSobrantes;	
			}
			if($sSobrantes=='' && ($sFaltantes !='' || $sFaltantes!='0') ){
			$variable = 'FALTANTE';
				if($sFaltantes>0){
					$sFaltantes = $sFaltantes * -1;
				}
			$MONTO = $sFaltantes ;		
			}
			//if($sLiquidacionesUsuario!=0){
			if(isset( $_SESSION["idUsuario"])) {
				 $consultaSql = "INSERT INTO mb_liq_manuales_bitacora
									( 	LQD_ANFITRION, 
										LQD_CAJERO, 
										LQD_HRR_ID, 
										LQD_RUTA_ID,
										LQD_TIPO,
										LQD_MONTOSF,
										LQD_MONTO,
										LQD_CONFIRMADO,
										LQD_FLUJO,
										LQD_NRO_MAGICO,
										LQD_ND,
										LQD_NN,
										LQD_PD,
										LQD_PN,
										LQD_USUARIO,
										LQD_REGISTRO,
										LQD_TIPO_HERRAMIENTA_ID,
										LQD_TURNO
										) 
								VALUES ('$sFuncionario', '$sIdUsuario', '$sTipoHrr_Id', '$sRuta_Id', '$variable', '$MONTO', '$sBolivianos', 'SI', 'INGRESO', '$sNroMagico', '$sNormalDiurno', '$sNormalNocturno', '$sPrefDiurno', '$sPrefNoc','$sLiquidacionesUsuario', now(),'$sTipoHrr_Id','$sTurno')
	            ";
				$respuesta = LocalExecuteQuery($consultaSql);
				
	            $consultaSql = "INSERT INTO mb_liq_manuales
									( 	LQD_ANFITRION, 
										LQD_CAJERO, 
										LQD_HRR_ID, 
										LQD_RUTA_ID,
										LQD_TIPO,
										LQD_MONTOSF,
										LQD_MONTO,
										LQD_CONFIRMADO,
										LQD_FLUJO,
										LQD_NRO_MAGICO,
										LQD_ND,
										LQD_NN,
										LQD_PD,
										LQD_PN,
										LQD_USUARIO,
										LQD_REGISTRO,
										LQD_TIPO_HERRAMIENTA_ID,
										LQD_TURNO
										) 
								VALUES ('$sFuncionario', '$sIdUsuario', '$sTipoHrr_Id', '$sRuta_Id', '$variable', '$MONTO', '$sBolivianos', 'SI', 'INGRESO', '$sNroMagico', '$sNormalDiurno', '$sNormalNocturno', '$sPrefDiurno', '$sPrefNoc','$sLiquidacionesUsuario', now(),'$sTipoHrr_Id','$sTurno')
	            ";
				$respuesta = LocalExecuteQuery($consultaSql);
	            doGenerarJsonRespuesta($respuesta, 0, 10);
			}

            break;
        case "DEL":
            $sI          = $_REQUEST["i"];
            $consultaSql = "UPDATE MB_FUNCIONARIOS SET FUNCIONARIO_ESTADO='INACTIVO' WHERE FUNCIONARIO_ID = '$sI'";
            $respuesta   = LocalExecuteQuery($consultaSql);
            doGenerarJsonRespuesta($respuesta, 0, 10);
            break;
        case "UPD":
            $sFuncionarioCi       = $_REQUEST["LABEL_CI"];
            $sFuncionarioNombre   = $_REQUEST["LABEL_NOMBRE"];
            $sFuncionarioPaterno  = $_REQUEST["LABEL_PATERNO"];
            $sFuncionarioMaterno  = $_REQUEST["LABEL_MATERNO"];
            $sFuncionarioExpedido = $_REQUEST["H_EXPEDIDO_ID"];
            $sFuncionarioEstCivil = $_REQUEST["H_ESTADO_CIVIL_ID"];
            $sFuncionarioRegistro = strftime("%Y-%m-%d-%H-%M-%S", time());
            $sFuncionarioUsuario  = $_SESSION["usr_session"];
            $sFuncionarioEstado   = $_REQUEST["H_FUNCIONARIO_ESTADO"];
            $sFuncionarioId       = $_REQUEST["i"];
            
            $consultaSql = "UPDATE mb_funcionarios SET 
							FUNCIONARIO_EXPEDIDO_ID='$sFuncionarioExpedido',
							FUNCIONARIO_ESTADO_CIVIL_ID='$sFuncionarioEstCivil',
							   FUNCIONARIO_CI='$sFuncionarioCi',
							   FUNCIONARIO_NOMBRES='$sFuncionarioNombre',
							   FUNCIONARIO_PATERNO='$sFuncionarioPaterno',
							   FUNCIONARIO_MATERNO='$sFuncionarioMaterno',						   
							   FUNCIONARIO_MODIFICACION='$sFuncionarioRegistro',
							   FUNCIONARIO_USUARIO='$sFuncionarioUsuario',
							   FUNCIONARIO_ESTADO='$sFuncionarioEstado' 
							   WHERE FUNCIONARIO_ID='$sFuncionarioId'";
            
            $respuesta = LocalExecuteQuery($consultaSql);
            doGenerarJsonRespuesta($respuesta, 0, 10);
            break;
        
        case "ERR":
            echo json_encode(array(
                "success" => false
            ));
            break;
    }
}
catch (Exception $e) {
    echo null;
}
LocalCerrarConexion();
?>