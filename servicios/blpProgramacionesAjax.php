<?php
require('db.php');

function rowsGet($r, $i) {
    /*$sSQL = "SELECT P.*, HRR_DESCRIPCION, RUTA_DESCRIPCION, CONCAT(FUNCIONARIO_NOMBRES,' ',FUNCIONARIO_PATERNO,' ',FUNCIONARIO_MATERNO) AS FUNCIONARIO, FUNCIONARIO_ID
			 FROM MB_PROGRAMACIONES P
			 INNER JOIN MB_HERRAMIENTAS H ON P.PRG_HRR_ID = H.HRR_ID
			 INNER JOIN MB_RUTAS R ON P.PRG_RUTA_ID = R.RUTA_ID
			 INNER JOIN MB_FUNCIONARIOS F ON P.PRG_CONDUCTOR_ID = F.FUNCIONARIO_ID
			 ORDER BY 1";*/
			 $sSQL = "SELECT P.*, HRR_DESCRIPCION, RUTA_DESCRIPCION, CONCAT(FUNCIONARIO_NOMBRES,' ',FUNCIONARIO_PATERNO,' ',FUNCIONARIO_MATERNO) AS FUNCIONARIO, FUNCIONARIO_ID
			 FROM MB_PROGRAMACIONES P
			 INNER JOIN MB_HERRAMIENTAS H ON P.PRG_HRR_ID = H.HRR_ID
			 INNER JOIN MB_RUTAS R ON P.PRG_RUTA_ID = R.RUTA_ID
			 INNER JOIN MB_FUNCIONARIOS F ON P.PRG_CONDUCTOR_ID = F.FUNCIONARIO_ID
			 ";
    $aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");
	
    return (array(sizeof($aResult), array_slice($aResult, $i, $r)));
}

function rowsGetHRR() {
    $sSQL = "SELECT * FROM MB_HERRAMIENTAS H";
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
					
        case "LST_HRR_FEC": $iHerramientaId = $_REQUEST["HRR"];
		                    $dFecha = $_REQUEST["FEC"];

							$sPrg = "SELECT PRG_ID,PRG_HRR_ID ,PRG_CONDUCTOR_ID,PRG_RUTA_ID,PRG_REGISTRO,PRG_MODIFICACION,PRG_USUARIO,PRG_ESTADO 
									 FROM MB_PROGRAMACIONES 
									 WHERE PRG_HRR_ID = '$iHerramientaId' AND PRG_ESTADO = 'ACTIVO' AND PRG_REGISTRO = '$dFecha'";
                            $aData = executeQuery($sPrg, "COBRO_BUSES_ORIGEN");
							$nLen = sizeof($aData);
							echo json_encode(array("success" => true, "resultTotal" => $nLen, "resultRoot" => $aData));
							break;
					
        case "NEW": $sHrrId = $_REQUEST["H_HRR_ID"];
                    $sRutaId = $_REQUEST["H_RUTA_ID"];
					$sFuncionarioId = $_REQUEST["H_FUNCIONARIO_ID"];
                    $sPrgEstado ='ACTIVO';
					$sUsuario = $_SESSION["usr_session"]; 
					$sFecha = $_REQUEST["DATE_ID"];
                    $sFechaRegistro = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sSQL = "INSERT INTO MB_PROGRAMACIONES (PRG_HRR_ID,PRG_CONDUCTOR_ID,PRG_RUTA_ID,PRG_ESTADO,PRG_USUARIO,PRG_MODIFICACION,PRG_REGISTRO) 
                             VALUES ('$sHrrId', '$sFuncionarioId','$sRutaId','$sPrgEstado','$sUsuario','$sFechaRegistro','$sFecha') ";
                    $sRes = executeInsert($sSQL, "COBRO_BUSES_ORIGEN");
					//echo $sSQL;
                    if ($sRes)
                      echo json_encode(array("success" => true));
                    else
                      echo json_encode(array("failure" => false));
                    break;
        case "DEL": $sId = $_REQUEST["idProgramacion"];
                    $sSQL = "UPDATE MB_PROGRAMACIONES SET PRG_ESTADO = 'INACTIVO' WHERE PRG_ID = '$sId'";
                    $sRes = executeDelete($sSQL, "COBRO_BUSES_ORIGEN");;
                    if ($sRes)
                      echo json_encode(array("success" => true));
                    else
                      echo json_encode(array("success" => false));
                    break;
		case "UPDATE":
		
					$sPgrId = $_REQUEST["PRG_ID"];
					$sHrrId = $_REQUEST["H_HRR_ID"];
                    $sRutaId = $_REQUEST["H_RUTA_ID"];
					$sFuncionarioId = $_REQUEST["H_FUNCIONARIO_ID"];
                    $sPrgEstado = 'ACTIVO';
					$sUsuario = $_SESSION["usr_session"]; 
					$sFecha = $_REQUEST["DATE_ID"];
                    $sFechaRegistro = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sSQL = "UPDATE MB_PROGRAMACIONES SET PRG_HRR_ID = '$sHrrId',PRG_CONDUCTOR_ID = '$sFuncionarioId',PRG_RUTA_ID = '$sRutaId',PRG_ESTADO='$sPrgEstado',PRG_USUARIO='$sUsuario',PRG_MODIFICACION='$sFechaRegistro',PRG_REGISTRO='$sFecha'	WHERE PRG_ID = '$sPgrId'";
                    $sRes = executeInsert($sSQL, "COBRO_BUSES_ORIGEN");
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