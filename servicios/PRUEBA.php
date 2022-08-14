<?php
	require('dbVersion02.php');
	LocalInstanciarConexionSQLSERVER();
	/*
	$limit = isset($_REQUEST["limit"]) ? $_REQUEST["limit"] : 1000000;
	$start = isset($_REQUEST["start"]) ? $_REQUEST["start"] : 0;
	$consultaSql = " SELECT  tracker_auto_id, sn_imei_id, tracker_id, tracker_password, tracker_name
	FROM         tracker_info
	order by tracker_name";
	$respuesta   = EjecutarQuerySqlServer($consultaSql);
	$consultasql = "";
	foreach ($respuesta as $aRow) {
	$sImei = $aRow["sn_imei_id"];
	$sBus = $aRow["tracker_name"];
	$sBus = explode("-",$aRow["tracker_name"]);
	$sHRR = (int) $sBus[1];
	$consultasql = $consultasql . "UPDATE  mb_netbooks_activas SET NA_IMEI = '$sImei' WHERE NA_BUS = '$sHRR'; <BR>";
	}
	print_r($consultasql);
	die();
	doGenerarJsonRespuesta($respuesta, $start, $limit);*/

	$limit = isset($_REQUEST["limit"]) ? $_REQUEST["limit"] : 1000000;
	$start = isset($_REQUEST["start"]) ? $_REQUEST["start"] : 0;
	$IMEI = "013227005487198";
	$consultaSql = " SELECT sn_imei_id, tracker_id, r_datetime, l_datetime, latitude, longitude, location, last_alarm_latitude, last_alarm_longitude
						FROM gps_info_last WHERE sn_imei_id = '$IMEI'";
	$respuesta = EjecutarQuerySqlServer($consultaSql);
	echo "<PRE>";
	print_r($respuesta);
	echo "</PRE>";
	die();
	doGenerarJsonRespuesta($respuesta, $start, $limit);
?>