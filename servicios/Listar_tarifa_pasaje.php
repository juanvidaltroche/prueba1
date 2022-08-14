<?php
require('db.php');

function rowsGet($r, $i) {
    $sSQL = "SELECT P.TIPO_PASAJE_DESCRIPCION,T.TARIFA_MONTO 
			FROM MB_TARIFAS T
			INNER JOIN MB_TIPOS_PASAJE P ON P.TIPO_PASAJE_ID=T.TARIFA_TIPO_PASAJE_ID
            WHERE TARIFA_ESTADO='ACTIVO'";
    $aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");
    return (array(sizeof($aResult), array_slice($aResult, $i, $r)));
}

try {
    $pageSize = 5000;                   
	$limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
	$start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
	list($nLen, $aData) = rowsGet($limit, $start);
		echo json_encode(array("datos" => $aData));
    }
    catch (Exception $e) {
    echo $json= "{\"datos\":[{\"success\":\"false\"}]}";
}
?>