<?php
require('dbVersion02.php');
LocalInstanciarConexion();
try {
	$ruta = $_REQUEST["RUTA"];
	$nm = $_REQUEST["nm"];
	$timeout = 2;
	$sParada = 0;
	$error = "";
	$sTransito = "";
	$sSQL = "SELECT DISTINCT NA_BUS, RUTA_DESCRIPCION, NA_IMEI, NA_ESTADO,NA_RUTA
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
		//print_r($sImei); echo "<br>";
		if ($sImei!="" and $sEstado=="ACTIVO") { 
			LocalInstanciarConexionSQLSERVER();
			$limit = isset($_REQUEST["limit"]) ? $_REQUEST["limit"] : 1000000;
			$start = isset($_REQUEST["start"]) ? $_REQUEST["start"] : 0;
			$consultaSql = " SELECT sn_imei_id, tracker_id, r_datetime, l_datetime, latitude, longitude, location, last_alarm_latitude, last_alarm_longitude
								FROM gps_info_last WHERE sn_imei_id = '$sImei'";
			$aRespuestasExt = EjecutarQuerySqlServer($consultaSql);
			$sTransito = "IDA";
			$sSQL = "SELECT DISTINCT RUTA_DESCRIPCION, PARADA_DESCRIPCION, PARADA_DETALLE, PARADA_LONGITUD, PARADA_LATITUD, PARADA_ORDEN
				FROM MB_NETBOOKS_ACTIVAS
				INNER JOIN MB_RUTAS ON NA_LINEA = RUTA_ID
				INNER JOIN MB_PARADAS ON RUTA_ID = PARADA_RUTA_ID
				WHERE NA_IMEI =$sImei AND PARADA_ESTADO = 'ACTIVO' and RUTA_ID = '$ruta' 
				ORDER BY NA_BUS ;";
			$aRespuestasParadas = LocalExecuteQuery($sSQL);
			//echo("<pre>");
			//print_r($aRespuestasParadas);
			//echo("</pre>");
			//die();
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
			if ($sDR <= 0.001) {
				$sLugar = "PARADA";
			} else {
				$sLugar = "RUTA";
			}
			/*if ($sDR < $sDROld) {
				$sTransito = "IDA";
			} else {
				$sTransito = "VUELTA";
			}*/
			if ($sParada == $sParadaOld) {
				if ($sParada == 0 && $sDR == $sDROld){
					$sTransito = "PATIO";
				} else {
					$sParada1 = $aRespuestasParadas[0]["PARADA_ORDEN"];
					$sX = floatval(str_replace(",", ".",$aRespuestasParadas[0]["PARADA_LONGITUD"]))  - floatval(str_replace(",", ".",$aRespuestasExt[0]["longitude"]));
					$sY = floatval(str_replace(",", ".",$aRespuestasParadas[0]["PARADA_LATITUD"]))  - floatval(str_replace(",", ".",$aRespuestasExt[0]["latitude"]));
					$sDR12 = sqrt(pow($sX,2) + pow($sY,2));// RAIZ((K5^2+L5^2))  latitude, longitude
					$sX = floatval(str_replace(",", ".",$aRespuestasParadas[0]["PARADA_LONGITUD"]))  - floatval(str_replace(",", ".",$aRespuestasExt[0]["last_alarm_longitude"]));
					$sY = floatval(str_replace(",", ".",$aRespuestasParadas[0]["PARADA_LATITUD"]))  - floatval(str_replace(",", ".",$aRespuestasExt[0]["last_alarm_latitude"]));
					$sDR22 = sqrt(pow($sX,2) + pow($sY,2));// RAIZ((K5^2+L5^2))  latitude, longitude
					
					$sParada17 = $aRespuestasParadas[sizeof($aRespuestasParadas)-1]["PARADA_ORDEN"];
					$sX = floatval(str_replace(",", ".",$aRespuestasParadas[sizeof($aRespuestasParadas)-1]["PARADA_LONGITUD"]))  - floatval(str_replace(",", ".",$aRespuestasExt[0]["longitude"]));
					$sY = floatval(str_replace(",", ".",$aRespuestasParadas[sizeof($aRespuestasParadas)-1]["PARADA_LATITUD"]))  - floatval(str_replace(",", ".",$aRespuestasExt[0]["latitude"]));
					$sDR11 = sqrt(pow($sX,2) + pow($sY,2));// RAIZ((K5^2+L5^2))  latitude, longitude
					$sX = floatval(str_replace(",", ".",$aRespuestasParadas[sizeof($aRespuestasParadas)-1]["PARADA_LONGITUD"]))  - floatval(str_replace(",", ".",$aRespuestasExt[0]["last_alarm_longitude"]));
					$sY = floatval(str_replace(",", ".",$aRespuestasParadas[sizeof($aRespuestasParadas)-1]["PARADA_LATITUD"]))  - floatval(str_replace(",", ".",$aRespuestasExt[0]["last_alarm_latitude"]));
					$sDR21 = sqrt(pow($sX,2) + pow($sY,2));// RAIZ((K5^2+L5^2))  latitude, longitude
					
					if ($sDR12 > $sDR22 && $sDR11 < $sDR21 ) {
						$sTransito = "IDA";
					} else if($sDR12 < $sDR22 && $sDR11 > $sDR21 ) {
						$sTransito = "VUELTA";
					} else {
						$error = "SINRUTA";
						$sTransito = $aRespuestas[0]["NA_RUTA"];
						/*
						echo "<table> <tr><td>posicion</td><td>".$sParada1."</td><td>" . $sParada . "</td><td>".$sParada17."</td></tr>";
						echo "<tr><td>actual</td><td>" . $sDR12 . "</td><td>" . $sDR . "</td><td>".$sDR11."</td></tr>";
						echo "<tr><td>actual</td><td>" . $sDR22 . "</td><td>" . $sDROld . "</td><td>".$sDR21."</td></tr></table>";	
						*/
					}
				}
			} elseif ($sParada < $sParadaOld) {
				$sTransito = "VUELTA";
			} elseif ($sParada > $sParadaOld) {
				$sTransito = "IDA";				
			}
			if ($error != "SINRUTA") {
				$sSQL = "UPDATE MB_NETBOOKS_ACTIVAS SET NA_RUTA = '$sTransito'
						WHERE NA_BUS =$sBus AND NA_ESTADO='ACTIVO'; ";
				$aResInsert = LocalExecuteQuery($sSQL);
			}
			$a[$i] = array("success" => true, "bus" => $sBus, "nm" => $nm, "ruta" => $ruta, "parada" => $sParada, "transito" => $sTransito, "lugar" => $sLugar, "paradas" => sizeof($aRespuestasParadas)/2, "latitud" => $aRespuestasExt[0]["latitude"], "longitud" => $aRespuestasExt[0]["longitude"]);
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
	echo json_encode($a);
	
	//echo json_encode(array("success" => true, "resultado" => $sParada, "nm" => $nm, "equipo" => $hrr, "paradas" => $dt, "transito" => $sTransito, "lugar" => $sLugar));
						//{"success":true,"resultado":"11","nm":"0","equipo":"10","paradas":17,"transito":"IDA"}
} catch (Exception $e) {
    echo null;
}
LocalCerrarConexion();
