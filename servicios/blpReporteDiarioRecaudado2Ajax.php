<?php
require('db.php');

function rowsGet67($r, $i) {
    $sUsuario = $_SESSION["usr_session"];
    $sSQL = "	SELECT SUM(L.LQD_MONTO) AS TOTAL
				FROM MB_LIQUIDACIONES L
				INNER JOIN MB_HERRAMIENTAS H ON L.LQD_HRR_ID = H.HRR_ID
				WHERE L.LQD_ESTADO = 'ACTIVO' AND L.LQD_USUARIO = 'JOSE'
				";
    $aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");
    return (array(sizeof($aResult), array_slice($aResult, $i, $r)));
}

function rowsGet( $sUsaurio,$fFechaInicio,$r, $i) {
    $sSQL = "SELECT SUM( L.LQD_MONTO ) AS TOTAL
			FROM MB_LIQUIDACIONES L
			INNER JOIN MB_HERRAMIENTAS H ON L.LQD_HRR_ID = H.HRR_ID
			INNER JOIN MB_PROGRAMACIONES P ON P.PRG_ID=L.LQD_PRG_ID
			INNER JOIN MB_FUNCIONARIOS TF ON TF.FUNCIONARIO_ID = L.LQD_CAJERO
			WHERE L.LQD_ESTADO = 'ACTIVO'
			AND L.LQD_CAJERO =" . "'" . $sUsaurio . "'
			AND L.LQD_MODIFICACION = " . "'" . $fFechaInicio ."'" . " 
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
		case "LST33": 
		//params: {"option": "LST33", "sFecha": "2013/02/13", "sUsaurio": "JOSE"},
					$sUsaurio = $_REQUEST["sUsaurio"];
					$vFechaInicio = $_REQUEST["vFechaInicio"];
					$fFechaInicio = date("Y-m-d",strtotime($vFechaInicio));
					
					$pageSize = $_REQUEST["pageSize"];
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
                    list($nLen, $aData) = rowsGet($sUsaurio,$fFechaInicio,$limit, $start);
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