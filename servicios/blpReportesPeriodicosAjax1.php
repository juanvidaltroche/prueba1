<?php
require('db.php');
$NOMBRE_BDD="COBRO_BUSES_ORIGEN_3";

function listaPorRecaudador($r, $i, $sIdRecaudador) {
    $sSQL = "SELECT DISTINCT LQD_ID, FUNCIONARIO_NOMBRES, LQD_USUARIO,  DATE_FORMAT(LQD_REGISTRO, '%d/%m/%Y') AS 'LQD_REGISTRO',LQD_MONTO,LQD_ESTADO,TIPO_HERRAMIENTA_CODIGO AS 'HRR_DESCRIPCION', (SELECT SUM(LQD_MONTO) FROM mb_liquidaciones) AS MONTO_TOTAL
             FROM MB_LIQUIDACIONES LI
             INNER JOIN MB_FUNCIONARIOS FUN ON FUN.FUNCIONARIO_ID = LI.LQD_ANFITRION
             INNER JOIN MB_TRXS TRAN ON TRAN.TRX_LQD_ID = LI.LQD_ID
             INNER JOIN MB_HERRAMIENTAS HR ON HR.HRR_ID = LI.LQD_HRR_ID
			 INNER JOIN MB_TIPOS_HERRAMIENTA TH ON TH.TIPO_HERRAMIENTA_ID = HR.HRR_TIPO_HERRAMIENTA_ID
             WHERE LI.LQD_ANFITRION = '$sIdRecaudador'";
    $aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");    
    return (array(sizeof($aResult), array_slice($aResult, $i, $r)));
}
function rowsRecaudador($r, $i) {
    $sSQL = "SELECT FUN.FUNCIONARIO_ID, FUN.FUNCIONARIO_NOMBRES FROM MB_FUNCIONARIOS FUN INNER JOIN SA_USUARIOS US
                ON  FUN.FUNCIONARIO_ID = US.USUARIO_FUNCIONARIO_ID 
                INNER JOIN SA_USUARIO_TIPOS_FUNCIONARIO UTIPO ON US.USUARIO_ID = UTIPO.UTF_USUARIO_ID
                INNER JOIN MB_TIPOS_FUNCIONARIO TF ON UTIPO.UTF_TIPO_FUNCIONARIO_ID = TF.TIPO_FUNCIONARIO_ID
                WHERE TF.TIPO_FUNCIONARIO_DESCRIPCION = 'RECAUDADOR/A' AND FUN.FUNCIONARIO_ESTADO = 'ACTIVO'
                AND US.USUARIO_ESTADO = 'A'";					
    $aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");    
    return (array(sizeof($aResult), array_slice($aResult, $i, $r)));
}
function listarRegistros($r, $i) {
    $sSQL = "SELECT DISTINCT LQD_ID, FUNCIONARIO_NOMBRES,TIPO_HERRAMIENTA_CODIGO AS 'HRR_DESCRIPCION', DATE_FORMAT(LQD_REGISTRO, '%d/%m/%Y') AS 'LQD_REGISTRO',LQD_MONTO,LQD_ESTADO, (SELECT SUM(LQD_MONTO) FROM mb_liquidaciones WHERE LQD_ESTADO ='ACTIVO' AND LQD_ID IN (SELECT DISTINCT TRX_LQD_ID FROM MB_TRXS WHERE TRX_ESTADO = 'ACTIVO')) AS MONTO_TOTAL
            FROM MB_LIQUIDACIONES LI
            INNER JOIN MB_FUNCIONARIOS FUN ON FUN.FUNCIONARIO_ID = LI.LQD_ANFITRION            
            INNER JOIN MB_TRXS TRAN ON TRAN.TRX_LQD_ID = LI.LQD_ID
            INNER JOIN MB_HERRAMIENTAS HR ON HR.HRR_ID = LI.LQD_HRR_ID
            INNER JOIN MB_TIPOS_HERRAMIENTA TH ON TH.TIPO_HERRAMIENTA_ID = HR.HRR_TIPO_HERRAMIENTA_ID
            WHERE LI.LQD_CONFIRMADO = 'SI' AND DATE_FORMAT( LI.LQD_REGISTRO, '%Y-%m-%d' ) = CURDATE()";
    $aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");

    return (array(sizeof($aResult), array_slice($aResult, $i, $r)));
}


function listarPorFecha($r, $i, $fIni, $fFin) {
    $sSQL = "SELECT DISTINCT LQD_ID, FUNCIONARIO_NOMBRES,TIPO_HERRAMIENTA_CODIGO AS 'HRR_DESCRIPCION', DATE_FORMAT(LQD_REGISTRO, '%d/%m/%Y') AS 'LQD_REGISTRO',LQD_MONTO,LQD_ESTADO, (SELECT SUM(LQD_MONTO) FROM mb_liquidaciones WHERE LQD_ESTADO ='ACTIVO' AND LQD_ID IN (SELECT DISTINCT TRX_LQD_ID FROM MB_TRXS WHERE TRX_ESTADO = 'ACTIVO')) AS MONTO_TOTAL
            FROM MB_LIQUIDACIONES LI
            INNER JOIN MB_FUNCIONARIOS FUN ON FUN.FUNCIONARIO_ID = LI.LQD_ANFITRION            
            INNER JOIN MB_TRXS TRAN ON TRAN.TRX_LQD_ID = LI.LQD_ID
            INNER JOIN MB_HERRAMIENTAS HR ON HR.HRR_ID = LI.LQD_HRR_ID
			INNER JOIN MB_TIPOS_HERRAMIENTA TH ON TH.TIPO_HERRAMIENTA_ID = HR.HRR_TIPO_HERRAMIENTA_ID
            WHERE LI.LQD_CONFIRMADO = 'SI' AND LI.LQD_REGISTRO BETWEEN " . "'" .$fIni . "'" . " AND " . "'" . $fFin . "'";


    $aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");
    return (array(sizeof($aResult), array_slice($aResult, $i, $r)));
}
try {
    $option = $_REQUEST["option"];

    switch ($option) {
        case "LST_R":                     
                    $pageSize = $_REQUEST["pageSize"];
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;                    
                    list($nLen, $aData) = rowsRecaudador($limit, $start);                    
                    echo json_encode(array("success" => true, "resultTotal" => $nLen, "resultRoot" => $aData));
                    break;
        case "LST_R_1":                     
                    $pageSize = $_REQUEST["pageSize"];
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;  
                    $sIdRecaudador = $_REQUEST["sIdRecaudador"];
                    list($nLen, $aData) = listaPorRecaudador($limit, $start, $sIdRecaudador);
                    echo json_encode(array("success" => true, "resultTotal" => $nLen, "resultRoot" => $aData));
                    break;                    
        case "LST": $pageSize = $_REQUEST["pageSize"];
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
                    list($nLen, $aData) = listarRegistros($limit, $start);
                    echo json_encode(array("success" => true, "resultTotal" => $nLen, "resultRoot" => $aData));
                    break;
		case "LIST_POR_FECHA": 
					$pageSize = $_REQUEST["pageSize"];
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
					$fIni = $_REQUEST["fechaInicio"];
					$fFin = $_REQUEST["fechaFinal"];
					$fIni = date("Y-m-d",strtotime($fIni));
					$fFin = date("Y-m-d",strtotime($fFin));
                    list($nLen, $aData) = listarPorFecha($limit, $start, $fIni, $fFin);
                    echo json_encode(array("success" => true, "resultTotal" => $nLen, "resultRoot" => $aData));
                    break;
    }
} catch (Exception $e) {
    echo null;
}

?>