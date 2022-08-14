<?php
require('db.php');

function rowsGetSI($r, $i, $a) {
    $sSQL = " SELECT L.*, HRR_DESCRIPCION, CONCAT (F.FUNCIONARIO_NOMBRES,' ',F.FUNCIONARIO_PATERNO,' ',F.FUNCIONARIO_MATERNO) AS FUNCIONARIO_NOMBRE_COMPLETO,
              CONCAT (F1.FUNCIONARIO_NOMBRES,' ',F1.FUNCIONARIO_PATERNO,' ',F1.FUNCIONARIO_MATERNO) AS CAJERO_NOMBRE_COMPLETO
              FROM MB_LIQUIDACIONES L
              INNER JOIN MB_HERRAMIENTAS H ON LQD_HRR_ID = HRR_ID
              INNER JOIN MB_FUNCIONARIOS F ON LQD_ANFITRION = F.FUNCIONARIO_ID
              INNER JOIN MB_FUNCIONARIOS F1 ON LQD_CAJERO = F1.FUNCIONARIO_ID
              WHERE LQD_CONFIRMADO = 'SI' AND LQD_ANFITRION LIKE '%$a%'
              ORDER BY LQD_HRR_ID,LQD_PRG_ID,LQD_GIRO_ID";
    $aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");
    return (array(sizeof($aResult), array_slice($aResult, $i, $r)));
}
function rowsGetNO($r, $i, $a) {
    $sSQL = " SELECT L.*, HRR_DESCRIPCION, CONCAT (FUNCIONARIO_NOMBRES,' ',FUNCIONARIO_PATERNO,' ',FUNCIONARIO_MATERNO) AS FUNCIONARIO_NOMBRE_COMPLETO
              FROM MB_LIQUIDACIONES L
              INNER JOIN MB_HERRAMIENTAS H ON LQD_HRR_ID = HRR_ID
              INNER JOIN MB_FUNCIONARIOS F ON LQD_ANFITRION = FUNCIONARIO_ID
              WHERE LQD_CONFIRMADO = 'NO' AND LQD_ANFITRION LIKE '%$a%' 
              ORDER BY LQD_HRR_ID,LQD_PRG_ID,LQD_GIRO_ID";
    $aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");
    return (array(sizeof($aResult), array_slice($aResult, $i, $r)));
}

function rowsGetANF($r, $i) {
    $sSQL = " SELECT CONCAT(FUNCIONARIO_NOMBRES,' ',FUNCIONARIO_PATERNO,' ',FUNCIONARIO_MATERNO) AS FUNCIONARIO_NOMBRE_COMPLETO, FUNCIONARIO_ID AS LQD_ANFITRION
              FROM MB_FUNCIONARIOS 
              WHERE FUNCIONARIO_TIPO_FUNCIONARIO_ID = 2";
    $aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");
    return (array(sizeof($aResult), array_slice($aResult, $i, $r)));
}

function rowsGetGIROS($r, $i, $h) {
    $sSQL = "SELECT GIRO_ID  FROM MB_GIROS
              INNER JOIN MB_PROGRAMACIONES ON GIRO_PRG_ID = PRG_ID
              INNER JOIN MB_HERRAMIENTAS ON PRG_HRR_ID = HRR_ID
              WHERE  HRR_ID = '$h'";
    $aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");
    return (array(sizeof($aResult), array_slice($aResult, $i, $r)));
}
function rowsGetTOTAL($r, $i) {
    $sSQL = " SELECT sum(LQD_MONTO) AS TOTAL FROM MB_LIQUIDACIONES WHERE LQD_CONFIRMADO ='NO'
              UNION SELECT sum(LQD_MONTO) AS TOTAL FROM MB_LIQUIDACIONES WHERE LQD_CONFIRMADO ='SI'";
    $aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");
    return (array(sizeof($aResult), array_slice($aResult, $i, $r)));
}
try {
    $option = $_REQUEST["option"];

    switch ($option) {
        case "LST": $pageSize = $_REQUEST["pageSize"];
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
                    $anfitrion = $_REQUEST["anfitrion"];
                    list($nLen, $aData) = rowsGetNO($limit, $start, $anfitrion);
                    echo json_encode(array("success" => true, "resultTotal" => $nLen, "resultRoot" => $aData));
                    break;
        case "LSTSI": $pageSize = $_REQUEST["pageSize"];
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
                    $anfitrion = $_REQUEST["anfitrion"];
                    list($nLen, $aData) = rowsGetSI($limit, $start, $anfitrion);
                    echo json_encode(array("success" => true, "resultTotal" => $nLen, "resultRoot" => $aData));
                    break;
        case "LSTANF": $pageSize = $_REQUEST["pageSize"];
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
                    list($nLen, $aData) = rowsGetANF($limit, $start);
                    echo json_encode(array("success" => true, "resultTotal" => $nLen, "resultRoot" => $aData));
                    break;
        case "LSTGIRO": $pageSize = $_REQUEST["pageSize"];
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
                    $hrrId = $_REQUEST["hrr_id"];
                    list($nLen, $aData) = rowsGetGIROS($limit, $start,$hrrId);
                    echo json_encode(array("success" => true, "resultTotal" => $nLen, "resultRoot" => $aData));
                    break;
        case "LSTTOTAL": $pageSize = $_REQUEST["pageSize"];
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
                    list($nLen, $aData) = rowsGetTOTAL($limit, $start);
                    echo json_encode(array("success" => true, "resultTotal" => $nLen, "resultRoot" => $aData));
                    break;
        case "NEW": $sHrrId = $_REQUEST["H_HRR_ID"];
                    $sLqdAnfitrion = $_REQUEST["LQDANFITRION"];
                    $sLqdMonto = $_REQUEST["LQDMONTO"];
					          $sLqdConfirmado = $_REQUEST["LQDCONFIRMADO"];
                    $sLqdGiroId = $_REQUEST["GIRO_ID"];
                    $sLqdFlujo = $_REQUEST["LQDFLUJO"];
          					$sUsuario = $_SESSION["usr_session"]; 
                    $idUsuario = $_SESSION["idUsuario"]; 

					          $sFecha = strftime( "%Y-%m-%d", time() );
					          $sSQL = "INSERT INTO MB_LIQUIDACIONES (LQD_ANFITRION, LQD_HRR_ID, LQD_GIRO_ID, LQD_MONTO, LQD_CONFIRMADO, LQD_FLUJO, LQD_REGISTRO, LQD_USUARIO, LQD_CAJERO) 
                             VALUES ('$sLqdAnfitrion', '$sHrrId','$sLqdGiroId','$sLqdMonto','$sLqdConfirmado','$sLqdFlujo','$sFecha','$sUsuario','$idUsuario') ";
                    $sRes = executeInsert($sSQL, "COBRO_BUSES_ORIGEN");
                    if ($sRes)
                      echo json_encode(array("success" => true));
                    else
                      echo json_encode(array("failure" => false));
                    break;
        case "DEL": $sId = $_REQUEST["idLiquidacion"];
                    $sSQL = "UPDATE MB_LIQUIDACIONES SET LQD_ESTADO = 'INACTIVO' WHERE LQD_ID = '$sId'";
                    $sRes = executeDelete($sSQL, "COBRO_BUSES_ORIGEN");;
                    if ($sRes)
                      echo json_encode(array("success" => true));
                    else
                      echo json_encode(array("failure" => false));
                    break;
        case "CONF": $sId = $_REQUEST["idLiquidacion"];
                    $idUsuario = $_SESSION["idUsuario"]; 
                    $sFecha = strftime( "%Y-%m-%d", time() );
                    $sSQL = "UPDATE MB_LIQUIDACIONES SET LQD_CONFIRMADO = 'SI', LQD_CAJERO = '$idUsuario', LQD_REGISTRO = '$sFecha' WHERE LQD_ID = '$sId'";
                    $sRes = executeDelete($sSQL, "COBRO_BUSES_ORIGEN");;
                    if ($sRes)
                      echo json_encode(array("success" => true));
                    else
                      echo json_encode(array("failure" => false));
                    break;
		    case "UPDATE":
                    $sLqdId = $_REQUEST["LQD_ID"];
          					$sHrrId = $_REQUEST["LQD_HRR_ID"];
                    $sLqdAnfitrion = $_REQUEST["LQDANFITRIONM"];
                    $sLqdMonto = $_REQUEST["LQDMONTOM"];
                    $sLqdConfirmado = $_REQUEST["LQDCONFIRMADOM"];
                    $sLqdGiroId = $_REQUEST["GIRO_ID"];
                    $sLqdFlujo = $_REQUEST["LQDFLUJOM"];
                    $sUsuario = $_SESSION["usr_session"]; 
                    $sFecha = strftime( "%Y-%m-%d", time() );
          					$sSQL = "UPDATE MB_LIQUIDACIONES SET 
                              LQD_ANFITRION='$sLqdAnfitrion',LQD_HRR_ID='$sHrrId',LQD_GIRO_ID='$sLqdGiroId',LQD_MONTO='$sLqdMonto',LQD_CONFIRMADO='$sLqdConfirmado',LQD_FLUJO='$sLqdFlujo',LQD_REGISTRO='$sFecha',LQD_USUARIO='$sUsuario'
                              WHERE LQD_ID='$sLqdId'";
                    $sRes = executeDelete($sSQL, "COBRO_BUSES_ORIGEN");
                    if ($sRes)
                      echo json_encode(array("success" => true));
                    else
                      echo json_encode(array("failure" => false));
                    break;
    }
} catch (Exception $e) {
    echo null;
}

?>