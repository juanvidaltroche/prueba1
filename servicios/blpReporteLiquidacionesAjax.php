<?php
require('db.php');

function rowsGet($r, $i) {
    $sUsuario = $_SESSION["usr_session"];
    $sSQL = "SELECT L.LQD_ND AS NORMAL,
					L.LQD_NN AS NOCTURNO,
					L.LQD_PD AS PREFERENTE,
					CONCAT(F.FUNCIONARIO_NOMBRES,' ',F.FUNCIONARIO_PATERNO,' ',F.FUNCIONARIO_MATERNO) AS CAJERO, 
					L.LQD_USUARIO AS USUARIO,  
					DATE_FORMAT(L.LQD_REGISTRO, '%d/%m/%Y') AS FECHA_REGISTRO, 
					DATE_FORMAT(L.LQD_REGISTRO, '%d/%m/%Y') AS FECHA_REGISTRO_DIA, 
					L.LQD_MONTO AS MONTO, 
					H.HRR_DESCRIPCION AS HERRAMIENTA,
				(SELECT ROUND(SUM( L.LQD_MONTO),2)
				FROM MB_LIQ_MANUALES L
				WHERE L.LQD_CONFIRMADO =  'SI' AND L.LQD_ESTADO = 'ACTIVO' AND DATE_FORMAT( LQD_REGISTRO, '%Y-%m-%d' ) = CURDATE() AND LQD_USUARIO = '$sUsuario' ) AS TOTAL
			 FROM MB_LIQ_MANUALES L
			 INNER JOIN MB_HERRAMIENTAS H ON H.HRR_ID = L.LQD_HRR_ID
			 INNER JOIN MB_FUNCIONARIOS F ON F.FUNCIONARIO_ID = L.LQD_CAJERO
			 WHERE L.LQD_CONFIRMADO = 'SI' AND DATE_FORMAT( LQD_REGISTRO, '%Y-%m-%d' ) = CURDATE() 
			 AND L.LQD_ESTADO = 'ACTIVO' AND LQD_USUARIO = '$sUsuario'  
			 ";
			 
			 
    $aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");
    return (array(sizeof($aResult), array_slice($aResult, $i, $r)));
}


function rowsGet1($r, $i) {
    $sSQL = "SELECT  SUM(TAR.TARIFA_MONTO) AS TOTAL
							 FROM MB_TRXS_TMP T
							 INNER JOIN mb_tipos_pasaje TP ON T.TRX_TIPO_PASAJE_ID = TP.TIPO_PASAJE_ID
							 INNER JOIN mb_tarifas TAR ON TP.TIPO_PASAJE_ID = TAR.TARIFA_TIPO_PASAJE_ID
							 WHERE T.TRX_ESTADO = 'ACTIVO'			 
			 ";
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
        case "NEW": $sProfileLabel = $_REQUEST["COUNTRY_LABEL"];
                    $sProfileStatus = $_REQUEST["COUNTRY_STATUS"];
                    $sSQL = "INSERT INTO PMT_LF2_PROFILES (PROFILE_LABEL, PROFILE_STATUS,) 
                             VALUES ('$sProfileLabel', '$sProfileStatus') ";
                    $sRes = executeInsert($sSQL);//2013-6-10
                    if ($sRes)
                      echo json_encode(array("success" => true));
                    else
                      echo json_encode(array("success" => false));
                    break;
        case "DEL": $sI = $_REQUEST["i"];
					//$sSQL = "DELETE FROM mb_trxs WHERE TRX_ID = '$sI'";
                    $sSQL = "UPDATE MB_TRXS SET TRX_ESTADO = 'INACTIVO' WHERE TRX_ID = '$sI'";
                    $sRes = executeInsert($sSQL, "COBRO_BUSES_ORIGEN");
                    if ($sRes)
                      echo json_encode(array("success" => true));
                    else
                      echo json_encode(array("success" => false));
                    break;
		case "TOTAL1":  $pageSize = $_REQUEST["pageSize"];
						$limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
						$start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
						list($nLen, $aData) = rowsGet($limit, $start);
						echo json_encode(array("success" => true, "resultTotal" => $nLen, "resultRoot" => $aData));
						break;
    }
} catch (Exception $e) {
    echo null;
}

?>