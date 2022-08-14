<?php
require('db.php');
function rowsGetSess($r, $i, $s) {
    $sSQL = "SELECT *, NOW() AS FECHA_ACTUAL  FROM SA_USUARIOS WHERE USUARIO_CODIGO LIKE '%$s%'";
    $aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");
    return (array(sizeof($aResult), array_slice($aResult, $i, $r)));
}

function rowsGet($iHerramientaId,$r, $i) {
    $sSQL = "SELECT HRR_ID, `PRG_ID` , `PRG_ID` , `PRG_RUTA_ID` , `PRG_REGISTRO` , FUNCIONARIO_NOMBRES, HRR_DESCRIPCION,RUTA_DESCRIPCION
			FROM MB_PROGRAMACIONES INNER JOIN MB_FUNCIONARIOS ON PRG_CONDUCTOR_ID = FUNCIONARIO_ID INNER JOIN MB_HERRAMIENTAS ON PRG_HRR_ID = HRR_ID  INNER JOIN MB_RUTAS ON RUTA_ID=PRG_RUTA_ID
			WHERE PRG_HRR_ID = '$iHerramientaId'  AND PRG_ESTADO = 'ACTIVO' AND PRG_REGISTRO = (SELECT MAX( PRG_REGISTRO )
																								FROM MB_PROGRAMACIONES WHERE PRG_HRR_ID = '$iHerramientaId' AND PRG_ESTADO = 'ACTIVO' ) ";
    $aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");
    return (array(sizeof($aResult), array_slice($aResult, $i, $r)));
}

try {
    $option = $_REQUEST["option"];

    switch ($option) {
        case "LST": 
					$iHerramientaId = $_REQUEST["herramientaId"];
                    
                    list($nLen, $aData) = rowsGet($iHerramientaId,1,1);
                    echo json_encode(array("success" => true, "resultTotal" => $nLen, "resultRoot" => $aData));
                    break;
        case "LSTSESS": 
                    $pageSize = $_REQUEST["pageSize"];
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
                    $session = $_SESSION["usr_session"];

                    list($nLen, $aData) = rowsGetSess($limit, $start, $session);
                    echo json_encode(array("success" => true, "resultTotal" => $nLen, "resultRoot" => $aData));
                    break;
        case "NEW": $iProgramacionId = $_REQUEST["PROGRAMACION_ID"];
                    $iHerramientaId = $_REQUEST["HERRAMIENTA_ID"];					
					$sConductor = $_REQUEST["HERRAMIENTA_CONDUCTOR"];	
					$sUsuario =$_SESSION["usr_session"];
                    $iRutaId = $_REQUEST["RUTA_ID"];
					$sfecha = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					
                    $sSQL = "INSERT INTO MB_PROGRAMACIONES (PRG_ID, PRG_HRR_ID, PRG_CONDUCTOR_ID, PRG_RUTA_ID,PRG_REGISTRO PRG_USUARIO, PRG_ESTADO) 
					VALUES ('$iProgramacionId','$iHerramientaId','$sConductor','$iRutaId','$sfecha','$sUsuario','ACTIVO') ";
                    $sRes = executeInsert($sSQL,"COBRO_BUSES_ORIGEN");
                    if ($sRes)
                      echo json_encode(array("success" => true));
                    else
                      echo json_encode(array("failure" => false));
                    break;
		case "UPD": $iProgramacionId = $_REQUEST["PROGRAMACION_ID"];
                    $sEstado = $_REQUEST["ESTADO"];					
					
                    $sSQL = "UPDATE MB_PROGRAMACIONES SET PRG_ESTADO = '$sEstado' WHERE PRG_ID = 'iProgramacionId'";					
                    $sRes = executeInsert($sSQL,"COBRO_BUSES_ORIGEN");
                    if ($sRes)
                      echo json_encode(array("success" => true));
                    else
                      echo json_encode(array("success" => false));
                    break;									
        case "DEL": $sI = $_REQUEST["i"];
					//$sSQL = "DELETE FROM mb_paradas WHERE PARADA_ID = '$sI'";
                    $sSQL = "DELETE FROM MB_PROGRAMACIONES";
                    $sRes = executeInsert($sSQL,"COBRO_BUSES_ORIGEN");
                    if ($sRes)
                      echo json_encode(array("success" => true));
                    else
                      echo json_encode(array("failure" => false));
                    break;	
	    case "DEL": $sI = $_REQUEST["i"];
				//$sSQL = "DELETE FROM mb_paradas WHERE PARADA_ID = '$sI'";
                    $sSQL = "SELECT * FROM MB_TIPOS_PASAJE WHERE TIPO_PASAJE_CODIGO = %s";
                    $sRes = executeInsert($sSQL,"COBRO_BUSES_ORIGEN");
                    if ($sRes)
                      echo json_encode(array("success" => true));
                    else
                      echo json_encode(array("failure" => false));
                    break;	
    }
} catch (Exception $e) {
    echo null;
}

?>