<?php
require('db.php');

function rowsGet($r, $i) {
    $sSQL = "SELECT *
             FROM sa_accesos
			 INNER JOIN mb_tipos_funcionario ON ACCESO_TIPO_FUNCIONARIO_ID = TIPO_FUNCIONARIO_ID
			 INNER JOIN sa_opciones ON ACCESO_OPCION_ID = OPCION_ID
			 WHERE ACCESO_ESTADO='A' AND TIPO_FUNCIONARIO_ESTADO='ACTIVO' 
             ORDER BY ACCESO_TIPO_FUNCIONARIO_ID ASC ";
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
					$sOpcion = $_REQUEST["H_OPCION_ID"];
					$sTipoFuncionario = $_REQUEST["H_TIPO_FUNCIONARIO_ID"];
					$sRegistrado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sModificado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sUsuario = $_SESSION["usr_session"];
					$sEstado = $_REQUEST["ACCESO_ESTADO_COMBO"];
				
					
                    $sSQL = "INSERT INTO sa_accesos(ACCESO_OPCION_ID,ACCESO_TIPO_FUNCIONARIO_ID,ACCESO_REGISTRADO,ACCESO_MODIFICADO,ACCESO_USUARIO,ACCESO_ESTADO) 
                             VALUES ('$sOpcion',
									'$sTipoFuncionario',									
									'$sRegistrado',
									'$sModificado',
									'$sUsuario',
									'$sEstado'									
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
		
                    $sSQL = "UPDATE sa_accesos SET ACCESO_MODIFICADO='$sModificado',ACCESO_USUARIO='$sUsuario',ACCESO_ESTADO='I' WHERE ACCESO_ID = '$sI'";
                    $sRes = executeDelete($sSQL,"COBRO_BUSES_ORIGEN");
                    if ($sRes)
                      echo json_encode(array("success" => true));
                    else
                      echo json_encode(array("success" => false));
                    break;			
					
        case "UPD": 
					$sI = $_REQUEST["i"];
					
					$sOpcion = $_REQUEST["H_OPCION_ID"];
					$sTipoFuncionario = $_REQUEST["H_TIPO_FUNCIONARIO_ID"];
					
					$sModificado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
					$sUsuario = $_SESSION["usr_session"];
					$sEstado = $_REQUEST["ACCESO_ESTADO_COMBO"];
					
                    $sSQL = "UPDATE sa_accesos SET
					ACCESO_OPCION_ID='$sOpcion',
					ACCESO_TIPO_FUNCIONARIO_ID='$sTipoFuncionario',					
					ACCESO_MODIFICADO='$sModificado',
					ACCESO_USUARIO='$sUsuario',
					ACCESO_ESTADO='$sEstado'				
					
					WHERE ACCESO_ID = '$sI'";					
					
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