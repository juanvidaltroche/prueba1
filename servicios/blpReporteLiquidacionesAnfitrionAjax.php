<?php
require('db.php');

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
function rowsGet($r, $i) {
//dav corregir
    $sUsuario = $_SESSION["usr_session"];
    $sSQL = "SELECT DISTINCT LQD_ID, FUNCIONARIO_NOMBRES, LQD_USUARIO,  DATE_FORMAT(LQD_REGISTRO, '%d/%m/%Y') AS 'LQD_REGISTRO',LQD_MONTO,LQD_ESTADO,TIPO_HERRAMIENTA_CODIGO AS 'HRR_DESCRIPCION', (SELECT SUM(LQD_MONTO) FROM mb_liquidaciones) AS MONTO_TOTAL
             FROM MB_LIQUIDACIONES LI
             INNER JOIN MB_FUNCIONARIOS FUN ON FUN.FUNCIONARIO_ID = LI.LQD_ANFITRION
             INNER JOIN MB_TRXS TRAN ON TRAN.TRX_LQD_ID = LI.LQD_ID
             INNER JOIN MB_HERRAMIENTAS HR ON HR.HRR_ID = LI.LQD_HRR_ID
			 INNER JOIN MB_TIPOS_HERRAMIENTA TH ON TH.TIPO_HERRAMIENTA_ID = HR.HRR_TIPO_HERRAMIENTA_ID
			 WHERE LI.LQD_ESTADO='ACTIVO' AND HR.HRR_ESTADO='PRIMERO'";		

//2014-3-9


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
function rowsGetCombo( $r, $i) {
	//2014-3-9
    $sSQL = "SELECT CONCAT( F.FUNCIONARIO_PATERNO,  ' ',F.FUNCIONARIO_MATERNO ,  ' ', F.FUNCIONARIO_NOMBRES ) AS NOMBRES
			, F.FUNCIONARIO_ID AS IDANFITRION, 
							(SELECT  `TIPO_FUNCIONARIO_DESCRIPCION` FROM `mb_tipos_funcionario` WHERE `TIPO_FUNCIONARIO_ID` = 5 )
							AS TIPO_FUNCIONARIO_DESCRIPCION 
				FROM mb_funcionarios F
				WHERE F.FUNCIONARIO_ID IN (SELECT DISTINCT(LQD_ANFITRION)
							FROM `mb_liq_manuales` WHERE LQD_ESTADO = 'ACTIVO'
							)
				ORDER BY NOMBRES 
				";
    $aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");
    return (array(sizeof($aResult), array_slice($aResult, $i, $r)));
}
function rowsGet2($r, $i,$fechaRegistroLiq, $IdAnfitrion) {
    $sUsuario = $_SESSION["usr_session"];
    
		//2014-3-9 inicio	 
	$sFechaRecortada = substr($fechaRegistroLiq, 0, 10);
	$sSQL = "SELECT L.LQD_ID,'1' AS ID_GIRO,DATE_FORMAT(L.LQD_REGISTRO, '%d/%m/%Y') AS 'LQD_REGISTRO',
					H.TIPO_HERRAMIENTA_CODIGO AS HRR_DESCRIPCION,CONCAT(F.FUNCIONARIO_NOMBRES,' ',F.FUNCIONARIO_PATERNO,' ',F.FUNCIONARIO_MATERNO) 
					AS FUNCIONARIO_NOMBRES, L.LQD_MONTO ,(SELECT  `TIPO_FUNCIONARIO_DESCRIPCION` FROM `mb_tipos_funcionario` WHERE `TIPO_FUNCIONARIO_ID` = 5 ) AS TIPO_FUNCIONARIO_DESCRIPCION,
					L.LQD_RUTA_ID, RUTA_DESCRIPCION
				FROM `mb_liq_manuales` L 
					INNER JOIN mb_tipos_herramienta AS H ON  H.TIPO_HERRAMIENTA_ID = L.LQD_TIPO_HERRAMIENTA_ID 
					INNER JOIN mb_funcionarios AS F ON F.FUNCIONARIO_ID = L.LQD_ANFITRION 
					INNER JOIN mb_rutas ON RUTA_ID = L.LQD_RUTA_ID
				WHERE LQD_ANFITRION = '$IdAnfitrion' AND LQD_REGISTRO LIKE '%$sFechaRecortada%';";
				// echo $sSQL; die;
    $aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");
	//2014-3-9 fin	
    return (array(sizeof($aResult), array_slice($aResult, $i, $r)));
}

function rowsGet22($r, $i,$fechaRegistroLiq, $IdAnfitrion) {
    $sUsuario = $_SESSION["usr_session"];
    /*$sSQL = "SELECT ROUND( SUM( L.LQD_MONTO ) , 2 )  AS MONTO
			FROM mb_liquidaciones AS  L
			INNER JOIN mb_programaciones AS P ON P.PRG_ID=L.LQD_PRG_ID
			INNER JOIN mb_herramientas AS H ON  H.HRR_ID=L.LQD_HRR_ID
			INNER JOIN mb_funcionarios AS F ON F.FUNCIONARIO_ID=L.LQD_ANFITRION
			INNER JOIN mb_tipos_funcionario AS TPF ON TPF.TIPO_FUNCIONARIO_ID = F.FUNCIONARIO_ID	
			WHERE TPF.TIPO_FUNCIONARIO_ID =  '5' AND L.LQD_REGISTRO= " . "'" . $fechaRegistroLiq ."'" . " AND L.LQD_ANFITRION= " . "'" . $IdAnfitrion . "'					 
			 ";
			 */
	//2014-3-9 inicio
	$sFechaRecortada = substr($fechaRegistroLiq, 0, 10);
	$sSQL = "SELECT  SUM(L.LQD_MONTO) AS MONTO_TOTAL
				FROM `mb_liq_manuales` L 
					INNER JOIN mb_tipos_herramienta AS H ON  H.TIPO_HERRAMIENTA_ID = L.LQD_TIPO_HERRAMIENTA_ID 
							INNER JOIN mb_funcionarios AS F ON F.FUNCIONARIO_ID = L.LQD_ANFITRION 
				WHERE LQD_ANFITRION = '$IdAnfitrion' AND LQD_REGISTRO LIKE '%$sFechaRecortada%'";
    $aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");
	
    return (array(sizeof($aResult), array_slice($aResult, $i, $r)));
}
function rowsGet3($r, $i) {
    $sUsuario = $_SESSION["usr_session"];
    $sSQL = "SELECT ROUND( SUM( L.LQD_MONTO ) , 2 ) AS MONTO
			FROM mb_liquidaciones AS L
			INNER JOIN mb_programaciones AS P ON P.PRG_ID = L.LQD_PRG_ID
			INNER JOIN mb_herramientas AS H ON H.HRR_ID = L.LQD_HRR_ID
			INNER JOIN mb_funcionarios AS F ON F.FUNCIONARIO_ID = L.LQD_ANFITRION
			INNER JOIN mb_tipos_funcionario AS TPF ON TPF.TIPO_FUNCIONARIO_ID = F.FUNCIONARIO_ID
			WHERE TPF.TIPO_FUNCIONARIO_ID = '5'
			AND L.LQD_ESTADO = 'ACTIVO'					 
			 ";
			
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
		
        case "LST44": 
					$pageSize = $_REQUEST["pageSize"];
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
                    list($nLen, $aData) = rowsGetCombo(1000, $start);
                    echo json_encode(array("success" => true, "resultTotal" => $nLen, "resultRoot" => $aData));
                    break;	
        case "LIST_2": 
					$pageSize = "50";
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;		
			
					$fechaRegistroLiq = $_REQUEST["fechaInicio"];
					$IdAnfitrion = $_REQUEST["IdAnfitrion"];
					// $IdAnfitrion = isset($_REQUEST["IdAnfitrion"])? $_REQUEST["start"] : 0;		
					$fechaRegistroLiq = date("Y-m-d",strtotime($fechaRegistroLiq));
					
                    list($nLen, $aData) = rowsGet2($limit, $start, $fechaRegistroLiq, $IdAnfitrion);
                    echo json_encode(array("success" => true, "resultTotal" => $nLen, "resultRoot" => $aData));
                    break;
		case "LIST_22": 
					$pageSize = "50";
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;		
			
					$fechaRegistroLiq = $_REQUEST["fechaInicio"];
					$IdAnfitrion = $_REQUEST["IdAnfitrion"];		
					$fechaRegistroLiq = date("Y-m-d",strtotime($fechaRegistroLiq));
					if($fechaRegistroLiq!="" && $IdAnfitrion!=""){
					
                    list($nLen, $aData) = rowsGet22($limit, $start, $fechaRegistroLiq, $IdAnfitrion);
                    echo json_encode(array("success" => true, "resultTotal" => $nLen, "resultRoot" => $aData));
					}
                    break;
        case "LIST_3": 
			
					$pageSize = $_REQUEST["pageSize"];
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
                    list($nLen, $aData) = rowsGet3($limit, $start);
                    echo json_encode(array("success" => true, "resultTotal" => $nLen, "resultRoot" => $aData));
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