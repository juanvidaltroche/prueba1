<?php
require('dbVersion02.php');
LocalInstanciarConexion();

try {
    $option = $_REQUEST["option"];

    switch ($option) {
        case "LST": $pageSize = $_REQUEST["pageSize"];                  
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
                    $consultaSql = "SELECT  TIPO_BUSES_ID, TIPO_BUSES_DESCRIPCION, TIPO_BUSES_ICONO,TIPO_BUSES_DESCRIPCION_TEXT, TIPO_BUSES_CAPACIDAD,
                                            (SELECT COUNT(TIPO_HERRAMIENTA_ID) AS TOTA FROM mb_tipos_herramienta 
                                            WHERE TIPO_HERRAMIENTA_DESCRIPCION=TIPO_BUSES_ID AND TIPO_HERRAMIENTA_ESTADO LIKE 'ACTIVO') AS TOTAL
                                    FROM mb_tipos_buses
                                    WHERE TIPO_BUSES_ESTADO LIKE 'ACTIVO'";
                    $respuesta=LocalExecuteQuery($consultaSql);
                    doGenerarJsonRespuesta($respuesta,$start,$limit);
                    break;
                            
        case "NEW":     
                    $fileName = $_FILES['filedata']['name'];
                    $tmpName  = $_FILES['filedata']['tmp_name'];
                    $fileSize = $_FILES['filedata']['size'];
                    $fileType = $_FILES['filedata']['type'];
                    //echo ($fileName."<br>");//celulito123.png
                    //echo ($tmpName."<br>");//C:\xampp\tmp\php8995.tmp
                    //echo ($fileSize."<br>");//189174
                    //echo ($fileType."<br>");//image/png
                    copy($tmpName, '../aplicaciones/img/iconos/'.trim($fileName));
                    $sDescripcion = $_REQUEST["TIPO_BUSES_DESCRIPCION"]; 
                    $sDescripcionTEX = $_REQUEST["TIPO_BUSES_DESCRIPCION_TEXT"];
                    $sCapacidad = $_REQUEST["TIPO_BUSES_CAPACIDAD"];
                    $sRegistrado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
                    $sModificado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
                    $sUsuario = $_SESSION["usr_session"];
                    $sEstado    = 'ACTIVO'; 
                    $sIcono = "img/iconos/".$fileName;

                    $consultaSql = "INSERT INTO mb_tipos_buses(TIPO_BUSES_DESCRIPCION, TIPO_BUSES_CAPACIDAD,
                                            TIPO_BUSES_REGISTRO, TIPO_BUSES_MODIFICACION, TIPO_BUSES_USUARIO, TIPO_BUSES_ESTADO,TIPO_BUSES_ICONO,TIPO_BUSES_DESCRIPCION_TEXT) 
                             VALUES('$sDescripcion',
                                    '$sCapacidad',
                                    '$sRegistrado',
                                    '$sModificado',
                                    '$sUsuario',
                                    '$sEstado',
                                    '$sIcono',
                                    '$sDescripcionTEX') ";
                    //echo($consultaSql);
                    $respuesta=LocalExecuteQuery($consultaSql);
                    doGenerarJsonRespuesta($respuesta,0,10);
                    break;
                    
        case "DEL": 
                    $sI = $_REQUEST["i"];
                    $sModificado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
                    $sUsuario = $_SESSION["usr_session"];     
        
                    $consultaSql = "UPDATE mb_tipos_buses SET TIPO_BUSES_MODIFICACION='$sModificado',TIPO_BUSES_USUARIO='$sUsuario',TIPO_BUSES_ESTADO='INACTIVO'
                                    WHERE TIPO_BUSES_ID = '$sI'";
                    $respuesta=LocalExecuteQuery($consultaSql);
                    doGenerarJsonRespuesta($respuesta,0,10);
                    break;          
                    
        case "UPD": 
                    $fileName = $_FILES['filedata']['name'];
                    $tmpName  = $_FILES['filedata']['tmp_name'];
                    $fileSize = $_FILES['filedata']['size'];
                    $fileType = $_FILES['filedata']['type'];
                    copy($tmpName, '../aplicaciones/img/iconos/'.trim($fileName));
                    $sIcono = "img/iconos/".$fileName;
                    $sI = $_REQUEST["i"];
                    $sDescripcion = $_REQUEST["TIPO_BUSES_DESCRIPCION"]; 
                    $sDescripcionTEX = $_REQUEST["TIPO_BUSES_DESCRIPCION_TEXT"];
                    $sCapacidad = $_REQUEST["TIPO_BUSES_CAPACIDAD"];      
                    $sModificado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
                    $sUsuario = $_SESSION["usr_session"];
                    $sEstado    = 'ACTIVO'; 
                    
                    $consultaSql = "UPDATE mb_tipos_buses SET                    
                                    TIPO_BUSES_DESCRIPCION='$sDescripcion',
                                    TIPO_BUSES_MODIFICACION='$sModificado',
                                    TIPO_BUSES_USUARIO='$sUsuario',
                                    TIPO_BUSES_ESTADO='$sEstado',
                                    TIPO_BUSES_ICONO='$sIcono',
                                    TIPO_BUSES_CAPACIDAD='$sCapacidad',
                                    TIPO_BUSES_DESCRIPCION_TEXT='$sDescripcionTEX'
                                        
                                    WHERE TIPO_BUSES_ID = '$sI'";                    
                    
                    $respuesta=LocalExecuteQuery($consultaSql);
                    doGenerarJsonRespuesta($respuesta,0,10);
                    break;
        case "UPD_2": 
                    
                    $sI = $_REQUEST["i"];
                    $sDescripcion = $_REQUEST["TIPO_BUSES_DESCRIPCION"]; 
                    $sDescripcionTEX = $_REQUEST["TIPO_BUSES_DESCRIPCION_TEXT"];
                    $sCapacidad = $_REQUEST["TIPO_BUSES_CAPACIDAD"];      
                    $sModificado = strftime( "%Y-%m-%d-%H-%M-%S", time() );
                    $sUsuario = $_SESSION["usr_session"];
                    $sEstado    = 'ACTIVO'; 
                    
                    $consultaSql = "UPDATE mb_tipos_buses SET                    
                                    TIPO_BUSES_DESCRIPCION='$sDescripcion',
                                    TIPO_BUSES_MODIFICACION='$sModificado',
                                    TIPO_BUSES_USUARIO='$sUsuario',
                                    TIPO_BUSES_ESTADO='$sEstado',
                                    TIPO_BUSES_CAPACIDAD='$sCapacidad',
                                    TIPO_BUSES_DESCRIPCION_TEXT='$sDescripcionTEX'
                                        
                                    WHERE TIPO_BUSES_ID = '$sI'";                    
                    //echo($consultaSql);
                    $respuesta=LocalExecuteQuery($consultaSql);
                    doGenerarJsonRespuesta($respuesta,0,10);
                    break;
    }
} catch (Exception $e) {
    echo null;
}
 LocalCerrarConexion();
?>