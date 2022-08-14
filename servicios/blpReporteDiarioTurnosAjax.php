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
    $sSQL = "SELECT LQD_ID, CONCAT(M1.FUNCIONARIO_PATERNO, ' ', M1.FUNCIONARIO_MATERNO, ' ', M1.FUNCIONARIO_NOMBRES ) AS ANFITRION_NOMBRE_COMPLETO,
                CONCAT(M2.FUNCIONARIO_PATERNO, ' ', M2.FUNCIONARIO_MATERNO, ' ', M2.FUNCIONARIO_NOMBRES ) AS CAJERO_NOMBRE_COMPLETO, RUTA_DESCRIPCION,
                (LQD_ND + LQD_NN + LQD_PD + LQD_PN) AS PASAJES,
                CAST(LQD_MONTO AS DECIMAL(20,2)) AS MONTO, CAST(LQD_MONTOSF AS DECIMAL(20,2)) AS SOBRANTE_FALTANTE,
                CAST(LQD_MONTO AS DECIMAL(20,2))+CAST(LQD_MONTOSF AS DECIMAL(20,2)) AS MONTO_COBRADO, LQD_TURNO,
                DATE(LQD_REGISTRO) AS FECHA, TIPO_HERRAMIENTA_CODIGO AS 'HRR_DESCRIPCION'
                FROM MB_LIQ_MANUALES
                INNER JOIN MB_TIPOS_HERRAMIENTA ON LQD_TIPO_HERRAMIENTA_ID = TIPO_HERRAMIENTA_ID
                INNER JOIN MB_FUNCIONARIOS M1 ON M1.FUNCIONARIO_ID = LQD_ANFITRION
                INNER JOIN MB_FUNCIONARIOS M2 ON M2.FUNCIONARIO_ID = LQD_CAJERO
                INNER JOIN MB_RUTAS ON RUTA_ID = LQD_RUTA_ID
                WHERE LQD_ESTADO = 'ACTIVO' AND DATE(LQD_REGISTRO) = '$fFecha'";
    $aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");
    return (array(sizeof($aResult), array_slice($aResult, $i, $r)));
}
function rowsGet2($r, $i, $fIni, $fFin, $sAnfitrion, $turno) {
    if ($sAnfitrion=='')
        if ($turno=='')
            $sSQL = "SELECT LQD_ID, CONCAT(M1.FUNCIONARIO_PATERNO, ' ', M1.FUNCIONARIO_MATERNO, ' ', M1.FUNCIONARIO_NOMBRES ) AS ANFITRION_NOMBRE_COMPLETO,
                    CONCAT(M2.FUNCIONARIO_PATERNO, ' ', M2.FUNCIONARIO_MATERNO, ' ', M2.FUNCIONARIO_NOMBRES ) AS CAJERO_NOMBRE_COMPLETO, RUTA_DESCRIPCION,
                    (LQD_ND + LQD_NN + LQD_PD + LQD_PN) AS PASAJES,
                    CAST(LQD_MONTO AS DECIMAL(20,2)) AS MONTO, CAST(LQD_MONTOSF AS DECIMAL(20,2)) AS SOBRANTE_FALTANTE,
                    CAST(LQD_MONTO AS DECIMAL(20,2))+CAST(LQD_MONTOSF AS DECIMAL(20,2)) AS MONTO_COBRADO, LQD_TURNO,
                    LQD_REGISTRO AS FECHA, TIPO_HERRAMIENTA_CODIGO AS 'HRR_DESCRIPCION'
                    FROM MB_LIQ_MANUALES
                    INNER JOIN MB_TIPOS_HERRAMIENTA ON LQD_TIPO_HERRAMIENTA_ID = TIPO_HERRAMIENTA_ID
                    INNER JOIN MB_FUNCIONARIOS M1 ON M1.FUNCIONARIO_ID = LQD_ANFITRION
                    INNER JOIN MB_FUNCIONARIOS M2 ON M2.FUNCIONARIO_ID = LQD_CAJERO
                    INNER JOIN MB_RUTAS ON RUTA_ID = LQD_RUTA_ID
                WHERE LQD_ESTADO = 'ACTIVO' AND LQD_REGISTRO BETWEEN '$fIni' AND '$fFin' ORDER BY LQD_ID";
            else
                $sSQL = "SELECT LQD_ID, CONCAT(M1.FUNCIONARIO_PATERNO, ' ', M1.FUNCIONARIO_MATERNO, ' ', M1.FUNCIONARIO_NOMBRES ) AS ANFITRION_NOMBRE_COMPLETO,
                    CONCAT(M2.FUNCIONARIO_PATERNO, ' ', M2.FUNCIONARIO_MATERNO, ' ', M2.FUNCIONARIO_NOMBRES ) AS CAJERO_NOMBRE_COMPLETO, RUTA_DESCRIPCION,
                    (LQD_ND + LQD_NN + LQD_PD + LQD_PN) AS PASAJES,
                    CAST(LQD_MONTO AS DECIMAL(20,2)) AS MONTO, CAST(LQD_MONTOSF AS DECIMAL(20,2)) AS SOBRANTE_FALTANTE,
                    CAST(LQD_MONTO AS DECIMAL(20,2))+CAST(LQD_MONTOSF AS DECIMAL(20,2)) AS MONTO_COBRADO, LQD_TURNO,
                    LQD_REGISTRO AS FECHA, TIPO_HERRAMIENTA_CODIGO AS 'HRR_DESCRIPCION'
                    FROM MB_LIQ_MANUALES
                    INNER JOIN MB_TIPOS_HERRAMIENTA ON LQD_TIPO_HERRAMIENTA_ID = TIPO_HERRAMIENTA_ID
                    INNER JOIN MB_FUNCIONARIOS M1 ON M1.FUNCIONARIO_ID = LQD_ANFITRION
                    INNER JOIN MB_FUNCIONARIOS M2 ON M2.FUNCIONARIO_ID = LQD_CAJERO
                    INNER JOIN MB_RUTAS ON RUTA_ID = LQD_RUTA_ID
                WHERE LQD_ESTADO = 'ACTIVO' AND LQD_REGISTRO BETWEEN '$fIni' AND '$fFin' AND LQD_TURNO =  '$turno' ORDER BY LQD_ID";
    else
        if ($turno == '')
            $sSQL = "SELECT LQD_ID, CONCAT(M1.FUNCIONARIO_PATERNO, ' ', M1.FUNCIONARIO_MATERNO, ' ', M1.FUNCIONARIO_NOMBRES ) AS ANFITRION_NOMBRE_COMPLETO,
                CONCAT(M2.FUNCIONARIO_PATERNO, ' ', M2.FUNCIONARIO_MATERNO, ' ', M2.FUNCIONARIO_NOMBRES ) AS CAJERO_NOMBRE_COMPLETO, RUTA_DESCRIPCION,
                (LQD_ND + LQD_NN + LQD_PD + LQD_PN) AS PASAJES,
                CAST(LQD_MONTO AS DECIMAL(20,2)) AS MONTO, CAST(LQD_MONTOSF AS DECIMAL(20,2)) AS SOBRANTE_FALTANTE,
                CAST(LQD_MONTO AS DECIMAL(20,2))+CAST(LQD_MONTOSF AS DECIMAL(20,2)) AS MONTO_COBRADO, LQD_TURNO,
                LQD_REGISTRO AS FECHA, TIPO_HERRAMIENTA_CODIGO AS 'HRR_DESCRIPCION'
                FROM MB_LIQ_MANUALES
                INNER JOIN MB_TIPOS_HERRAMIENTA ON LQD_TIPO_HERRAMIENTA_ID = TIPO_HERRAMIENTA_ID
                INNER JOIN MB_FUNCIONARIOS M1 ON M1.FUNCIONARIO_ID = LQD_ANFITRION
                INNER JOIN MB_FUNCIONARIOS M2 ON M2.FUNCIONARIO_ID = LQD_CAJERO
                INNER JOIN MB_RUTAS ON RUTA_ID = LQD_RUTA_ID
            WHERE LQD_ESTADO = 'ACTIVO' AND LQD_REGISTRO BETWEEN '$fIni' AND '$fFin' AND M2.FUNCIONARIO_ID = '$sAnfitrion' ORDER BY LQD_ID";
        else
            $sSQL = "SELECT LQD_ID, CONCAT(M1.FUNCIONARIO_PATERNO, ' ', M1.FUNCIONARIO_MATERNO, ' ', M1.FUNCIONARIO_NOMBRES ) AS ANFITRION_NOMBRE_COMPLETO,
                    CONCAT(M2.FUNCIONARIO_PATERNO, ' ', M2.FUNCIONARIO_MATERNO, ' ', M2.FUNCIONARIO_NOMBRES ) AS CAJERO_NOMBRE_COMPLETO, RUTA_DESCRIPCION,
                    (LQD_ND + LQD_NN + LQD_PD + LQD_PN) AS PASAJES,
                    CAST(LQD_MONTO AS DECIMAL(20,2)) AS MONTO, CAST(LQD_MONTOSF AS DECIMAL(20,2)) AS SOBRANTE_FALTANTE,
                    CAST(LQD_MONTO AS DECIMAL(20,2))+CAST(LQD_MONTOSF AS DECIMAL(20,2)) AS MONTO_COBRADO, LQD_TURNO,
                    LQD_REGISTRO AS FECHA, TIPO_HERRAMIENTA_CODIGO AS 'HRR_DESCRIPCION'
                    FROM MB_LIQ_MANUALES
                    INNER JOIN MB_TIPOS_HERRAMIENTA ON LQD_TIPO_HERRAMIENTA_ID = TIPO_HERRAMIENTA_ID
                    INNER JOIN MB_FUNCIONARIOS M1 ON M1.FUNCIONARIO_ID = LQD_ANFITRION
                    INNER JOIN MB_FUNCIONARIOS M2 ON M2.FUNCIONARIO_ID = LQD_CAJERO
                    INNER JOIN MB_RUTAS ON RUTA_ID = LQD_RUTA_ID
                WHERE LQD_ESTADO = 'ACTIVO' AND LQD_REGISTRO BETWEEN '$fIni' AND '$fFin' AND M2.FUNCIONARIO_ID = '$sAnfitrion' AND LQD_TURNO =  '$turno' ORDER BY LQD_ID";
    $aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");
    return (array(sizeof($aResult), array_slice($aResult, $i, $r)));
}
function rowsTotal($r, $i) {
    $fFecha = date("Y-m-d");
    $sSQL = "SELECT SUM(CAST(LQD_MONTO AS DECIMAL(20,2))) AS MONTO, SUM(CAST(LQD_MONTOSF AS DECIMAL(20,2))) AS SOBRANTE_FALTANTE,
                (SUM(CAST(LQD_MONTO AS DECIMAL(20,2))) + SUM(CAST(LQD_MONTOSF AS DECIMAL(20,2)))) AS MONTO_COBRADO
                FROM MB_LIQ_MANUALES
                WHERE LQD_ESTADO = 'ACTIVO' AND DATE(LQD_REGISTRO) = '$fFecha'";
    $aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");
    return (array(sizeof($aResult), array_slice($aResult, $i, $r)));
}
function rowsTotal2($r, $i, $fIni, $fFin, $sAnfitrion, $turno) {
    if ($sAnfitrion=='')
        $sSQL = "SELECT SUM(CAST(LQD_MONTO AS DECIMAL(20,2))) AS MONTO, SUM(CAST(LQD_MONTOSF AS DECIMAL(20,2))) AS SOBRANTE_FALTANTE,
                (SUM(CAST(LQD_MONTO AS DECIMAL(20,2))) + SUM(CAST(LQD_MONTOSF AS DECIMAL(20,2)))) AS MONTO_COBRADO
                FROM MB_LIQ_MANUALES
                INNER JOIN MB_FUNCIONARIOS ON FUNCIONARIO_ID = LQD_CAJERO
                WHERE LQD_ESTADO = 'ACTIVO' = 'ACTIVO' AND LQD_REGISTRO BETWEEN '$fIni' AND '$fFin' AND LQD_TURNO =  '$turno' ";
    else
        $sSQL = "SELECT SUM(CAST(LQD_MONTO AS DECIMAL(20,2))) AS MONTO, SUM(CAST(LQD_MONTOSF AS DECIMAL(20,2))) AS SOBRANTE_FALTANTE,
                (SUM(CAST(LQD_MONTO AS DECIMAL(20,2))) + SUM(CAST(LQD_MONTOSF AS DECIMAL(20,2)))) AS MONTO_COBRADO
                FROM MB_LIQ_MANUALES
                INNER JOIN MB_FUNCIONARIOS ON FUNCIONARIO_ID = LQD_CAJERO
                WHERE LQD_ESTADO = 'ACTIVO' AND LQD_REGISTRO BETWEEN '$fIni' AND '$fFin' AND FUNCIONARIO_ID = '$sAnfitrion' AND LQD_TURNO =  '$turno'";
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
					
					$fIni = isset($_REQUEST["fechaInicio"])? $_REQUEST["fechaInicio"] : '';
                    if ($fIni=='')
                        $fIni = date("Y-m-d");
					$fFin = isset($_REQUEST["fechaFinal"])? $_REQUEST["fechaFinal"] : '';
                    if ($fFin=='')
                        $fFin = date("Y-m-d");

                    $fInicio = explode("T", $fIni);
                    $fFinal = explode("T", $fFin);

                    $hIni = isset($_REQUEST["horaInicio"])? $_REQUEST["horaInicio"].":00" : ':00';
                    if ($hIni==':00')
                        $hIni = '00:00:00';
                    $hFin = isset($_REQUEST["horaFinal"])? $_REQUEST["horaFinal"].":00" : ':00';
                    if ($hFin==':00')
                        $hFin = '23:59:59';
                    $sFechaBusquedaI = $fInicio[0] . " " . $hIni;
                    $sFechaBusquedaF = $fFinal[0] . " " . $hFin;
                    $sAnfitrion = isset($_REQUEST["anfitrion"])? $_REQUEST["anfitrion"] : 0;
                    $turno = isset($_REQUEST["turno"])? $_REQUEST["turno"] : '';
                    if ($turno=="TODOS")
                        $turno = '';
                    list($nLen, $aData) = rowsGet2($limit, $start, $sFechaBusquedaI, $sFechaBusquedaF, $sAnfitrion,$turno);
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
                    
                    $fIni = isset($_REQUEST["fechaInicio"])? $_REQUEST["fechaInicio"] : '';
                    if ($fIni=='')
                        $fIni = date("Y-m-d");
                    $fFin = isset($_REQUEST["fechaFinal"])? $_REQUEST["fechaFinal"] : '';
                    if ($fFin=='')
                        $fFin = date("Y-m-d");

                    $fInicio = explode("T", $fIni);
                    $fFinal = explode("T", $fFin);

                    $hIni = isset($_REQUEST["horaInicio"])? $_REQUEST["horaInicio"].":00" : ':00';
                    if ($hIni==':00')
                        $hIni = '00:00:00';
                    $hFin = isset($_REQUEST["horaFinal"])? $_REQUEST["horaFinal"].":00" : ':00';
                    if ($hFin==':00')
                        $hFin = '23:59:59';
                    $sFechaBusquedaI = $fInicio[0] . " " . $hIni;
                    $sFechaBusquedaF = $fFinal[0] . " " . $hFin;
                    $sAnfitrion = isset($_REQUEST["anfitrion"])? $_REQUEST["anfitrion"] : 0;
                    $turno = isset($_REQUEST["turno"])? $_REQUEST["turno"] : '';
                    if ($turno=="TODOS")
                        $turno = '';
                    list($nLen, $aData) = rowsTotal2($limit, $start, $sFechaBusquedaI, $sFechaBusquedaF, $sAnfitrion, $turno);
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