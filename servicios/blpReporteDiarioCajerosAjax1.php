<?php
require('db.php');

function rowsGetCombo( $r, $i) {

    $sSQL = "SELECT CONCAT(FUNCIONARIO_PATERNO,' ',FUNCIONARIO_MATERNO,' ',FUNCIONARIO_NOMBRES) AS NOMBRES, FUNCIONARIO_ID AS IDANFITRION
            FROM MB_FUNCIONARIOS 
            INNER JOIN SA_USUARIOS ON FUNCIONARIO_ID = USUARIO_FUNCIONARIO_ID
            INNER JOIN SA_USUARIO_TIPOS_FUNCIONARIO ON USUARIO_ID = UTF_USUARIO_ID
            WHERE UTF_TIPO_FUNCIONARIO_ID = 4";
    $aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");
    return (array(sizeof($aResult), array_slice($aResult, $i, $r)));
}
function rowsGet($r, $i) {
    $fFecha = date("Y-m-d");
    $sSQL = "SELECT LQD_ID, CONCAT(MF1.FUNCIONARIO_NOMBRES, ' ', MF1.FUNCIONARIO_PATERNO, ' ', MF1.FUNCIONARIO_MATERNO ) AS CAJERO_NOMBRE_COMPLETO,
                CONCAT( MF2.FUNCIONARIO_NOMBRES, ' ', MF2.FUNCIONARIO_PATERNO, ' ', MF2.FUNCIONARIO_MATERNO ) AS ANFITRION_NOMBRE_COMPLETO,
                TIPO_HERRAMIENTA_CODIGO AS HRR_DESCRIPCION, COUNT(*) AS PASAJES, SUM(CAST(TRX_TARIFA AS DECIMAL(20,2))) AS MONTO, SUM(CAST(LQD_MONTOSF AS DECIMAL(20,2))) AS SOBRANTE_FALTANTE,
                (SUM(CAST(TRX_TARIFA AS DECIMAL(20,2))) + SUM(CAST(LQD_MONTOSF AS DECIMAL(20,2)))) AS MONTO_COBRADO, DATE(TRX_MODIFICACION) AS FECHA
                FROM MB_LIQUIDACIONES
                INNER JOIN MB_FUNCIONARIOS MF1 ON LQD_CAJERO = MF1.FUNCIONARIO_ID
                INNER JOIN MB_FUNCIONARIOS MF2 ON LQD_ANFITRION = MF2.FUNCIONARIO_ID
                INNER JOIN MB_TRXS ON LQD_ID = TRX_LQD_ID
                INNER JOIN MB_TIPOS_HERRAMIENTA ON TIPO_HERRAMIENTA_ID = LQD_HRR_ID
                WHERE TRX_ESTADO = 'ACTIVO' AND DATE(TRX_MODIFICACION) = '$fFecha' GROUP BY LQD_ID";
    $aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");
    return (array(sizeof($aResult), array_slice($aResult, $i, $r)));
}
function rowsGet2($r, $i, $fIni, $fFin, $sAnfitrion) {
    if ($sAnfitrion=='')
        $sSQL = "SELECT LQD_ID, CONCAT(MF1.FUNCIONARIO_NOMBRES, ' ', MF1.FUNCIONARIO_PATERNO, ' ', MF1.FUNCIONARIO_MATERNO ) AS CAJERO_NOMBRE_COMPLETO,
                CONCAT( MF2.FUNCIONARIO_NOMBRES, ' ', MF2.FUNCIONARIO_PATERNO, ' ', MF2.FUNCIONARIO_MATERNO ) AS ANFITRION_NOMBRE_COMPLETO,
                TIPO_HERRAMIENTA_CODIGO AS HRR_DESCRIPCION, COUNT(*) AS PASAJES, SUM(CAST(TRX_TARIFA AS DECIMAL(20,2))) AS MONTO, SUM(CAST(LQD_MONTOSF AS DECIMAL(20,2))) AS SOBRANTE_FALTANTE,
                (SUM(CAST(TRX_TARIFA AS DECIMAL(20,2))) + SUM(CAST(LQD_MONTOSF AS DECIMAL(20,2)))) AS MONTO_COBRADO, DATE(TRX_MODIFICACION) AS FECHA
                FROM MB_LIQUIDACIONES
                INNER JOIN MB_FUNCIONARIOS MF1 ON LQD_CAJERO = MF1.FUNCIONARIO_ID
                INNER JOIN MB_FUNCIONARIOS MF2 ON LQD_ANFITRION = MF2.FUNCIONARIO_ID
                INNER JOIN MB_TRXS ON LQD_ID = TRX_LQD_ID
                INNER JOIN MB_TIPOS_HERRAMIENTA ON TIPO_HERRAMIENTA_ID = LQD_HRR_ID
            WHERE TRX_ESTADO = 'ACTIVO' AND DATE(TRX_MODIFICACION) BETWEEN " . "'" .$fIni . "'" . " AND " . "'" . $fFin . "' GROUP BY LQD_ID";
    else
        $sSQL = "SELECT LQD_ID, CONCAT(MF1.FUNCIONARIO_NOMBRES, ' ', MF1.FUNCIONARIO_PATERNO, ' ', MF1.FUNCIONARIO_MATERNO ) AS CAJERO_NOMBRE_COMPLETO,
                CONCAT( MF2.FUNCIONARIO_NOMBRES, ' ', MF2.FUNCIONARIO_PATERNO, ' ', MF2.FUNCIONARIO_MATERNO ) AS ANFITRION_NOMBRE_COMPLETO,
                TIPO_HERRAMIENTA_CODIGO AS HRR_DESCRIPCION, COUNT(*) AS PASAJES, SUM(CAST(TRX_TARIFA AS DECIMAL(20,2))) AS MONTO, SUM(CAST(LQD_MONTOSF AS DECIMAL(20,2))) AS SOBRANTE_FALTANTE,
                (SUM(CAST(TRX_TARIFA AS DECIMAL(20,2))) + SUM(CAST(LQD_MONTOSF AS DECIMAL(20,2)))) AS MONTO_COBRADO, DATE(TRX_MODIFICACION) AS FECHA
                FROM MB_LIQUIDACIONES
                INNER JOIN MB_FUNCIONARIOS MF1 ON LQD_CAJERO = MF1.FUNCIONARIO_ID
                INNER JOIN MB_FUNCIONARIOS MF2 ON LQD_ANFITRION = MF2.FUNCIONARIO_ID
                INNER JOIN MB_TRXS ON LQD_ID = TRX_LQD_ID
                INNER JOIN MB_TIPOS_HERRAMIENTA ON TIPO_HERRAMIENTA_ID = LQD_HRR_ID
            WHERE TRX_ESTADO = 'ACTIVO' AND DATE(TRX_MODIFICACION) BETWEEN " . "'" .$fIni . "'" . " AND " . "'" . $fFin . "' AND MF1.FUNCIONARIO_ID = '" . $sAnfitrion . "'
            GROUP BY LQD_ID";
    $aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");
    return (array(sizeof($aResult), array_slice($aResult, $i, $r)));
}
function rowsTotal($r, $i) {
    $fFecha = date("Y-m-d");
    $sSQL = "SELECT SUM(CAST(TRX_TARIFA AS DECIMAL(20,2))) AS MONTO, SUM(CAST(LQD_MONTOSF AS DECIMAL(20,2))) AS SOBRANTE_FALTANTE,
                (SUM(CAST(TRX_TARIFA AS DECIMAL(20,2))) + SUM(CAST(LQD_MONTOSF AS DECIMAL(20,2)))) AS MONTO_COBRADO
                FROM MB_LIQUIDACIONES
                INNER JOIN MB_TRXS ON LQD_ID = TRX_LQD_ID
                WHERE TRX_ESTADO = 'ACTIVO' AND DATE(TRX_MODIFICACION) = '$fFecha'";
    $aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");
    return (array(sizeof($aResult), array_slice($aResult, $i, $r)));
}
function rowsTotal2($r, $i, $fIni, $fFin, $sAnfitrion) {
    if ($sAnfitrion=='')
        $sSQL = "SELECT SUM(CAST(TRX_TARIFA AS DECIMAL(20,2))) AS MONTO, SUM(CAST(LQD_MONTOSF AS DECIMAL(20,2))) AS SOBRANTE_FALTANTE,
                (SUM(CAST(TRX_TARIFA AS DECIMAL(20,2))) + SUM(CAST(LQD_MONTOSF AS DECIMAL(20,2)))) AS MONTO_COBRADO
                FROM MB_LIQUIDACIONES
                INNER JOIN MB_TRXS ON LQD_ID = TRX_LQD_ID
            WHERE TRX_ESTADO = 'ACTIVO' AND DATE(TRX_MODIFICACION) BETWEEN " . "'" .$fIni . "'" . " AND " . "'" . $fFin . "' ";
    else
        $sSQL = "SELECT SUM(CAST(TRX_TARIFA AS DECIMAL(20,2))) AS MONTO, SUM(CAST(LQD_MONTOSF AS DECIMAL(20,2))) AS SOBRANTE_FALTANTE,
                (SUM(CAST(TRX_TARIFA AS DECIMAL(20,2))) + SUM(CAST(LQD_MONTOSF AS DECIMAL(20,2)))) AS MONTO_COBRADO
                FROM MB_LIQUIDACIONES
                INNER JOIN MB_TRXS ON LQD_ID = TRX_LQD_ID
            WHERE TRX_ESTADO = 'ACTIVO' AND DATE(TRX_MODIFICACION) BETWEEN " . "'" .$fIni . "'" . " AND " . "'" . $fFin . "' AND FUNCIONARIO_ID = '" . $sAnfitrion . "'";
    //print_r($sSQL);
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
		case "LIST_2": 
					$pageSize = $_REQUEST["pageSize"];
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;		
					
					$fIni = $_REQUEST["fechaInicio"];
                    if ($fIni=='')
                        $fIni = date("Y-m-d");
					$fFin = $_REQUEST["fechaFinal"];
                    if ($fFin=='')
                        $fFin = date("Y-m-d");
                    $sAnfitrion = isset($_REQUEST["anfitrion"])? $_REQUEST["anfitrion"] : 0;
                    list($nLen, $aData) = rowsGet2($limit, $start, $fIni, $fFin, $sAnfitrion);
                    echo json_encode(array("success" => true, "resultTotal" => $nLen, "resultRoot" => $aData));
                    break;
        case "LST_MONTO": $pageSize = $_REQUEST["pageSize"];
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
                    list($nLen, $aData) = rowsTotal($limit, $start);
                    echo json_encode(array("success" => true, "resultTotal" => $nLen, "resultRoot" => $aData));
                    break;
        case "LST_MONTO2": 
                    $pageSize = $_REQUEST["pageSize"];
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;     
                    
                    $fIni = $_REQUEST["fechaInicio"];
                    if ($fIni=='')
                        $fIni = date("Y-m-d");
                    $fFin = $_REQUEST["fechaFinal"];
                    if ($fFin=='')
                        $fFin = date("Y-m-d");
                    $sAnfitrion = isset($_REQUEST["anfitrion"])? $_REQUEST["anfitrion"] : 0;
                    list($nLen, $aData) = rowsTotal2($limit, $start, $fIni, $fFin, $sAnfitrion);
                    echo json_encode(array("success" => true, "resultTotal" => $nLen, "resultRoot" => $aData));
                    break;
        case "LST44": 
                    $pageSize = $_REQUEST["pageSize"];
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
                    list($nLen, $aData) = rowsGetCombo($limit, $start);
                    echo json_encode(array("success" => true, "resultTotal" => $nLen, "resultRoot" => $aData));
                    break;
    }
} catch (Exception $e) {
    echo null;
}

?>