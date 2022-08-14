<?php
require('dbVersion02.php');
LocalInstanciarConexion();
try {
    $option = $_REQUEST["option"];

    switch ($option) {
        case "LST":  $pageSize = $_REQUEST["pageSize"];                  
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
					$consultaSql = "SELECT *
					FROM MB_TIPOS_FUNCIONARIO";
					$respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,$start,$limit);
                    break;
        case "NEW": $sPerfilTextfield = strtoupper($_REQUEST["TIPOFUNCIONARIO"]);  
                    $sComboEstado = strtoupper($_REQUEST["CATEGORIAESTADO"]);
					$sUsuario = strtoupper($_SESSION["usr_session"]);
                    
					$consultaSql = "INSERT INTO MB_TIPOS_FUNCIONARIO (TIPO_FUNCIONARIO_DESCRIPCION, TIPO_FUNCIONARIO_REGISTRO, TIPO_FUNCIONARIO_USUARIO, TIPO_FUNCIONARIO_ESTADO ) 
                             VALUES ('$sPerfilTextfield', LOCALTIME(),'$sUsuario', '$sComboEstado') ";
                    $respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,0,10);
                    break;
					
		case "UPD": $sIdTextfield = strtoupper($_REQUEST["UPDIDTIPOFUNCIONARIO"]);  
		            $sPerfilTextfield = strtoupper($_REQUEST["UPDTIPOFUNCIONARIO"]);  
                    $sComboEstado = strtoupper($_REQUEST["UPDCATEGORIAESTADO"]);
					$sUsuario = strtoupper($_SESSION["usr_session"]);
                    
					$consultaSql = "UPDATE MB_TIPOS_FUNCIONARIO SET TIPO_FUNCIONARIO_DESCRIPCION='$sPerfilTextfield', TIPO_FUNCIONARIO_USUARIO='$sUsuario', TIPO_FUNCIONARIO_ESTADO='$sComboEstado'  
                             WHERE TIPO_FUNCIONARIO_ID = '$sIdTextfield' ";
                    $respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,0,10);
                    break;
					
        case "DEL": $sI = $_REQUEST["i"];
                    //$consultaSql = "DELETE FROM `mb_tipos_funcionario` WHERE TIPO_FUNCIONARIO_ID = '$sI'";
                    $consultaSql = "UPDATE MB_TIPOS_FUNCIONARIO SET TIPO_FUNCIONARIO_ESTADO = 'INACTIVO'  WHERE TIPO_FUNCIONARIO_ID = '$sI'";
					$respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,0,10);
                    break;
    }
} catch (Exception $e) {
    echo null;
}
 LocalCerrarConexion();
?>