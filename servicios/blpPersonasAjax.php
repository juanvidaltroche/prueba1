<?php
require('db.php');

function rowsGet($r, $i) {
    $sSQL = "SELECT *, CONCAT(PERSONA_NOMBRES,' ',PERSONA_PATERNO,' ',PERSONA_MATERNO) AS PERSONA_NOMBRE_COMPLETO
             FROM sa_personas
			 INNER JOIN sa_estados_civiles ON PERSONA_ESTADO_CIVIL_ID = ESTADO_CIVIL_ID
			 INNER JOIN sa_expedidos ON PERSONA_EXPEDIDO_ID = EXPEDIDO_ID
			 WHERE PERSONA_ESTADO='A'
             ORDER BY 2 ";
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
        case "NEW": 
					$sCivil = $_REQUEST["H_ESTADO_CIVIL_ID"];
					$sCi = $_REQUEST["PERSONA_CI_LABEL"];
					$sNombre = $_REQUEST["PERSONA_NOMBRES_LABEL"];
					$sPaterno = $_REQUEST["PERSONA_PATERNO_LABEL"];
					$sMaterno = $_REQUEST["PERSONA_MATERNO_LABEL"];
					$sDireccion = $_REQUEST["PERSONA_DIRECCION_LABEL"];
					$sTelefono = $_REQUEST["PERSONA_TELEFONO_LABEL"];
					$sCelular = $_REQUEST["PERSONA_CELULAR_LABEL"];
					$sCorreo = $_REQUEST["PERSONA_CORREO_LABEL"];
					$sSexo = $_REQUEST["PERSONA_SEXO_LABEL"];
					$sFnacimiento = $_REQUEST["PERSONA_FEC_NACIMIENTO_LABEL"];
					$sFingreso = $_REQUEST["PERSONA_FEC_INGRESO_LABEL"];
					$sRegistrado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sModificado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sUsuario = $_SESSION["usr_session"];
					$sEstado = $_REQUEST["PERSONA_ESTADO_COMBO"];
					$sExpedido = $_REQUEST["H_EXPEDIDO_ID"];
					
                    $sSQL = "INSERT INTO sa_personas(PERSONA_ESTADO_CIVIL_ID, PERSONA_CI, PERSONA_NOMBRES, PERSONA_PATERNO, PERSONA_MATERNO, PERSONA_DIRECCION, PERSONA_TELEFONO, PERSONA_CELULAR, PERSONA_CORREO, PERSONA_SEXO, PERSONA_FEC_NACIMIENTO, PERSONA_FEC_INGRESO, PERSONA_REGISTRADO, PERSONA_MODIFICADO, PERSONA_USUARIO, PERSONA_ESTADO, PERSONA_EXPEDIDO_ID) 
                             VALUES ('$sCivil',
									'$sCi',
									'$sNombre',
									'$sPaterno',
									'$sMaterno',
									'$sDireccion',
									'$sTelefono',
									'$sCelular',
									'$sCorreo',
									'$sSexo',
									'$sFnacimiento',
									'$sFingreso',
									'$sRegistrado',
									'$sModificado',
									'$sUsuario',
									'$sEstado',
									'$sExpedido'
										) ";
                    $sRes = executeInsert($sSQL, "COBRO_BUSES_ORIGEN");	
                    if ($sRes)
                      echo json_encode(array("success" => true));
                    else
                      echo json_encode(array("success" => false));
                    break;
					
		case "DEL": 
		            $sI = $_REQUEST["i"];
					$sModificado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sUsuario = $_SESSION["usr_session"];		
		
                    $sSQL = "UPDATE sa_personas SET PERSONA_MODIFICADO='$sModificado',PERSONA_USUARIO='$sUsuario',PERSONA_ESTADO='I' WHERE PERSONA_ID = '$sI'";
                    $sRes = executeDelete($sSQL,"COBRO_BUSES_ORIGEN");
                    if ($sRes)
                      echo json_encode(array("success" => true));
                    else
                      echo json_encode(array("success" => false));
                    break;			
					
        case "UPD": 
					$sI = $_REQUEST["i"];
					$sCivil = $_REQUEST["H_ESTADO_CIVIL_ID"];
					$sCi = $_REQUEST["PERSONA_CI_LABEL"];
					$sNombre = $_REQUEST["PERSONA_NOMBRES_LABEL"];
					$sPaterno = $_REQUEST["PERSONA_PATERNO_LABEL"];
					$sMaterno = $_REQUEST["PERSONA_MATERNO_LABEL"];
					$sDireccion = $_REQUEST["PERSONA_DIRECCION_LABEL"];
					$sTelefono = $_REQUEST["PERSONA_TELEFONO_LABEL"];
					$sCelular = $_REQUEST["PERSONA_CELULAR_LABEL"];
					$sCorreo = $_REQUEST["PERSONA_CORREO_LABEL"];
					$sSexo = $_REQUEST["PERSONA_SEXO_LABEL"];
					$sFnacimiento = $_REQUEST["PERSONA_FEC_NACIMIENTO_LABEL"];
					$sFingreso = $_REQUEST["PERSONA_FEC_INGRESO_LABEL"];					
					$sModificado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sUsuario = $_SESSION["usr_session"];
					$sEstado = $_REQUEST["PERSONA_ESTADO_COMBO"];
					$sExpedido = $_REQUEST["H_EXPEDIDO_ID"];	
					
                    $sSQL = "UPDATE sa_personas SET
					PERSONA_ESTADO_CIVIL_ID='$sCivil',
					PERSONA_CI='$sCi',
					PERSONA_NOMBRES='$sNombre',
					PERSONA_PATERNO='$sPaterno',
					PERSONA_MATERNO='$sMaterno',
					PERSONA_DIRECCION='$sDireccion',
					PERSONA_TELEFONO='$sTelefono',
					PERSONA_CELULAR='$sCelular',
					PERSONA_CORREO='$sCorreo',
					PERSONA_SEXO='$sSexo',
					PERSONA_FEC_NACIMIENTO='$sFnacimiento',
					PERSONA_FEC_INGRESO='$sFingreso',
					PERSONA_MODIFICADO='$sModificado',
					PERSONA_USUARIO='$sUsuario',
					PERSONA_ESTADO='$sEstado',
					PERSONA_EXPEDIDO_ID='$sExpedido'
					
					WHERE PERSONA_ID = '$sI'";					
					
                    $sRes = executeDelete($sSQL,"COBRO_BUSES_ORIGEN");
                    if ($sRes)
                      echo json_encode(array("success" => true));
                    else
                      echo json_encode(array("success" => false));
                    break;
    }
} catch (Exception $e) {
    echo null;
}

?>