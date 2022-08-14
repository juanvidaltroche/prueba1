<?php
require('dbVersion02.php');
if (!isset($_SESSION['usr_session']) or $_SESSION["tipo"] != 1)
    header("location:index.php");
LocalInstanciarConexion();

try {
    $option = $_REQUEST["option"];
    switch ($option) {
        case "LST_FUNCIONARIO":
            $pageSize    = $_REQUEST["pageSize"];
            $limit       = isset($_REQUEST["limit"]) ? $_REQUEST["limit"] : $pageSize;
            $start       = isset($_REQUEST["start"]) ? $_REQUEST["start"] : 0;
            $consultaSql = "SELECT *, CONCAT(FUNCIONARIO_NOMBRES,' ',FUNCIONARIO_PATERNO,' ',FUNCIONARIO_MATERNO) AS FUNCIONARIO
					FROM MB_FUNCIONARIOS
					INNER JOIN sa_usuarios ON FUNCIONARIO_ID = USUARIO_FUNCIONARIO_ID					
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
            $sFuncionarioCorreo   = $_REQUEST["LABEL_CORREO"];
            $sFuncionarioCodigo   = $_REQUEST["LABEL_CODIGO"];
            $sFuncionarioPass     = $_REQUEST["LABEL_PASSWORD"];
            
            
            $sFuncionarioRegistro = strftime("%Y-%m-%d-%H-%M-%S", time());
            $sFuncionarioUsuario  = $_SESSION["usr_session"];
            $sFuncionarioEstado   = "ACTIVO";
            
            $consultaSql = "INSERT INTO MB_FUNCIONARIOS( FUNCIONARIO_EXPEDIDO_ID,FUNCIONARIO_ESTADO_CIVIL_ID,
					         FUNCIONARIO_CI, FUNCIONARIO_NOMBRES, 
							 FUNCIONARIO_PATERNO, FUNCIONARIO_MATERNO, FUNCIONARIO_REGISTRO,
							 FUNCIONARIO_USUARIO, FUNCIONARIO_ESTADO) 
							VALUES ('$sFuncionarioExpedido','$sFuncionarioEstCivil','$sFuncionarioCi','$sFuncionarioNombre','$sFuncionarioPaterno',
							'$sFuncionarioMaterno','$sFuncionarioRegistro',	'$sFuncionarioUsuario','$sFuncionarioEstado')";
            
            $idRecuperado = LocalExecuteQueryRecuperaID($consultaSql);
            
            $consultaSql = "INSERT INTO sa_usuarios(USUARIO_FUNCIONARIO_ID,
													USUARIO_CODIGO,
													USUARIO_CLAVE, 
													USUARIO_CORREO, 
													USUARIO_REGISTRADO,
													USUARIO_MODIFICADO, 
													USUARIO_USUARIO,
													USUARIO_ESTADO) 
							VALUES ('$idRecuperado',
							'$sFuncionarioCodigo',
							'$sFuncionarioPass',
							'$sFuncionarioCorreo',
							'$sFuncionarioRegistro',
							'$sFuncionarioRegistro',
							'$sFuncionarioUsuario',								
							'$sFuncionarioEstado')";
            
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
            $sFuncionarioEstado   = $_REQUEST["H_FUNCIONARIO_ESTADO"];
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
        
        //---
        case "LST_CIVILES":
            $pageSize    = $_REQUEST["pageSize"];
            $limit       = isset($_REQUEST["limit"]) ? $_REQUEST["limit"] : $pageSize;
            $start       = isset($_REQUEST["start"]) ? $_REQUEST["start"] : 0;
            $consultaSql = "SELECT *
					 FROM sa_estados_civiles
					 ORDER BY 2";
            $respuesta   = LocalExecuteQuery($consultaSql);
            doGenerarJsonRespuesta($respuesta, $start, $limit);
            break;
        case "LST_EXPEDIDO":
            $consultaSql = "SELECT *
					 FROM sa_expedidos
					 ORDER BY 2";
            $respuesta   = LocalExecuteQuery($consultaSql);
            doGenerarJsonRespuesta($respuesta, 0, 10);
            break;
        
        //--
        
        case "LST_TIPO_FUNCIONARIOS":
            $pageSize    = $_REQUEST["pageSize"];
            $limit       = isset($_REQUEST["limit"]) ? $_REQUEST["limit"] : $pageSize;
            $start       = isset($_REQUEST["start"]) ? $_REQUEST["start"] : 0;
            $consultaSql = "SELECT * 
							FROM  mb_tipos_funcionario; ";
            $respuesta   = LocalExecuteQuery($consultaSql);
            doGenerarJsonRespuesta($respuesta, $start, $limit);
            break;
        
        case "LST_TIPO_FUNCIONARIO":
            $pageSize    = $_REQUEST["pageSize"];
            $limit       = isset($_REQUEST["limit"]) ? $_REQUEST["limit"] : $pageSize;
            $start       = isset($_REQUEST["start"]) ? $_REQUEST["start"] : 0;
            $idPadre     = isset($_REQUEST["idPadre"]) ? $_REQUEST["idPadre"] : 0;
            $consultaSql = "SELECT *
					FROM MB_TIPOS_FUNCIONARIO 
					INNER JOIN sa_usuario_tipos_funcionario ON TIPO_FUNCIONARIO_ID = UTF_TIPO_FUNCIONARIO_ID
					WHERE UTF_USUARIO_ID = '$idPadre';";
            $respuesta   = LocalExecuteQuery($consultaSql);
            doGenerarJsonRespuesta($respuesta, $start, $limit);
            break;
        case "NEW_TIPO_FUNCIONARIO":
            $sIdfuncionario= strtoupper($_REQUEST["FUNCIONARIO_ID"]);          
            $sTipofuncionario= strtoupper($_REQUEST["H_TIPO_FUNCIONARIO_ID"]);          
            $sUsuario         = strtoupper($_SESSION["usr_session"]);
            
            $consultaSql = "INSERT INTO sa_usuario_tipos_funcionario (UTF_USUARIO_ID, 
																		UTF_TIPO_FUNCIONARIO_ID,
																		UTF_REGISTRADO,
																		UTF_MODIFICADO, 
																		UTF_USUARIO,
																		UTF_ESTADO ) 
                             VALUES ('$sIdfuncionario', 
									'$sTipofuncionario', 
									LOCALTIME(),
									LOCALTIME(),
									'$sUsuario', 
									'ACTIVO') ";
            $respuesta   = LocalExecuteQuery($consultaSql);
            doGenerarJsonRespuesta($respuesta, 0, 10);
            break;
        
        case "UPD_TIPO_FUNCIONARIO":
            $sIdTextfield     = strtoupper($_REQUEST["UPDIDTIPOFUNCIONARIO"]);
            $sPerfilTextfield = strtoupper($_REQUEST["UPDTIPOFUNCIONARIO"]);
            $sComboEstado     = strtoupper($_REQUEST["UPDCATEGORIAESTADO"]);
            $sUsuario         = strtoupper($_SESSION["usr_session"]);
            
            $consultaSql = "UPDATE MB_TIPOS_FUNCIONARIO SET TIPO_FUNCIONARIO_DESCRIPCION='$sPerfilTextfield', TIPO_FUNCIONARIO_USUARIO='$sUsuario', TIPO_FUNCIONARIO_ESTADO='$sComboEstado'  
                             WHERE TIPO_FUNCIONARIO_ID = '$sIdTextfield' ";
            $respuesta   = LocalExecuteQuery($consultaSql);
            doGenerarJsonRespuesta($respuesta, 0, 10);
            break;
        
        case "DEL_TIPO_FUNCIONARIO":
            $sI          = $_REQUEST["i"];
            //$consultaSql = "DELETE FROM `mb_tipos_funcionario` WHERE TIPO_FUNCIONARIO_ID = '$sI'";
            $consultaSql = "UPDATE MB_TIPOS_FUNCIONARIO SET TIPO_FUNCIONARIO_ESTADO = 'INACTIVO'  WHERE TIPO_FUNCIONARIO_ID = '$sI'";
            $respuesta   = LocalExecuteQuery($consultaSql);
            doGenerarJsonRespuesta($respuesta, 0, 10);
            break;
            
    }
}
catch (Exception $e) {
    echo null;
}
LocalCerrarConexion();
?>