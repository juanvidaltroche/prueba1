<?php
require('db2.php');

function rowsGet($r, $i) {
    $sSQL = "SELECT RUTA_ID, PARADA_DETALLE, PARADA_LONGITUD, PARADA_LATITUD
			FROM MB_RTS_PRDS
			INNER JOIN MB_RUTAS ON RUTA_ID = RTS_PRD_RUTA_ID
			INNER JOIN MB_PARADAS ON PARADA_ID = RTS_PRD_PARADA_ID
			WHERE RUTA_ESTADO='ACTIVO'";			
    $aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");
    return (array(sizeof($aResult), array_slice($aResult, $i, $r)));
}

try {
    $pageSize = 100000;                   
	$limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
	$start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
	list($nLen, $aData) = rowsGet($limit, $start);
		echo json_encode(array("datos" => $aData));
    }
    catch (Exception $e) {
    echo $json= "{\"datos\":[{\"success\":\"false\"}]}";
}
?>