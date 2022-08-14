<?php
require('db.php');

function rowsGet($r, $i) {
    $sSQL = "SELECT * FROM MB_GIROS";
    $aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");
    return (array(sizeof($aResult), array_slice($aResult, $i, $r)));
}

function rowsGetHRR() {
    $sSQL = "SELECT * FROM MB_HERRAMIENTAS H";
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
        case "LSTHRR": $pageSize = $_REQUEST["pageSize"];
					list($nLen, $aData) = rowsGetHRR($limit, $start);
                    echo json_encode(array("success" => true, "resultTotal" => $nLen, "resultRoot" => $aData));
                    break;
        case "NEW": $sProgramacionHRR = $_REQUEST["PRG_HRR_ID"];
                    $sRutaHRR = $_REQUEST["PRG_RUTA_ID"];
					$sFuncionarioID = $_REQUEST["PRG_CONDUCTOR_ID"];
                    $sProgramacionStatus = $_REQUEST["PROGRAMACION_STATUS"];
					$sUsuario = $_SESSION["usr_session"]; 
					$sSQL = "INSERT INTO MB_PROGRAMACIONES (PRG_HRR_ID,PRG_CONDUCTOR_ID,PRG_RUTA_ID,PRG_ESTADO,PRG_USUARIO) 
                             VALUES ('$sProgramacionHRR', '$sRutaHRR','$sFuncionarioID','$sProgramacionStatus','$sUsuario') ";
                    $sRes = executeInsert($sSQL, "COBRO_BUSES_ORIGEN");
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