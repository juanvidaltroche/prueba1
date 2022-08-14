<?php
require('db.php');

function rowsGet($r, $i,$idRuta) {
		$sSQL = "SELECT PARADA_ID,PARADA_DESCRIPCION,PARADA_DETALLE,PARADA_LONGITUD,PARADA_LATITUD,PARADA_ORDEN,PARADA_ESTADO
				FROM MB_RTS_PRDS     
				INNER JOIN MB_RUTAS ON RTS_PRD_RUTA_ID=RUTA_ID 
				INNER JOIN MB_PARADAS ON RTS_PRD_PARADA_ID=PARADA_ID 
				WHERE RUTA_ID='$idRuta' AND RUTA_ESTADO='ACTIVO' AND PARADA_ESTADO='ACTIVO' AND RTS_PRD_ESTADO='ACTIVO'";
		$aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");
		return (array(sizeof($aResult), array_slice($aResult, $i, $r)));
}

try {
    $option = $_REQUEST["option"];
    switch ($option) {
        case "LST": $pageSize = $_REQUEST["pageSize"];
					$idRuta = $_REQUEST["idRuta"];
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
                    list($nLen, $aData) = rowsGet($limit, $start,$idRuta);
                    echo json_encode(array("success" => true, "resultTotal" => $nLen, "resultRoot" => $aData));
                    break;		
    }
}catch (Exception $e){
    echo null;
}

?>