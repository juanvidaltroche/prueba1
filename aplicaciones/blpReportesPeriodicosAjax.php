<?php
require('db.php');

function rowsGet($r, $i) {
    $sSQL = "SELECT LI.*, FUN.FUNCIONARIO_NOMBRES, (SELECT SUM(LQD_MONTO) FROM mb_liquidaciones) AS MONTO_TOTAL FROM MB_LIQUIDACIONES LI
			 INNER JOIN MB_FUNCIONARIOS FUN ON FUN.FUNCIONARIO_ID = LI.LQD_CAJERO
			";
    $aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");
    return (array(sizeof($aResult), array_slice($aResult, $i, $r)));
}
function rowsGet2($r, $i, $fIni, $fFin) {
    $sSQL = "SELECT LI.*, FUN.FUNCIONARIO_NOMBRES, (SELECT SUM(LQD_MONTO) FROM mb_liquidaciones WHERE LQD_REGISTRO BETWEEN " . "'" .$fIni . "'" . " AND " . "'" . $fFin . "'".
			") AS MONTO_TOTAL FROM MB_LIQUIDACIONES LI
			INNER JOIN MB_FUNCIONARIOS FUN ON FUN.FUNCIONARIO_ID = LI.LQD_CAJERO 
			WHERE LI.LQD_REGISTRO BETWEEN " . "'" .$fIni . "'" . " AND " . "'" . $fFin . "'";
	//echo  $sSQL;
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
					
					$fIni = date("Y-m-d",strtotime($fIni));
					$fFin = date("Y-m-d",strtotime($fFin));
					
                    list($nLen, $aData) = rowsGet2($limit, $start, $fIni, $fFin);
                    echo json_encode(array("success" => true, "resultTotal" => $nLen, "resultRoot" => $aData));
                    break;
    }
} catch (Exception $e) {
    echo null;
}

?>