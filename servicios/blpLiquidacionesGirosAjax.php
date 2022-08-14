<?php
require('db.php');
function rowsGet($r, $i, $a, $s) {
  if ($a=="")
    $sSQL = " SELECT GIRO_ID, GIRO_PRG_ID, COUNT( TRX_TIPO_PASAJE_ID ) AS CANTIDAD, SUM( TARIFA_MONTO ) AS TOTAL, CONCAT (FUNCIONARIO_NOMBRES, ' ' , FUNCIONARIO_PATERNO, ' ' , FUNCIONARIO_MATERNO) AS NOMBRE_COMPLETO, FUNCIONARIO_ID
              FROM MB_GIROS
              INNER JOIN MB_FUNCIONARIOS ON GIRO_RECAUDADOR_ID = FUNCIONARIO_ID
              INNER JOIN MB_TRXS ON GIRO_ID = TRX_GIRO_ID
              INNER JOIN MB_TIPOS_PASAJE ON TRX_TIPO_PASAJE_ID = TIPO_PASAJE_ID
              INNER JOIN MB_TARIFAS ON TIPO_PASAJE_ID = TARIFA_TIPO_PASAJE_ID
              WHERE GIRO_ESTADO = '$s' 
              GROUP BY GIRO_ID, GIRO_PRG_ID ORDER BY 1";
  else
        $sSQL = " SELECT GIRO_ID, GIRO_PRG_ID, COUNT( TRX_TIPO_PASAJE_ID ) AS CANTIDAD, SUM( TARIFA_MONTO ) AS TOTAL, CONCAT (FUNCIONARIO_NOMBRES, ' ' , FUNCIONARIO_PATERNO, ' ' , FUNCIONARIO_MATERNO) AS NOMBRE_COMPLETO, FUNCIONARIO_ID
              FROM MB_GIROS
              INNER JOIN MB_FUNCIONARIOS ON GIRO_RECAUDADOR_ID = FUNCIONARIO_ID
              INNER JOIN MB_TRXS ON GIRO_ID = TRX_GIRO_ID
              INNER JOIN MB_TIPOS_PASAJE ON TRX_TIPO_PASAJE_ID = TIPO_PASAJE_ID
              INNER JOIN MB_TARIFAS ON TIPO_PASAJE_ID = TARIFA_TIPO_PASAJE_ID
              WHERE GIRO_ESTADO = '$s' AND FUNCIONARIO_ID = '$a' 
              GROUP BY GIRO_ID, GIRO_PRG_ID ORDER BY 1";

    $aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");
    return (array(sizeof($aResult), array_slice($aResult, $i, $r)));
}
try {
    $option = $_REQUEST["option"];

    switch ($option) {
        case "LST": $pageSize = $_REQUEST["pageSize"];
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
                    $anfitrion = isset($_REQUEST["anfitrion"])? $_REQUEST["anfitrion"] : "";
                    list($nLen, $aData) = rowsGet($limit, $start, $anfitrion,"ACTIVO");
                    echo json_encode(array("success" => true, "resultTotal" => $nLen, "resultRoot" => $aData));
                    break;
    }
} catch (Exception $e) {
    echo null;
}
?>