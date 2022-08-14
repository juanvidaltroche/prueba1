<?php
require('db.php');
function rowsTotal($r, $i) {
    $fFecha = date("Y-m-d");
    $sSQL = "SELECT SUM(CAST(TRX_TARIFA AS DECIMAL(20,2))) AS MONTO_TOTAL
                FROM MB_LIQUIDACIONES
                INNER JOIN MB_TRXS ON LQD_ID = TRX_LQD_ID
                WHERE DATE(TRX_MODIFICACION) = '$fFecha' and TRX_ESTADO = 'ACTIVO'";
    $aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");
    return (array(sizeof($aResult), array_slice($aResult, $i, $r)));
}
function rowsGet($r, $i) {
    $fFecha = date("Y-m-d");
    $sSQL = "SELECT LQD_ID, CONCAT(M1.FUNCIONARIO_PATERNO, ' ', M1.FUNCIONARIO_MATERNO, ' ', M1.FUNCIONARIO_NOMBRES ) AS ANFITRION_NOMBRE_COMPLETO,
            CONCAT(M2.FUNCIONARIO_PATERNO, ' ', M2.FUNCIONARIO_MATERNO, ' ', M2.FUNCIONARIO_NOMBRES ) AS CAJERO_NOMBRE_COMPLETO, RUTA_DESCRIPCION,
            LQD_PD AS PREFERENCIAL, LQD_ND AS NORMAL, (LQD_PN +  LQD_NN) AS NOCTURNO,
            CAST(LQD_MONTO AS DECIMAL(20,2)) AS MONTO, CAST(LQD_MONTOSF AS DECIMAL(20,2)) AS SOBRANTE_FALTANTE,
            CAST(LQD_MONTO AS DECIMAL(20,2))+CAST(LQD_MONTOSF AS DECIMAL(20,2)) AS MONTO_COBRADO,
            DATE(LQD_REGISTRO) AS FECHA, TIPO_HERRAMIENTA_CODIGO AS 'HRR_DESCRIPCION', LQD_TURNO
            FROM MB_LIQ_MANUALES
            INNER JOIN MB_TIPOS_HERRAMIENTA ON LQD_TIPO_HERRAMIENTA_ID = TIPO_HERRAMIENTA_ID
            INNER JOIN MB_FUNCIONARIOS M1 ON M1.FUNCIONARIO_ID = LQD_ANFITRION
            INNER JOIN MB_FUNCIONARIOS M2 ON M2.FUNCIONARIO_ID = LQD_CAJERO
            INNER JOIN MB_RUTAS ON RUTA_ID = LQD_RUTA_ID
            WHERE DATE(LQD_REGISTRO) = '$fFecha' and LQD_ESTADO = 'ACTIVO'
            ORDER BY FECHA, RUTA_ID, LQD_ANFITRION";
    $aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");
    return (array(sizeof($aResult), array_slice($aResult, $i, $r)));
}

function rowsGet2($r, $i, $fIni, $fFin, $sAnfitrion) {
    if($sAnfitrion=='')
        $sSQL = "SELECT CONCAT( F1.FUNCIONARIO_NOMBRES, ' ', F1.FUNCIONARIO_PATERNO, ' ', F1.FUNCIONARIO_MATERNO ) AS FUNCIONARIO_NOMBRE_COMPLETO,
                CONCAT( F2.FUNCIONARIO_NOMBRES, ' ', F2.FUNCIONARIO_PATERNO, ' ', F2.FUNCIONARIO_MATERNO ) AS CAJERO_NOMBRE_COMPLETO, TIPO_HERRAMIENTA_CODIGO,
                TIPO_PASAJE_DESCRIPCION, COUNT(*) AS PASAJES, SUM(CAST(TRX_TARIFA AS DECIMAL(20,2))) AS MONTO, DATE(TRX_MODIFICACION) AS TRX_MODIFICACION
                FROM MB_LIQUIDACIONES
                INNER JOIN MB_TRXS ON LQD_ID = TRX_LQD_ID
                INNER JOIN MB_TIPOS_HERRAMIENTA ON LQD_HRR_ID = TIPO_HERRAMIENTA_ID
                INNER JOIN MB_TIPOS_PASAJE ON TIPO_PASAJE_ID = TRX_TIPO_PASAJE_ID
                INNER JOIN SA_USUARIOS SU1 ON SU1.USUARIO_ID = LQD_ANFITRION
                INNER JOIN SA_USUARIOS SU2 ON SU2.USUARIO_ID = LQD_CAJERO
                INNER JOIN MB_FUNCIONARIOS F1 ON SU1.USUARIO_FUNCIONARIO_ID = F1.FUNCIONARIO_ID
                INNER JOIN MB_FUNCIONARIOS F2 ON SU2.USUARIO_FUNCIONARIO_ID = F2.FUNCIONARIO_ID
                WHERE TRX_ESTADO = 'ACTIVO' AND TRX_LQD_ID <> 0 AND DATE(TRX_MODIFICACION) BETWEEN " . "'" .$fIni . "'" . " AND " . "'" . $fFin . "'
             GROUP BY LQD_ID,FUNCIONARIO_NOMBRE_COMPLETO,TIPO_HERRAMIENTA_CODIGO,TIPO_PASAJE_DESCRIPCION
             ";
    else
        $sSQL = "SELECT CONCAT( F1.FUNCIONARIO_NOMBRES, ' ', F1.FUNCIONARIO_PATERNO, ' ', F1.FUNCIONARIO_MATERNO ) AS FUNCIONARIO_NOMBRE_COMPLETO,
                CONCAT( F2.FUNCIONARIO_NOMBRES, ' ', F2.FUNCIONARIO_PATERNO, ' ', F2.FUNCIONARIO_MATERNO ) AS CAJERO_NOMBRE_COMPLETO, TIPO_HERRAMIENTA_CODIGO,
                TIPO_PASAJE_DESCRIPCION, COUNT(*) AS PASAJES, SUM(CAST(TRX_TARIFA AS DECIMAL(20,2))) AS MONTO, DATE(TRX_MODIFICACION) AS TRX_MODIFICACION
                FROM MB_LIQUIDACIONES
                INNER JOIN MB_TRXS ON LQD_ID = TRX_LQD_ID
                INNER JOIN MB_TIPOS_HERRAMIENTA ON LQD_HRR_ID = TIPO_HERRAMIENTA_ID
                INNER JOIN MB_TIPOS_PASAJE ON TIPO_PASAJE_ID = TRX_TIPO_PASAJE_ID
                INNER JOIN SA_USUARIOS SU1 ON SU1.USUARIO_ID = LQD_ANFITRION
                INNER JOIN SA_USUARIOS SU2 ON SU2.USUARIO_ID = LQD_CAJERO
                INNER JOIN MB_FUNCIONARIOS F1 ON SU1.USUARIO_FUNCIONARIO_ID = F1.FUNCIONARIO_ID
                INNER JOIN MB_FUNCIONARIOS F2 ON SU2.USUARIO_FUNCIONARIO_ID = F2.FUNCIONARIO_ID
                WHERE TRX_ESTADO = 'ACTIVO' AND TRX_LQD_ID <> 0 AND DATE(TRX_MODIFICACION) BETWEEN " . "'" .$fIni . "'" . " AND " . "'" . $fFin . "' AND FUNCIONARIO_ID = '" . $sAnfitrion . "'
             GROUP BY LQD_ID,FUNCIONARIO_NOMBRE_COMPLETO,TIPO_HERRAMIENTA_CODIGO,TIPO_PASAJE_DESCRIPCION
             ";
	//echo  $sSQL;
    $aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");
    return (array(sizeof($aResult), array_slice($aResult, $i, $r)));
}

function rowsTotal2($r, $i, $fIni, $fFin, $sAnfitrion) {
    if($sAnfitrion=='')
        $sSQL = "SELECT SUM(CAST(TRX_TARIFA AS DECIMAL(20,2))) AS MONTO_TOTAL
                FROM MB_LIQUIDACIONES
                INNER JOIN MB_TRXS ON LQD_ID = TRX_LQD_ID
                WHERE TRX_ESTADO = 'ACTIVO' AND TRX_LQD_ID <> 0 AND DATE(TRX_MODIFICACION) BETWEEN " . "'" .$fIni . "'" . " AND " . "'" . $fFin . "'";
    else
        $sSQL = "SELECT SUM(CAST(TRX_TARIFA AS DECIMAL(20,2))) AS MONTO_TOTAL
                FROM MB_LIQUIDACIONES
                INNER JOIN MB_TRXS ON LQD_ID = TRX_LQD_ID
                WHERE TRX_ESTADO = 'ACTIVO' AND TRX_LQD_ID <> 0 AND DATE(TRX_MODIFICACION) BETWEEN " . "'" .$fIni . "'" . " AND " . "'" . $fFin . "' AND DATE(TRX_MODIFICACION) BETWEEN " . "'" .$fIni . "'" . " AND " . "'" . $fFin . "' AND FUNCIONARIO_ID = '" . $sAnfitrion . "'";
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
					$fFin = $_REQUEST["fechaFinal"];
                    $sAnfitrion = isset($_REQUEST["anfitrion"])? $_REQUEST["anfitrion"] : '';
					$fIni = date("Y-m-d",strtotime($fIni));
					$fFin = date("Y-m-d",strtotime($fFin));
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
                    $fFin = $_REQUEST["fechaFinal"];
                    $sAnfitrion = isset($_REQUEST["anfitrion"])? $_REQUEST["anfitrion"] : '';
                    $fIni = date("Y-m-d",strtotime($fIni));
                    $fFin = date("Y-m-d",strtotime($fFin));
                    list($nLen, $aData) = rowsTotal2($limit, $start, $fIni, $fFin, $sAnfitrion);
                    echo json_encode(array("success" => true, "resultTotal" => $nLen, "resultRoot" => $aData));
                    break;
    }
} catch (Exception $e) {
    echo null;
}

?>