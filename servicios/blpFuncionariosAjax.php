<?php

require('dbVersion02.php');
LocalInstanciarConexion();

try {
    $option = $_REQUEST["option"];
    
    switch ($option) {
        case "LST":
            $pageSize    = $_REQUEST["pageSize"];
            $limit       = isset($_REQUEST["limit"]) ? $_REQUEST["limit"] : $pageSize;
            $start       = isset($_REQUEST["start"]) ? $_REQUEST["start"] : 0;
            $consultaSql = "SELECT *, CONCAT(FUNCIONARIO_NOMBRES,' ',FUNCIONARIO_PATERNO,' ',FUNCIONARIO_MATERNO) AS FUNCIONARIO
					 FROM MB_FUNCIONARIOS           
					 ORDER BY FUNCIONARIO_NOMBRES ASC";
            $respuesta   = LocalExecuteQuery($consultaSql);
            doGenerarJsonRespuesta($respuesta, $start, $limit);
            break;
		case "BSQ":
            $valor    = $_REQUEST["valor"];
           
            $consultaSql = "SELECT *, CONCAT(FUNCIONARIO_NOMBRES,' ',FUNCIONARIO_PATERNO,' ',FUNCIONARIO_MATERNO) AS FUNCIONARIO
					 FROM MB_FUNCIONARIOS
					WHERE  CONCAT(FUNCIONARIO_NOMBRES,' ',FUNCIONARIO_PATERNO,' ',FUNCIONARIO_MATERNO) LIKE '%$valor%' 
					 ORDER BY FUNCIONARIO_NOMBRES ASC";
            $respuesta   = LocalExecuteQuery($consultaSql);
            doGenerarJsonRespuesta($respuesta, 0, 1000);
            break;
		case "LST_ID":
		    $id          = $_REQUEST["id"];
            $pageSize    = $_REQUEST["pageSize"];
            $limit       = isset($_REQUEST["limit"]) ? $_REQUEST["limit"] : $pageSize;
            $start       = isset($_REQUEST["start"]) ? $_REQUEST["start"] : 0;
            $consultaSql = "SELECT *, CONCAT(FUNCIONARIO_NOMBRES,' ',FUNCIONARIO_PATERNO,' ',FUNCIONARIO_MATERNO) AS FUNCIONARIO
					 FROM MB_FUNCIONARIOS  
					 WHERE FUNCIONARIO_ID = '$id'
					 ORDER BY FUNCIONARIO_NOMBRES ASC";
            $respuesta   = LocalExecuteQuery($consultaSql);
            doGenerarJsonRespuesta($respuesta, $start, $limit);
            break;
        case "NEW":
            $sFuncionarioCi       = $_REQUEST["LABEL_CI"];
            $sFuncionarioNombre   = $_REQUEST["LABEL_NOMBRE"];
            $sFuncionarioPaterno  = $_REQUEST["LABEL_PATERNO"];
            $sFuncionarioMaterno  = $_REQUEST["LABEL_MATERNO"];
            $sFuncionarioExpedido = $_REQUEST["H_EXPEDIDO_ID"];
            $sFuncionarioEstCivil = $_REQUEST["H_ESTADO_CIVIL_ID"];
            $sFuncionarioRegistro = strftime("%Y-%m-%d-%H-%M-%S", time());
            $sFuncionarioUsuario  = $_SESSION["usr_session"];
            $sFuncionarioEstado   = "ACTIVO";
            
            $consultaSql = "INSERT INTO MB_FUNCIONARIOS( FUNCIONARIO_EXPEDIDO_ID,FUNCIONARIO_ESTADO_CIVIL_ID,
					         FUNCIONARIO_CI, FUNCIONARIO_NOMBRES, 
							 FUNCIONARIO_PATERNO, FUNCIONARIO_MATERNO, FUNCIONARIO_REGISTRO,
							 FUNCIONARIO_USUARIO, FUNCIONARIO_ESTADO) 
							VALUES ('$sFuncionarioExpedido','$sFuncionarioEstCivil','$sFuncionarioCi','$sFuncionarioNombre','$sFuncionarioPaterno',
							'$sFuncionarioMaterno','$sFuncionarioRegistro',	'$sFuncionarioUsuario','$sFuncionarioEstado')";
            
            $respuesta = LocalExecuteQuery($consultaSql);
            doGenerarJsonRespuesta($respuesta, 0, 10);
            break;
        case "DEL":
            $sI          = $_REQUEST["i"];
            $consultaSql = "UPDATE MB_FUNCIONARIOS SET FUNCIONARIO_ESTADO='INACTIVO' WHERE FUNCIONARIO_ID = '$sI'";
            $respuesta   = LocalExecuteQuery($consultaSql);
            doGenerarJsonRespuesta($respuesta, 0, 10);
            break;
        case "UPD":
            $sFuncionarioCi       = $_REQUEST["LABEL_CI"];
            $sFuncionarioNombre   = $_REQUEST["LABEL_NOMBRE"];
            $sFuncionarioPaterno  = $_REQUEST["LABEL_PATERNO"];
            $sFuncionarioMaterno  = $_REQUEST["LABEL_MATERNO"];
            $sFuncionarioExpedido = $_REQUEST["H_EXPEDIDO_ID"];
            $sFuncionarioEstCivil = $_REQUEST["H_ESTADO_CIVIL_ID"];
            $sFuncionarioRegistro = strftime("%Y-%m-%d-%H-%M-%S", time());
            $sFuncionarioUsuario  = $_SESSION["usr_session"];
            $sFuncionarioEstado   = "ACTIVO";
            $sFuncionarioId       = $_REQUEST["i"];
            
            $consultaSql = "UPDATE mb_funcionarios SET 
							FUNCIONARIO_EXPEDIDO_ID='$sFuncionarioExpedido',
							FUNCIONARIO_ESTADO_CIVIL_ID='$sFuncionarioEstCivil',
							   FUNCIONARIO_CI='$sFuncionarioCi',
							   FUNCIONARIO_NOMBRES='$sFuncionarioNombre',
							   FUNCIONARIO_PATERNO='$sFuncionarioPaterno',
							   FUNCIONARIO_MATERNO='$sFuncionarioMaterno',						   
							   FUNCIONARIO_MODIFICACION='$sFuncionarioRegistro',
							   FUNCIONARIO_USUARIO='$sFuncionarioUsuario',
							   FUNCIONARIO_ESTADO='$sFuncionarioEstado' 
							   WHERE FUNCIONARIO_ID='$sFuncionarioId'";
            
            $respuesta = LocalExecuteQuery($consultaSql);
            doGenerarJsonRespuesta($respuesta, 0, 10);
            break;
        
        case "ERR":
            echo json_encode(array(
                "success" => false
            ));
            break;
    }
}
catch (Exception $e) {
    echo null;
}
LocalCerrarConexion();
?>