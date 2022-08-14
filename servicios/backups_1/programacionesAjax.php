<?php
require('db.php');

function rowsGet($r, $i) {
    $sSQL = "SELECT p.*
			 FROM mb_programaciones p
             ORDER BY 2 ";
    $aResult = executeQuery($sSQL, "cobro_buses_origen");
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
                    $sSQL = "INSERT INTO PMT_LF2_PROFILES (PROFILE_LABEL, PROFILE_STATUS) 
                             VALUES ('$sProfileLabel', '$sProfileStatus') ";
                    $sRes = executeQuery($sSQL);
                    if ($sRes)
                      echo json_encode(array("success" => true));
                    else
                      echo json_encode(array("success" => false));
                    break;
        case "DEL": $sI = $_REQUEST["i"];
                    $sSQL = "DELETE FROM PMT_LF2_PROFILES WHERE PROFILE_ID = '$sI'";
                    $sRes = executeQuery($sSQL);
                    if ($sRes)
                      echo json_encode(array("success" => true));
                    else
                      echo json_encode(array("success" => false));
                    break;
    }
} catch (Exception $e) {
    echo null;
}

?>