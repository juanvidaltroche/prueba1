<?php
require('db.php');

function rowsGet($r, $i) {
    $sUsuario = $_SESSION["usr_session"];
	$sFechaHoy    = date('Y-m-d');
	$sFechaManana = date('Y-m-d',strtotime($sFechaHoy)+86400);
	$hora1 = '06:00:00';
	$hora11 = '05:59:59';
    $sSQL = "SELECT lqd_ruta_id,
				(SELECT RUTA_DESCRIPCION 
				FROM mb_rutas 
				WHERE RUTA_ID =  lqd_ruta_id
				) AS ruta,
				lqd_id,
				LQD_CAJERO,
				(SELECT usuario_codigo
				FROM sa_usuarios
				WHERE usuario_funcionario_id = LQD_CAJERO
				) AS cajero, 
				lqd_anfitrion,
				(SELECT usuario_codigo
				FROM sa_usuarios
				WHERE usuario_funcionario_id = lqd_anfitrion
				) AS anfitrion, 
				(SELECT tipo_herramienta_codigo
				FROM mb_tipos_herramienta
				WHERE tipo_herramienta_id = LQD_TIPO_HERRAMIENTA_ID
				) AS bus,
				lqd_nd,
				CASE lqd_ruta_id
					when '1' then(lqd_nd*(SELECT TARIFA_MONTO FROM mb_tarifas WHERE TARIFA_ID = '1'))
					when '2' then(lqd_nd*(SELECT TARIFA_MONTO FROM mb_tarifas WHERE TARIFA_ID = '1'))
					when '3' then(lqd_nd*(SELECT TARIFA_MONTO FROM mb_tarifas WHERE TARIFA_ID = '5'))
				END as impNormal,
				lqd_pd,
				(lqd_pd*(SELECT TARIFA_MONTO FROM mb_tarifas WHERE TARIFA_ID = '3'))as impPreferencial,
				lqd_nn,
				(lqd_nn*(SELECT TARIFA_MONTO FROM mb_tarifas WHERE TARIFA_ID = '2'))as impNocturno, 
				(lqd_nd+lqd_pd+lqd_nn)as cantTotal, 
				lqd_monto, 
				lqd_registro,
				lqd_montosf,
				(
				lqd_monto +	lqd_montosf
				)as totalRecaudado,
				lqd_nro_magico
				FROM mb_liq_manuales
				WHERE  DATE_FORMAT(lqd_registro,'%Y-%m-%d %H:%i:%s') >= '".$sFechaHoy." ".$hora1."' 	AND DATE_FORMAT(lqd_registro,'%Y-%m-%d %H:%i:%s') <= '".$sFechaManana." ".$hora11."' AND
				lqd_estado = 'ACTIVO'
				
				order by ruta,cajero,lqd_registro 
				
			 ";
			 //echo $sSQL;
			 //die();
			 
    $aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");
    return (array(sizeof($aResult), array_slice($aResult, $i, $r)));
}

function busqueda($r, $i,$a,$b,$c,$d) {
	$sFechaHoy    = date('Y-m-d');
	$sFechaManana = date('Y-m-d',strtotime($sFechaHoy)+86400);
	$sFecha1      = trim($c); //fecha
	$sFecha2      = date('Y-m-d',strtotime($sFecha1)+86400);
    $sRuta 		  = trim($a);	//ruta o patio
	$sTurno       = trim($d);	//turno
	$sCajero      = trim($b); //cajero 
	
	$hora1 = '06:00:00';
	$hora2 = '14:00:00';
	$hora3 = '22:00:00';	
	$hora11 = '05:59:59';
	$hora22 = '13:59:59';
	$hora33 = '21:59:59';	
   
	$sSQL		= " ";	
	

	
	if((int)$sRuta > 0){
		$sSQL = $sSQL." lqd_ruta_id = '$sRuta'	AND ";
	}
	if((int)$sCajero > 0){
		$sSQL = $sSQL." lqd_cajero  = '$sCajero' 	AND ";
	}
	switch((int)$sTurno){
		case 0:
			
			if(!$sFecha1 == 0){
				$sSQL = $sSQL." DATE_FORMAT(lqd_registro,'%Y-%m-%d %H:%i:%s') >= '".$sFecha1." ".$hora1."' 	AND DATE_FORMAT(lqd_registro,'%Y-%m-%d %H:%i:%s') <= '".$sFecha2." ".$hora11."' AND";
			}else{
				$sSQL = $sSQL." DATE_FORMAT(lqd_registro,'%Y-%m-%d %H:%i:%s') >= '".$sFechaHoy." ".$hora1."' 	AND DATE_FORMAT(lqd_registro,'%Y-%m-%d %H:%i:%s') <= '".$sFechaManana." ".$hora11."' AND";
			}
		break;
		case 1:
			
			if(!$sFecha1 == 0){
				$sSQL = $sSQL." DATE_FORMAT(lqd_registro,'%Y-%m-%d %H:%i:%s') >= '".$sFecha1." ".$hora1."' 	AND DATE_FORMAT(lqd_registro,'%Y-%m-%d %H:%i:%s') <= '".$sFecha1." ".$hora22."' AND";
			}else{
				$sSQL = $sSQL." DATE_FORMAT(lqd_registro,'%Y-%m-%d %H:%i:%s') >= '".$sFechaHoy." ".$hora1."' 	AND DATE_FORMAT(lqd_registro,'%Y-%m-%d %H:%i:%s') <= '".$sFechaHoy." ".$hora22."' AND";
			}			
		break;
		case 2:
		
			if(!$sFecha1 == 0){
				$sSQL = $sSQL." DATE_FORMAT(lqd_registro,'%Y-%m-%d %H:%i:%s') >= '".$sFecha1." ".$hora2."' 	AND DATE_FORMAT(lqd_registro,'%Y-%m-%d %H:%i:%s') <= '".$sFecha1." ".$hora33."' AND";
			}else{
				$sSQL = $sSQL." DATE_FORMAT(lqd_registro,'%Y-%m-%d %H:%i:%s') >= '".$sFechaHoy." ".$hora2."' 	AND DATE_FORMAT(lqd_registro,'%Y-%m-%d %H:%i:%s') <= '".$sFechaHoy." ".$hora33."' AND";
			}			
		break;
		case 3:	
	
			if(!$sFecha1 == 0){
				$sSQL = $sSQL." DATE_FORMAT(lqd_registro,'%Y-%m-%d %H:%i:%s') >= '".$sFecha1." ".$hora3."' 	AND DATE_FORMAT(lqd_registro,'%Y-%m-%d %H:%i:%s') <= '".$sFecha2." ".$hora11."' AND";
			}else{
				$sSQL = $sSQL." DATE_FORMAT(lqd_registro,'%Y-%m-%d %H:%i:%s') >= '".$sFechaHoy." ".$hora3."' 	AND DATE_FORMAT(lqd_registro,'%Y-%m-%d %H:%i:%s') <= '".$sFechaManana." ".$hora11."' AND";
			}			
		break;
	} 
	
	
    $sSQL1 = "SELECT lqd_ruta_id,
				(SELECT RUTA_DESCRIPCION 
				FROM mb_rutas 
				WHERE RUTA_ID =  lqd_ruta_id
				) AS ruta,
				lqd_id,
				LQD_CAJERO,
				(SELECT usuario_codigo
				FROM sa_usuarios
				WHERE usuario_funcionario_id = LQD_CAJERO
				) AS cajero, 
				lqd_anfitrion,
				(SELECT usuario_codigo
				FROM sa_usuarios
				WHERE usuario_funcionario_id = lqd_anfitrion
				) AS anfitrion, 
				(SELECT tipo_herramienta_codigo
				FROM mb_tipos_herramienta
				WHERE tipo_herramienta_id = LQD_TIPO_HERRAMIENTA_ID
				) AS bus,
				lqd_nd,
				CASE lqd_ruta_id
					when '1' then(lqd_nd*(SELECT TARIFA_MONTO FROM mb_tarifas WHERE TARIFA_ID = '1'))
					when '2' then(lqd_nd*(SELECT TARIFA_MONTO FROM mb_tarifas WHERE TARIFA_ID = '1'))
					when '3' then(lqd_nd*(SELECT TARIFA_MONTO FROM mb_tarifas WHERE TARIFA_ID = '5'))
				END as impNormal,
				lqd_pd,
				(lqd_pd*(SELECT TARIFA_MONTO FROM mb_tarifas WHERE TARIFA_ID = '3'))as impPreferencial,
				lqd_nn,
				(lqd_nn*(SELECT TARIFA_MONTO FROM mb_tarifas WHERE TARIFA_ID = '2'))as impNocturno, 
				(lqd_nd+lqd_pd+lqd_nn)as cantTotal, 
				lqd_monto, 
				lqd_registro,
				lqd_montosf,
				(
				lqd_monto +	lqd_montosf
				)as totalRecaudado,
				lqd_nro_magico
				FROM mb_liq_manuales
				WHERE  			
				".$sSQL."			
				lqd_estado = 'ACTIVO'
				
				order by ruta,cajero,lqd_registro 
			 ";
		
			 
    $aResult = executeQuery($sSQL1, "COBRO_BUSES_ORIGEN");
    return (array(sizeof($aResult), array_slice($aResult, $i, $r)));
}

function rowsGet1($r, $i) {
    $sSQL = "SELECT  SUM(TAR.TARIFA_MONTO) AS TOTAL
							 FROM MB_TRXS_TMP T
							 INNER JOIN mb_tipos_pasaje TP ON T.TRX_TIPO_PASAJE_ID = TP.TIPO_PASAJE_ID
							 INNER JOIN mb_tarifas TAR ON TP.TIPO_PASAJE_ID = TAR.TARIFA_TIPO_PASAJE_ID
							 WHERE T.TRX_ESTADO = 'ACTIVO'			 
			 ";
    $aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");
    return (array(sizeof($aResult), array_slice($aResult, $i, $r)));
}

function ruta($r, $i) {
    $sSQL = "SELECT * FROM mb_rutas WHERE ruta_estado = 'ACTIVO'			 
			 ";
    $aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");
    return (array(sizeof($aResult), array_slice($aResult, $i, $r)));
}

function cajero($r, $i) {
    $sSQL = "SELECT * FROM sa_usuario_tipos_funcionario
								 INNER JOIN mb_tipos_funcionario ON  UTF_TIPO_FUNCIONARIO_ID  =  TIPO_FUNCIONARIO_ID  
								 INNER JOIN sa_usuarios ON  UTF_USUARIO_ID  = USUARIO_ID
								 WHERE USUARIO_ESTADO='A' AND TIPO_FUNCIONARIO_ESTADO='ACTIVO'
								 AND UTF_TIPO_FUNCIONARIO_ID = '4'
								 ORDER BY USUARIO_CODIGO ASC			 
			 ";
    $aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");
    return (array(sizeof($aResult), array_slice($aResult, $i, $r)));
}

try {
    $option = $_REQUEST["option"];

    switch ($option) {
        case "LST": $pageSize = $_REQUEST["pageSize"];
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
                    list($nLen, $aData) = rowsGet($limit, $start);
                    echo json_encode(array("success" => true, "resultTotal" => $nLen, "resultRoot" => $aData));
                    break;
		case "BUSQUEDA": 
					$pageSize = $_REQUEST["pageSize"];
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
                    $a = isset($_REQUEST["idRuta"])? $_REQUEST["idRuta"] : 0;
                    $b = isset($_REQUEST["idCajero"])? $_REQUEST["idCajero"] : 0;
                    $c = isset($_REQUEST["fecha1"])? $_REQUEST["fecha1"] : 0;
                    $d = isset($_REQUEST["turno"])? $_REQUEST["turno"] : 0;
						
                    list($nLen, $aData) = busqueda($limit, $start,$a,$b,$c,$d);
                    echo json_encode(array("success" => true, "resultTotal" => $nLen, "resultRoot" => $aData));
                    break;
        case "NEW": $sProfileLabel = $_REQUEST["COUNTRY_LABEL"];
                    $sProfileStatus = $_REQUEST["COUNTRY_STATUS"];
                    $sSQL = "INSERT INTO PMT_LF2_PROFILES (PROFILE_LABEL, PROFILE_STATUS,) 
                             VALUES ('$sProfileLabel', '$sProfileStatus') ";
                    $sRes = executeInsert($sSQL);//2013-6-10
                    if ($sRes)
                      echo json_encode(array("success" => true));
                    else
                      echo json_encode(array("success" => false));
                    break;
        case "DEL": $sI = $_REQUEST["i"];					
                    $sSQL = "UPDATE MB_TRXS SET TRX_ESTADO = 'INACTIVO' WHERE TRX_ID = '$sI'";
                    $sRes = executeInsert($sSQL, "COBRO_BUSES_ORIGEN");
                    if ($sRes)
                      echo json_encode(array("success" => true));
                    else
                      echo json_encode(array("success" => false));
                    break;
		case "TOTAL1":  $pageSize = $_REQUEST["pageSize"];
						$limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
						$start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
						list($nLen, $aData) = rowsGet($limit, $start);
						echo json_encode(array("success" => true, "resultTotal" => $nLen, "resultRoot" => $aData));
						break;
		case "LST_RUTA":  
						$pageSize = $_REQUEST["pageSize"];
						$limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
						$start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
						list($nLen, $aData) = ruta($limit, $start);
						echo json_encode(array("success" => true, "resultTotal" => $nLen, "resultRoot" => $aData));
						break;
		case "LST_CAJERO":  
						$pageSize = $_REQUEST["pageSize"];
						$limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
						$start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
						list($nLen, $aData) = cajero($limit, $start);
						echo json_encode(array("success" => true, "resultTotal" => $nLen, "resultRoot" => $aData));
						break;
    }
} catch (Exception $e) {
    echo null;
}

?>