<?php
require('dbVersion02.php');
LocalInstanciarConexion();
try {
	$hrr = $_REQUEST["HRR"];
	$nm = $_REQUEST["nm"];
	$timeout = 2;
	$sParada = 0;
	$sTransito = "";
	$sSQL = "SELECT DISTINCT NA_BUS, RUTA_DESCRIPCION, PARADA_DESCRIPCION, PARADA_DETALLE, PARADA_LONGITUD, PARADA_LATITUD, PARADA_ORDEN, NA_IMEI, NA_ESTADO
			FROM MB_NETBOOKS_ACTIVAS
			INNER JOIN MB_RUTAS ON NA_LINEA = RUTA_ID
			INNER JOIN MB_PARADAS ON RUTA_ID = PARADA_RUTA_ID
			WHERE NA_BUS =$hrr AND PARADA_ESTADO = 'ACTIVO';";
	$aRespuestas = LocalExecuteQuery($sSQL);
	if ($aRespuestas[0]["NA_ESTADO"]=="ACTIVO") {
		if (isset($aRespuestas[0]["NA_IMEI"])) {
			$sImei = $aRespuestas[0]["NA_IMEI"];
			$sBus = $aRespuestas[0]["NA_BUS"];
			$sLinea = $aRespuestas[0]["RUTA_DESCRIPCION"];
			//
			/*
			RemotoInstanciarConexion();
			$sSQLExt = "SELECT * FROM gps_buses WHERE IMEI = $sImei"; //aumentar limit
			$aRespuestasExt = RemotoExecuteQuery($sSQLExt);
			$sTransito = $aRespuestasExt[0]["TRANSITO"];
			RemotoCerrarConexion();
			*/
			//
			LocalInstanciarConexionSQLSERVER();
			$limit = isset($_REQUEST["limit"]) ? $_REQUEST["limit"] : 1000000;
			$start = isset($_REQUEST["start"]) ? $_REQUEST["start"] : 0;
			$consultaSql = " SELECT sn_imei_id, tracker_id, r_datetime, l_datetime, latitude, longitude, location, last_alarm_latitude, last_alarm_longitude
								FROM gps_info_last WHERE sn_imei_id = '$sImei'";
			$aRespuestasExt = EjecutarQuerySqlServer($consultaSql);
			$sTransito = "IDA";

			foreach ($aRespuestasExt as $aRow) {
				$sParada = $aRespuestas[0]["PARADA_ORDEN"];
				$sParadaOld = $aRespuestas[0]["PARADA_ORDEN"];
				$sX = floatval(str_replace(",", ".",$aRespuestas[0]["PARADA_LONGITUD"]))  - floatval(str_replace(",", ".",$aRow["longitude"]));
				$sY = floatval(str_replace(",", ".",$aRespuestas[0]["PARADA_LATITUD"]))  - floatval(str_replace(",", ".",$aRow["latitude"]));
				$sDR = sqrt(pow($sX,2) + pow($sY,2));// RAIZ((K5^2+L5^2))  latitude, longitude
				$i = 0;
				$sXOld = floatval(str_replace(",", ".",$aRespuestas[0]["PARADA_LONGITUD"]))  - floatval(str_replace(",", ".",$aRow["last_alarm_longitude"]));
				$sYOld = floatval(str_replace(",", ".",$aRespuestas[0]["PARADA_LATITUD"]))  - floatval(str_replace(",", ".",$aRow["last_alarm_latitude"]));
				$sDROld = sqrt(pow($sX,2) + pow($sY,2));// RAIZ((K5^2+L5^2))  latitude, longitude
				foreach ($aRespuestas as $paradasRow) {
					//if ($paradasRow["PARADA_DETALLE"] == $aRow["TRANSITO"]) {
					//if ($paradasRow["PARADA_DETALLE"] == "IDA") {
						$sX = floatval(str_replace(",", ".",$paradasRow["PARADA_LONGITUD"]))  - floatval(str_replace(",", ".",$aRow["longitude"]));
						$sY = floatval(str_replace(",", ".",$paradasRow["PARADA_LATITUD"]))  - floatval(str_replace(",", ".",$aRow["latitude"]));
						$sDRNew = sqrt(pow($sX,2) + pow($sY,2));// RAIZ((K5^2+L5^2))
						if ($sDRNew < $sDR) {
							$sDR = $sDRNew;
							$sParada = $paradasRow["PARADA_ORDEN"];
							//$sBus = $aRow["BUS"];
							//$sLinea = $aRow["LINEA"];
						}
						$sXOld = floatval(str_replace(",", ".",$paradasRow["PARADA_LONGITUD"]))  - floatval(str_replace(",", ".",$aRow["last_alarm_longitude"]));
						$sYOld = floatval(str_replace(",", ".",$paradasRow["PARADA_LATITUD"]))  - floatval(str_replace(",", ".",$aRow["last_alarm_latitude"]));
						$sDRNew1 = sqrt(pow($sXOld,2) + pow($sYOld,2));// RAIZ((K5^2+L5^2))
						if ($sDRNew1 < $sDROld) {
							$sDROld = $sDRNew1;
							$sParadaOld = $paradasRow["PARADA_ORDEN"];
							//$sBus = $aRow["BUS"];
							//$sLinea = $aRow["LINEA"];
						}
					//}
					$i++;
				}
			}
		} else {
			$sParada = 0;
		}
		if ($sDR <= 0.005) {
			$sLugar = "PARADA";
		} else {
			$sLugar = "RUTA";
		}
		if ($sDR < $sDROld) {
			$sTransito = "VUELTA";
		} else {
			$sTransito = "IDA";
		} 
	} else {
		$sParada = "MANTENIMIENTO";
		$sLugar = "MANTENIMIENTO";
	}
	
	//0.016721829662611
	//0.028685067401129
	//{"success":true,"resultado":"MANTENIMIENTO","nm":"2","equipo":"17","paradas":17,"transito":""}
	//{"success":true,"resultado":              0,"nm":"1","equipo":"11","paradas":17,"transito":null}

	//$aRespuestas
	$dt = date("Y-m-d H:i");
	$dt = sizeof($aRespuestas)/2;
	
	echo json_encode(array("success" => true, "resultado" => $sParada, "nm" => $nm, "equipo" => $hrr, "paradas" => $dt, "transito" => $sTransito, "lugar" => $sLugar));
						//{"success":true,"resultado":"11","nm":"0","equipo":"10","paradas":17,"transito":"IDA"}
} catch (Exception $e) {
    echo null;
}
LocalCerrarConexion();
