<?php
require('dbVersion02.php');
LocalInstanciarConexion();
$sLiquidacionesUsuario  = $_SESSION["usr_session"];

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
									INNER JOIN MB_FUNCIONARIOS F1 ON F1.FUNCIONARIO_ID = LQD_ANFITRION 
									LEFT JOIN MB_FUNCIONARIOS F2 ON F2.FUNCIONARIO_ID = LQD_CAJERO 
									INNER JOIN mb_tipos_herramienta ON TIPO_HERRAMIENTA_ID = LQD_HRR_ID 
									LEFT JOIN mb_rutas  ON LQD_RUTA_ID = RUTA_ID 
                                    where  DATE( LQD_REGISTRO )	BETWEEN '$vFechaInicio' AND '$vFechaInicio' 
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
									INNER JOIN MB_FUNCIONARIOS F1 ON F1.FUNCIONARIO_ID = LQD_ANFITRION 
									LEFT JOIN MB_FUNCIONARIOS F2 ON F2.FUNCIONARIO_ID = LQD_CAJERO 
									INNER JOIN mb_tipos_herramienta ON TIPO_HERRAMIENTA_ID = LQD_TIPO_HERRAMIENTA_ID 
									LEFT JOIN mb_rutas  ON LQD_RUTA_ID = RUTA_ID 
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
            $consultaSql = "SELECT RUTA_ID, RUTA_DESCRIPCION FROM mb_rutas";
			$respuesta   = LocalExecuteQuery($consultaSql);
            doGenerarJsonRespuesta($respuesta, $start, 1000);
            break;
			
		case "LSTHRR":
            $pageSize    = $_REQUEST["pageSize"];
            $limit       = isset($_REQUEST["limit"]) ? $_REQUEST["limit"] : $pageSize;
            $start       = isset($_REQUEST["start"]) ? $_REQUEST["start"] : 0;
            $consultaSql = "SELECT * FROM mb_tipos_herramienta";
            $respuesta   = LocalExecuteQuery($consultaSql);
            doGenerarJsonRespuesta($respuesta, $start, 1000);
            break;
		
		case "LSTRUTA":
            $pageSize    = $_REQUEST["pageSize"];
            $limit       = isset($_REQUEST["limit"]) ? $_REQUEST["limit"] : $pageSize;
            $start       = isset($_REQUEST["start"]) ? $_REQUEST["start"] : 0;
            $consultaSql = "SELECT RUTA_ID, RUTA_DESCRIPCION FROM mb_rutas";
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
			//print_r($consultaSql);
			//die();
			//echo $consultaSql;
			$respuesta = LocalExecuteQuery($consultaSql);
            doGenerarJsonRespuesta($respuesta, 0, 10);
            break;
        case "DEL":
            $sI          = $_REQUEST["i"];
            $consultaSql = "UPDATE MB_FUNCIONARIOS SET FUNCIONARIO_ESTADO='INACTIVO' WHERE FUNCIONARIO_ID = '$sI'";
            $respuesta   = LocalExecuteQuery($consultaSql);
            doGenerarJsonRespuesta($respuesta, 0, 10);
            break;
        case "UPD":
			$sFuncionario = isset($_REQUEST["H_FUNCIONARIO_ID"]) ? $_REQUEST["H_FUNCIONARIO_ID"] : 0;
			$sCajero = isset($_REQUEST["LABEL_CAJERO"]) ? $_REQUEST["LABEL_CAJERO"] : 0;
			$sRuta_Id = isset($_REQUEST["H_RUTA_ID"]) ? $_REQUEST["H_RUTA_ID"] : 0;
			$sTotalEntregado = isset($_REQUEST["LABEL_CI"]) ? $_REQUEST["LABEL_CI"] : 0;
			$sNroMagico = isset($_REQUEST["LABEL_MAGICO"]) ? $_REQUEST["LABEL_MAGICO"] : 'EXCEPCIONAL';
			$sFaltantes = isset($_REQUEST["LABEL_MATERNO"]) ? $_REQUEST["LABEL_MATERNO"] : 0;
			$sBolivianos = isset($_REQUEST["LABEL_NOMBRE"]) ? $_REQUEST["LABEL_NOMBRE"] : 0;
			$sNormalDiurno = isset($_REQUEST["LABEL_NORMALDIURNO"]) ? $_REQUEST["LABEL_NORMALDIURNO"] : 0;
			$sNormalNocturno = isset($_REQUEST["LABEL_NORMALNOCTURNO"]) ? $_REQUEST["LABEL_NORMALNOCTURNO"] : 0;
			$sSobrantes = isset($_REQUEST["LABEL_PATERNO"]) ? $_REQUEST["LABEL_PATERNO"] : '0';
			if (trim($sSobrantes)=='')
				{ $sSobrantes='0';}
			$sPrefDiurno = isset($_REQUEST["LABEL_PREFERENCIALDIURNO"]) ? $_REQUEST["LABEL_PREFERENCIALDIURNO"] : 0;
			$sPrefNoc = isset($_REQUEST["LABEL_PREFERENCIALNOCTURNO"]) ? $_REQUEST["LABEL_PREFERENCIALNOCTURNO"] : 0;
			$sTipoHrr_Id = isset($_REQUEST["TIPO_HERRAMIENTA_ID"]) ? $_REQUEST["TIPO_HERRAMIENTA_ID"] : 0;
			$sTurno = isset($_REQUEST["turno"]) ? $_REQUEST["turno"] : 0;

            $sLiquidacionesRegistro = strftime("%Y-%m-%d-%H-%M-%S", time());
            $sLiquidacionesUsuario  = $_SESSION["usr_session"];
			$sIdUsuario  = $_SESSION["idUsuario"];
            $sluiquidacionesEstado   = "ACTIVO";
            //$sIdLiquidacion = isset($_REQUEST["LABEL_ID"]) ? $_REQUEST["LABEL_ID"] : 0;
            $idLiquidacion = isset($_REQUEST["i"]) ? $_REQUEST["i"] : 0;
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

            //verificar actualizacion
             //mb_liq_manuales_bitacora
            $consultaSql = "UPDATE mb_liq_manuales SET 
							LQD_ANFITRION='$sFuncionario',
							LQD_CAJERO='$sCajero',
							LQD_HRR_ID='$sTipoHrr_Id',
							LQD_RUTA_ID='$sRuta_Id',
							LQD_TIPO='$variable',
							LQD_MONTOSF='$MONTO',						   
							LQD_MONTO='$sBolivianos',
							LQD_CONFIRMADO='SI',
							LQD_FLUJO='INGRESO', 
							LQD_NRO_MAGICO='$sNroMagico', 
							LQD_ND='$sNormalDiurno', 
							LQD_NN='$sNormalNocturno', 
							LQD_PD='$sPrefDiurno', 
							LQD_PN='$sPrefNoc', 
							LQD_USUARIO='$sLiquidacionesUsuario', 
							LQD_TIPO_HERRAMIENTA_ID='$sTipoHrr_Id',
							LQD_TURNO='$sTurno'
							WHERE LQD_ID='$idLiquidacion'";
            $respuesta = LocalExecuteQuery($consultaSql);
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
							VALUES ('$sFuncionario', '$sCajero', '$sTipoHrr_Id', '$sRuta_Id', '$variable', '$MONTO', '$sBolivianos', 'SI', 'INGRESO', '$sNroMagico', '$sNormalDiurno', '$sNormalNocturno', '$sPrefDiurno', '$sPrefNoc','$sLiquidacionesUsuario', now(),'$sTipoHrr_Id','$sTurno')
            ";
            $respuesta = LocalExecuteQuery($consultaSql);
            doGenerarJsonRespuesta($respuesta, 0, 10);
            break;
        case "AUTORIZA":
			$sFuncionario = isset($_REQUEST["H_FUNCIONARIO_ID"]) ? $_REQUEST["H_FUNCIONARIO_ID"] : 0;
			$sCajero = isset($_REQUEST["LABEL_CAJERO"]) ? $_REQUEST["LABEL_CAJERO"] : 0;
			$sRuta_Id = isset($_REQUEST["H_RUTA_ID"]) ? $_REQUEST["H_RUTA_ID"] : 0;
			$sTotalEntregado = isset($_REQUEST["LABEL_CI"]) ? $_REQUEST["LABEL_CI"] : 0;
			$sNroMagico = isset($_REQUEST["LABEL_MAGICO"]) ? $_REQUEST["LABEL_MAGICO"] : 'EXCEPCIONAL';
			$sFaltantes = isset($_REQUEST["LABEL_MATERNO"]) ? $_REQUEST["LABEL_MATERNO"] : 0;
			$sBolivianos = isset($_REQUEST["LABEL_NOMBRE"]) ? $_REQUEST["LABEL_NOMBRE"] : 0;
			$sNormalDiurno = isset($_REQUEST["LABEL_NORMALDIURNO"]) ? $_REQUEST["LABEL_NORMALDIURNO"] : 0;
			$sNormalNocturno = isset($_REQUEST["LABEL_NORMALNOCTURNO"]) ? $_REQUEST["LABEL_NORMALNOCTURNO"] : 0;
			$sSobrantes = isset($_REQUEST["LABEL_PATERNO"]) ? $_REQUEST["LABEL_PATERNO"] : '0';
			if (trim($sSobrantes)=='')
				{ $sSobrantes='0';}
			$sPrefDiurno = isset($_REQUEST["LABEL_PREFERENCIALDIURNO"]) ? $_REQUEST["LABEL_PREFERENCIALDIURNO"] : 0;
			$sPrefNoc = isset($_REQUEST["LABEL_PREFERENCIALNOCTURNO"]) ? $_REQUEST["LABEL_PREFERENCIALNOCTURNO"] : 0;
			$sTipoHrr_Id = isset($_REQUEST["TIPO_HERRAMIENTA_ID"]) ? $_REQUEST["TIPO_HERRAMIENTA_ID"] : 0;
			$sTurno = isset($_REQUEST["turno"]) ? $_REQUEST["turno"] : 0;
            $sLiquidacionesRegistro = strftime("%Y-%m-%d-%H-%M-%S", time());
            $sLiquidacionesUsuario  = $_SESSION["usr_session"];
			$sIdUsuario  = $_SESSION["idUsuario"];
            $sluiquidacionesEstado   = "ACTIVO";
            $idLiquidacion = isset($_REQUEST["i"]) ? $_REQUEST["i"] : 0;
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
            $sAutorizacion = isset($_REQUEST["opcion"]) ? $_REQUEST["opcion"] : 0;
            $sCite = isset($_REQUEST["LABEL_CITE"]) ? $_REQUEST["LABEL_CITE"] : 0;
            $consultaSql = "UPDATE mb_liq_manuales SET 
							LQD_AUTORIZACION='$sAutorizacion', 
							LQD_CITE='$sCite'
							WHERE LQD_ID='$idLiquidacion'";
            $respuesta = LocalExecuteQuery($consultaSql);
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
									LQD_TURNO,
									LQD_AUTORIZACION,
									LQD_CITE
									) 
							VALUES ('$sFuncionario', '$sCajero', '$sTipoHrr_Id', '$sRuta_Id', '$variable', '$MONTO', '$sBolivianos', 'SI', 'INGRESO', '$sNroMagico', '$sNormalDiurno', '$sNormalNocturno', '$sPrefDiurno', '$sPrefNoc','$sLiquidacionesUsuario', now(),'$sTipoHrr_Id','$sTurno', '$sAutorizacion', '$sCite')
            ";
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