<?php
require('dbVersion02.php');
LocalInstanciarConexion();
try {
	$ruta = $_REQUEST["RUTA"];
	//$nm = $_REQUEST["nm"];
	$timeout = 2;
	$sParada = 0;
	$sTransito = "";
	$sSQL = "SELECT DISTINCT NA_BUS, RUTA_DESCRIPCION, NA_IMEI, NA_ESTADO
			FROM MB_NETBOOKS_ACTIVAS
			INNER JOIN MB_RUTAS ON NA_LINEA = RUTA_ID
			WHERE NA_LINEA =$ruta
			ORDER BY NA_BUS;";
	$aRespuestas = LocalExecuteQuery($sSQL);

			
	$i=0;
	foreach ($aRespuestas as $aRow) {
		$sImei = $aRow["NA_IMEI"];
		$sBus = $aRow["NA_BUS"];
		$sLinea = $aRow["RUTA_DESCRIPCION"];
		$sEstado = $aRow["NA_ESTADO"];
		if ($sImei!="" and $sEstado=="ACTIVO") { 
			LocalInstanciarConexionSQLSERVER();
			$limit = isset($_REQUEST["limit"]) ? $_REQUEST["limit"] : 1000000;
			$start = isset($_REQUEST["start"]) ? $_REQUEST["start"] : 0;
			$consultaSql = " SELECT sn_imei_id, tracker_id, r_datetime, l_datetime, latitude, longitude, location, last_alarm_latitude, last_alarm_longitude
								FROM gps_info_last WHERE sn_imei_id = '$sImei'";
			$aRespuestasExt = EjecutarQuerySqlServer($consultaSql);
			$sTransito = "IDA";
			/*$sSQL = "SELECT DISTINCT NA_BUS, RUTA_DESCRIPCION, PARADA_DESCRIPCION, PARADA_DETALLE, PARADA_LONGITUD, PARADA_LATITUD, PARADA_ORDEN
				FROM MB_NETBOOKS_ACTIVAS
				INNER JOIN MB_RUTAS ON NA_LINEA = RUTA_ID
				INNER JOIN MB_PARADAS ON RUTA_ID = PARADA_RUTA_ID
				WHERE PARADA_ESTADO = 'ACTIVO' and RUTA_ID = '$ruta' 
				ORDER BY NA_BUS ;";*/
			$sSQL = "SELECT DISTINCT RUTA_DESCRIPCION, PARADA_DESCRIPCION, PARADA_DETALLE, PARADA_LONGITUD, PARADA_LATITUD, PARADA_ORDEN
					FROM MB_NETBOOKS_ACTIVAS
					INNER JOIN MB_RUTAS ON NA_LINEA = RUTA_ID
					INNER JOIN MB_PARADAS ON RUTA_ID = PARADA_RUTA_ID
				WHERE PARADA_ESTADO = 'ACTIVO' and RUTA_ID = '$ruta';";			
			$aRespuestasParadas = LocalExecuteQuery($sSQL);
			$sw=0;
			foreach ($aRespuestasParadas as $aParadas) {
				if ($sw==0){
					$sParada = $aParadas["PARADA_ORDEN"];
					$sParadaOld = $aParadas["PARADA_ORDEN"];
					$sX = floatval(str_replace(",", ".",$aParadas["PARADA_LONGITUD"]))  - floatval(str_replace(",", ".",$aRespuestasExt[0]["longitude"]));
					$sY = floatval(str_replace(",", ".",$aParadas["PARADA_LATITUD"]))  - floatval(str_replace(",", ".",$aRespuestasExt[0]["latitude"]));
					$sDR = sqrt(pow($sX,2) + pow($sY,2));// RAIZ((K5^2+L5^2))  latitude, longitude
					$sw = 1;
					$sXOld = floatval(str_replace(",", ".",$aParadas["PARADA_LONGITUD"]))  - floatval(str_replace(",", ".",$aRespuestasExt[0]["last_alarm_longitude"]));
					$sYOld = floatval(str_replace(",", ".",$aParadas["PARADA_LATITUD"]))  - floatval(str_replace(",", ".",$aRespuestasExt[0]["last_alarm_latitude"]));
					$sDROld = sqrt(pow($sX,2) + pow($sY,2));
				} else {
					$sX = floatval(str_replace(",", ".",$aParadas["PARADA_LONGITUD"]))  - floatval(str_replace(",", ".",$aRespuestasExt[0]["longitude"]));
					$sY = floatval(str_replace(",", ".",$aParadas["PARADA_LATITUD"]))  - floatval(str_replace(",", ".",$aRespuestasExt[0]["latitude"]));
					$sDRNew = sqrt(pow($sX,2) + pow($sY,2));// RAIZ((K5^2+L5^2))
					if ($sDRNew < $sDR) {
						$sDR = $sDRNew;
						$sParada = $aParadas["PARADA_ORDEN"];
					}
					$sXOld = floatval(str_replace(",", ".",$aParadas["PARADA_LONGITUD"]))  - floatval(str_replace(",", ".",$aRespuestasExt[0]["last_alarm_longitude"]));
					$sYOld = floatval(str_replace(",", ".",$aParadas["PARADA_LATITUD"]))  - floatval(str_replace(",", ".",$aRespuestasExt[0]["last_alarm_latitude"]));
					$sDRNew1 = sqrt(pow($sXOld,2) + pow($sYOld,2));// RAIZ((K5^2+L5^2))
					if ($sDRNew1 < $sDROld) {
						$sDROld = $sDRNew1;
						$sParadaOld = $aParadas["PARADA_ORDEN"];
					}
				}
			}
		//puntos encontrados
			if ($sDR <= 0.02) {
				$sLugar = "PARADA";
			} else {
				$sLugar = "RUTA";
			}
			if ($sDR < $sDROld) {
				$sTransito = "IDA";
			} else {
				$sTransito = "VUELTA";
			}
			$a[$i] = array("success" => true, "bus" => $sBus, "ruta" => $ruta, "parada" => $sParada, "transito" => $sTransito, "lugar" => $sLugar, "paradas" => sizeof($aRespuestasParadas)/2, "latitud_parada" => $aParadas["PARADA_LATITUD"], "longitud_parada" => $aParadas["PARADA_LONGITUD"]);
			$i++;
		}
	}
	//sizeof($a)
	for($i=0;$i<=sizeof($a);$i++){
		for($j=0;$j<sizeof($a)-1;$j++){
			if($a[$j]["parada"]>$a[$j+1]["parada"]) {
				$aux = $a[$j]["parada"];
				$a[$j]["parada"] = $a[$j+1]["parada"];
				$a[$j+1]["parada"] = $aux;
			}
		}
	} 
	$dt = date("Y-m-d H:i");
	$dt = sizeof($aRespuestasParadas)/2;
	echo json_encode($aRespuestasParadas);
} catch (Exception $e) {
    echo null;
}
LocalCerrarConexion();
