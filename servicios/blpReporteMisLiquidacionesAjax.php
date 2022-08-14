<?php
require('db.php');
function rowsGetSI($r, $i, $f) {
    $idUsuario = $_SESSION["idUsuario"];
    $sSQL = " SELECT LQD_ID, LQD_ANFITRION, LQD_CAJERO, LQD_HRR_ID, LQD_PRG_ID, LQD_GIRO_ID, LQD_MONTO, LQD_CONFIRMADO, LQD_FLUJO, LQD_TIPO, LQD_MONTOSF, LQD_REGISTRO, DATE( LQD_MODIFICACION ) AS LQD_MODIFICACION, LQD_USUARIO, LQD_ESTADO,
                TIPO_HERRAMIENTA_CODIGO AS HRR_DESCRIPCION, CONCAT (F.FUNCIONARIO_PATERNO,' ',F.FUNCIONARIO_MATERNO,' ',F.FUNCIONARIO_NOMBRES) AS FUNCIONARIO_NOMBRE_COMPLETO,
                CONCAT (F1.FUNCIONARIO_PATERNO,' ',F1.FUNCIONARIO_MATERNO,' ', F1.FUNCIONARIO_NOMBRES) AS CAJERO_NOMBRE_COMPLETO,
                (CAST(LQD_MONTO AS DECIMAL(20,2)) + CAST(LQD_MONTOSF AS DECIMAL(20,2))) AS MONTO_COBRADO
                FROM MB_LIQUIDACIONES L
                INNER JOIN MB_TIPOS_HERRAMIENTA TH ON LQD_HRR_ID = TIPO_HERRAMIENTA_ID
                INNER JOIN MB_FUNCIONARIOS F ON LQD_ANFITRION = F.FUNCIONARIO_ID
                INNER JOIN MB_FUNCIONARIOS F1 ON LQD_CAJERO = F1.FUNCIONARIO_ID
                WHERE LQD_CONFIRMADO = 'SI' AND LQD_ESTADO = 'ACTIVO' AND LQD_CAJERO = $idUsuario
                AND DATE(LQD_MODIFICACION) = '" . $f ."'
                ORDER BY LQD_ID DESC";
    $aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");
    return (array(sizeof($aResult), array_slice($aResult, $i, $r)));
}
try {
    $option = $_REQUEST["option"];
    switch ($option) {
        case "LSTSI": $pageSize = $_REQUEST["pageSize"];
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
                    $anfitrion = isset($_REQUEST["anfitrion"])? $_REQUEST["anfitrion"] : "";
                    $sFecha = isset($_REQUEST["fechaBuscar"])? $_REQUEST["fechaBuscar"] : date("Y-m-d");
                    list($nLen, $aData) = rowsGetSI($limit, $start,$sFecha);
                    echo json_encode(array("success" => true, "resultTotal" => $nLen, "resultRoot" => $aData));
                    break;
    }
} catch (Exception $e) {
    echo null;
}

?>