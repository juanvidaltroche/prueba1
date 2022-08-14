<?php
require('db.php');

function listaPorRecaudador($r, $i, $sIdRecaudador) {
    $sSQL = "SELECT LQD_ID, CONCAT(M1.FUNCIONARIO_PATERNO, ' ', M1.FUNCIONARIO_MATERNO, ' ', M1.FUNCIONARIO_NOMBRES ) AS ANFITRION_NOMBRE_COMPLETO,
            CONCAT(M2.FUNCIONARIO_PATERNO, ' ', M2.FUNCIONARIO_MATERNO, ' ', M2.FUNCIONARIO_NOMBRES ) AS CAJERO_NOMBRE_COMPLETO, RUTA_DESCRIPCION,
            CAST(LQD_ND AS DECIMAL(20,0))+CAST(LQD_NN AS DECIMAL(20,2))+CAST(LQD_PD AS DECIMAL(20,2))+CAST(LQD_PN AS DECIMAL(20,2)) AS PASAJES,
            CAST(LQD_MONTO AS DECIMAL(20,2)) AS LQD_MONTO, CAST(LQD_MONTOSF AS DECIMAL(20,2)) AS LQD_MONTOSF,
            CAST(LQD_MONTO AS DECIMAL(20,2))+CAST(LQD_MONTOSF AS DECIMAL(20,2)) AS MONTO, LQD_TURNO,
            DATE_FORMAT(LQD_REGISTRO, '%d/%m/%Y') AS 'LQD_REGISTRO', TIPO_HERRAMIENTA_CODIGO AS 'HRR_DESCRIPCION', (SELECT SUM(LQD_MONTO) FROM mb_liquidaciones) AS MONTO_TOTAL
            FROM MB_LIQ_MANUALES
            INNER JOIN MB_TIPOS_HERRAMIENTA ON LQD_TIPO_HERRAMIENTA_ID = TIPO_HERRAMIENTA_ID
            INNER JOIN SA_USUARIOS U1 ON LQD_ANFITRION= U1.USUARIO_ID
            INNER JOIN SA_USUARIOS U2 ON LQD_CAJERO= U2.USUARIO_ID
            INNER JOIN MB_FUNCIONARIOS M1 ON M1.FUNCIONARIO_ID = U1.USUARIO_FUNCIONARIO_ID  
            LEFT JOIN MB_FUNCIONARIOS M2 ON M2.FUNCIONARIO_ID = U2.USUARIO_FUNCIONARIO_ID 
            
            INNER JOIN MB_RUTAS ON RUTA_ID = LQD_RUTA_ID
            WHERE LQD_ANFITRION = '$sIdRecaudador'";
    $aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");    
    return (array(sizeof($aResult), array_slice($aResult, $i, $r)));
}
function rowsRecaudador($r, $i) {
    $sSQL = "SELECT FUN.FUNCIONARIO_ID, CONCAT(FUN.FUNCIONARIO_PATERNO,' ',FUN.FUNCIONARIO_MATERNO,' ',FUN.FUNCIONARIO_NOMBRES) AS FUNCIONARIO_NOMBRES FROM MB_FUNCIONARIOS FUN INNER JOIN SA_USUARIOS US
                ON  FUN.FUNCIONARIO_ID = US.USUARIO_FUNCIONARIO_ID 
                INNER JOIN SA_USUARIO_TIPOS_FUNCIONARIO UTIPO ON US.USUARIO_ID = UTIPO.UTF_USUARIO_ID
                INNER JOIN MB_TIPOS_FUNCIONARIO TF ON UTIPO.UTF_TIPO_FUNCIONARIO_ID = TF.TIPO_FUNCIONARIO_ID
                WHERE TF.TIPO_FUNCIONARIO_DESCRIPCION = 'RECAUDADOR/A' AND FUN.FUNCIONARIO_ESTADO = 'ACTIVO'
                AND US.USUARIO_ESTADO = 'A'";					
    $aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");    
    return (array(sizeof($aResult), array_slice($aResult, $i, $r)));
}
function listarRegistros($r, $i) {
    $sSQL = "SELECT LQD_ID, CONCAT(M1.FUNCIONARIO_PATERNO, ' ', M1.FUNCIONARIO_MATERNO, ' ', M1.FUNCIONARIO_NOMBRES ) AS ANFITRION_NOMBRE_COMPLETO,
            CONCAT(M2.FUNCIONARIO_PATERNO, ' ', M2.FUNCIONARIO_MATERNO, ' ', M2.FUNCIONARIO_NOMBRES ) AS CAJERO_NOMBRE_COMPLETO, RUTA_DESCRIPCION,
            CAST(LQD_ND AS DECIMAL(20,0))+CAST(LQD_NN AS DECIMAL(20,2))+CAST(LQD_PD AS DECIMAL(20,2))+CAST(LQD_PN AS DECIMAL(20,2)) AS PASAJES,
            CAST(LQD_MONTO AS DECIMAL(20,2)) AS LQD_MONTO, CAST(LQD_MONTOSF AS DECIMAL(20,2)) AS LQD_MONTOSF,
            CAST(LQD_MONTO AS DECIMAL(20,2))+CAST(LQD_MONTOSF AS DECIMAL(20,2)) AS MONTO, LQD_TURNO,
            DATE_FORMAT(LQD_REGISTRO, '%d/%m/%Y') AS 'LQD_REGISTRO', TIPO_HERRAMIENTA_CODIGO AS 'HRR_DESCRIPCION'
            FROM MB_LIQ_MANUALES
            INNER JOIN MB_TIPOS_HERRAMIENTA ON LQD_TIPO_HERRAMIENTA_ID = TIPO_HERRAMIENTA_ID
            INNER JOIN SA_USUARIOS U1 ON LQD_ANFITRION= U1.USUARIO_ID
            INNER JOIN SA_USUARIOS U2 ON LQD_CAJERO= U2.USUARIO_ID
            INNER JOIN MB_FUNCIONARIOS M1 ON M1.FUNCIONARIO_ID = U1.USUARIO_FUNCIONARIO_ID  
            LEFT JOIN MB_FUNCIONARIOS M2 ON M2.FUNCIONARIO_ID = U2.USUARIO_FUNCIONARIO_ID 
            INNER JOIN MB_RUTAS ON RUTA_ID = LQD_RUTA_ID
            WHERE LQD_CONFIRMADO = 'SI' AND DATE_FORMAT( LQD_REGISTRO, '%Y-%m-%d' ) = CURDATE()";
    $aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");

    return (array(sizeof($aResult), array_slice($aResult, $i, $r)));
}


function listarPorFecha($r, $i, $fIni, $fFin) {
    $sSQL = "SELECT LQD_ID, CONCAT(M1.FUNCIONARIO_PATERNO, ' ', M1.FUNCIONARIO_MATERNO, ' ', M1.FUNCIONARIO_NOMBRES ) AS ANFITRION_NOMBRE_COMPLETO,
            CONCAT(M2.FUNCIONARIO_PATERNO, ' ', M2.FUNCIONARIO_MATERNO, ' ', M2.FUNCIONARIO_NOMBRES ) AS CAJERO_NOMBRE_COMPLETO, RUTA_DESCRIPCION,
            (LQD_ND + LQD_NN + LQD_PD + LQD_PN) AS PASAJES,
            CAST(LQD_MONTO AS DECIMAL(20,2)) AS LQD_MONTO, CAST(LQD_MONTOSF AS DECIMAL(20,2)) AS LQD_MONTOSF,
            CAST(LQD_MONTO AS DECIMAL(20,2))+CAST(LQD_MONTOSF AS DECIMAL(20,2)) AS MONTO, LQD_TURNO,
            DATE_FORMAT(LQD_REGISTRO, '%d/%m/%Y') AS 'LQD_REGISTRO', TIPO_HERRAMIENTA_CODIGO AS 'HRR_DESCRIPCION'
            FROM MB_LIQ_MANUALES
            INNER JOIN MB_TIPOS_HERRAMIENTA ON LQD_TIPO_HERRAMIENTA_ID = TIPO_HERRAMIENTA_ID
            INNER JOIN SA_USUARIOS U1 ON LQD_ANFITRION= U1.USUARIO_ID
            INNER JOIN SA_USUARIOS U2 ON LQD_CAJERO= U2.USUARIO_ID
            INNER JOIN MB_FUNCIONARIOS M1 ON M1.FUNCIONARIO_ID = U1.USUARIO_FUNCIONARIO_ID  
            LEFT JOIN MB_FUNCIONARIOS M2 ON M2.FUNCIONARIO_ID = U2.USUARIO_FUNCIONARIO_ID 
            INNER JOIN MB_RUTAS ON RUTA_ID = LQD_RUTA_ID
            WHERE LQD_CONFIRMADO = 'SI' AND DATE(LQD_REGISTRO) >='" .$fIni . "' AND DATE(LQD_REGISTRO) <= '" . $fFin . "'";
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