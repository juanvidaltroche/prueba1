<?php
require('db.php');

function rowsGet($r, $i) {
    $sSQL = "SELECT T.TRX_GIRO_ID AS GIRO, TP.TIPO_PASAJE_DESCRIPCION AS TIPO_PASAJE,COUNT(T.TRX_TIPO_PASAJE_ID)AS CANTIDAD, TAR.TARIFA_MONTO AS TARIFA_UNITARIA ,SUM(TAR.TARIFA_MONTO)AS TOTAL
				FROM MB_TRXS_TMP T
				INNER JOIN mb_tipos_pasaje TP ON T.TRX_TIPO_PASAJE_ID = TP.TIPO_PASAJE_ID
				INNER JOIN mb_tarifas TAR ON TP.TIPO_PASAJE_ID = TAR.TARIFA_TIPO_PASAJE_ID
				WHERE T.TRX_ESTADO =  'ACTIVO'
				GROUP BY TRX_GIRO_ID,TIPO_PASAJE_DESCRIPCION
				ORDER BY TRX_GIRO_ID,TIPO_PASAJE_DESCRIPCION			 
			 ";
    $aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");
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

try {
    $option = $_REQUEST["option"];

    switch ($option) {
        case "LST": $pageSize = $_REQUEST["pageSize"];
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
                    list($nLen, $aData) = rowsGet($limit, $start);
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
					//$sSQL = "DELETE FROM mb_trxs WHERE TRX_ID = '$sI'";
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
    }
} catch (Exception $e) {
    echo null;
}

?>