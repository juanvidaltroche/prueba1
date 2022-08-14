<?php
require('db.php');

function rowsGet($r, $i) {
    $sUsuario = $_SESSION["usr_session"];
	$sfecha = strftime( "%Y-%m-%d-%H-%M-%S", time() );
    $sSQL = "SELECT L.LQD_GIRO_ID AS GIRO, L.LQD_REGISTRO AS FECHA, H.HRR_DESCRIPCION AS DESCRIP_HERRAMIENTA, L.LQD_USUARIO AS USUARIO, SUM( L.LQD_MONTO ) AS SUBTOTAL
				FROM MB_LIQUIDACIONES L
				INNER JOIN MB_HERRAMIENTAS H ON L.LQD_HRR_ID = H.HRR_ID
				WHERE L.LQD_ESTADO = 'ACTIVO'
				AND L.LQD_USUARIO = 'JOSE'
				GROUP BY L.LQD_GIRO_ID
				ORDER BY L.LQD_GIRO_ID";
			 
    $aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");
    return (array(sizeof($aResult), array_slice($aResult, $i, $r)));
}

function rowsGet2( $sUsaurio,$fFechaInicio,$r, $i) {
    $sUsuario = $_SESSION["usr_session"];
	$sfecha = strftime( "%Y-%m-%d-%H-%M-%S", time() );
    $sSQL = " SELECT L.LQD_PRG_ID,L.LQD_GIRO_ID AS GIRO, DATE_FORMAT( L.LQD_REGISTRO, '%d/%m/%y' )  AS FECHA, DATE_FORMAT( L.LQD_REGISTRO, '%d/%m/%y' ) AS FECHA_COBRO1 ,SUBSTRING( l.LQD_MODIFICACION, 1, 10 ) AS FECHA_COBRO, H.HRR_DESCRIPCION AS DESCRIP_HERRAMIENTA, CONCAT( TF.FUNCIONARIO_NOMBRES, TF.FUNCIONARIO_PATERNO, ' ', TF.FUNCIONARIO_MATERNO ) AS USUARIO, SUM( L.LQD_MONTO ) AS SUBTOTAL ,CONCAT( 'PROGRAMACION',' ', L.LQD_PRG_ID ) AS DESC_PROGRAMACION, CONCAT( 'GIRO',' ', L.LQD_GIRO_ID ) AS DESC_GIRO
				FROM MB_LIQUIDACIONES L
				INNER JOIN MB_HERRAMIENTAS H ON L.LQD_HRR_ID = H.HRR_ID
				INNER JOIN MB_PROGRAMACIONES P ON P.PRG_ID=L.LQD_PRG_ID
				INNER JOIN MB_FUNCIONARIOS TF ON TF.FUNCIONARIO_ID = L.LQD_CAJERO
				WHERE L.LQD_ESTADO = 'ACTIVO'
				AND L.LQD_CAJERO =" . "'" . $sUsaurio . "'
				AND L.LQD_MODIFICACION = " . "'" . $fFechaInicio ."'" . " 
				GROUP BY L.LQD_PRG_ID,L.LQD_GIRO_ID
	";
	$aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");
    return (array(sizeof($aResult), array_slice($aResult, $i, $r)));
}

function rowsGetCombo( $r, $i) {
    $sSQL = " SELECT F.FUNCIONARIO_ID AS IDANFITRION, CONCAT( F.FUNCIONARIO_NOMBRES, ' ', F.FUNCIONARIO_PATERNO, ' ', F.FUNCIONARIO_MATERNO ) AS NOMBRES
FROM MB_FUNCIONARIOS F
INNER JOIN SA_USUARIOS U ON F.FUNCIONARIO_ID = U.USUARIO_FUNCIONARIO_ID
INNER JOIN SA_USUARIO_TIPOS_FUNCIONARIO TF ON TF.UTF_USUARIO_ID = U.USUARIO_ID
INNER JOIN MB_TIPOS_FUNCIONARIO MTF ON TF.UTF_TIPO_FUNCIONARIO_ID = MTF.TIPO_FUNCIONARIO_ID
WHERE MTF.TIPO_FUNCIONARIO_ID =4
GROUP BY F.FUNCIONARIO_ID ";
	
	/*
	SELECT TF.FUNCIONARIO_ID AS IDANFITRION, CONCAT( TF.FUNCIONARIO_NOMBRES, ' ', TF.FUNCIONARIO_PATERNO, ' ', TF.FUNCIONARIO_MATERNO ) AS NOMBRES
				FROM MB_FUNCIONARIOS TF
				WHERE TF.FUNCIONARIO_TIPO_FUNCIONARIO_ID =3
				GROUP BY TF.FUNCIONARIO_ID";
		*/	
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
					
		case "LST33": 
		//params: {"option": "LST33", "sFecha": "2013/02/13", "sUsaurio": "JOSE"},
					$sUsaurio = $_REQUEST["sUsaurio"];
					$vFechaInicio = $_REQUEST["vFechaInicio"];
					$fFechaInicio = date("Y-m-d",strtotime($vFechaInicio));
					
					$pageSize = $_REQUEST["pageSize"];
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
                    list($nLen, $aData) = rowsGet2($sUsaurio,$fFechaInicio,$limit, $start);
                    echo json_encode(array("success" => true, "resultTotal" => $nLen, "resultRoot" => $aData));
                    break;
					
		case "LST44": 
					$pageSize = $_REQUEST["pageSize"];
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
                    list($nLen, $aData) = rowsGetCombo($limit, $start);
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