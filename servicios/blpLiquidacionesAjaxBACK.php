<?php
require('db.php');

function rowsHST($r, $i, $a) {
    if ($a=="")
      $sSQL = " SELECT COUNT( * ) AS PASAJES, DATE( TRX_MODIFICACION ) AS FECHA, TRX_USUARIO, SUM(CAST(TRX_TARIFA AS DECIMAL(20,2))) AS MONTO,
                CONCAT( FUNCIONARIO_NOMBRES, ' ', FUNCIONARIO_PATERNO, ' ', FUNCIONARIO_MATERNO ) AS FUNCIONARIO_NOMBRE_COMPLETO, FUNCIONARIO_ID
                FROM MB_TRXS
                INNER JOIN SA_USUARIOS ON TRX_USUARIO = USUARIO_CODIGO
                INNER JOIN MB_FUNCIONARIOS ON USUARIO_FUNCIONARIO_ID = FUNCIONARIO_ID
                WHERE TRX_LQD_ID <>0 AND TRX_ESTADO = 'ACTIVO'
                GROUP BY DATE( TRX_MODIFICACION ), TRX_USUARIO";
    else
      $sSQL = " SELECT COUNT( * ) AS PASAJES, DATE( TRX_MODIFICACION ) AS FECHA, TRX_USUARIO, SUM(CAST(TRX_TARIFA AS DECIMAL(20,2))) AS MONTO,
                CONCAT( FUNCIONARIO_NOMBRES, ' ', FUNCIONARIO_PATERNO, ' ', FUNCIONARIO_MATERNO ) AS FUNCIONARIO_NOMBRE_COMPLETO, FUNCIONARIO_ID
                FROM MB_TRXS
                INNER JOIN SA_USUARIOS ON TRX_USUARIO = USUARIO_CODIGO
                INNER JOIN MB_FUNCIONARIOS ON USUARIO_FUNCIONARIO_ID = FUNCIONARIO_ID
                WHERE TRX_LQD_ID <>0 AND TRX_ESTADO = 'ACTIVO' AND FUNCIONARIO_ID = '$a'
                GROUP BY DATE( TRX_MODIFICACION ), TRX_USUARIO";  
    $aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");
    return (array(sizeof($aResult), array_slice($aResult, $i, $r)));
}
function rowsGetSI($r, $i, $a) {
    if ($a=="")
      $sSQL = " SELECT L.*, HRR_DESCRIPCION, CONCAT (F.FUNCIONARIO_PATERNO,' ',F.FUNCIONARIO_MATERNO,' ',F.FUNCIONARIO_NOMBRES) AS FUNCIONARIO_NOMBRE_COMPLETO,
                CONCAT (F1.FUNCIONARIO_PATERNO,' ',F1.FUNCIONARIO_MATERNO,' ', F1.FUNCIONARIO_NOMBRES) AS CAJERO_NOMBRE_COMPLETO
                FROM MB_LIQUIDACIONES L
                INNER JOIN MB_HERRAMIENTAS H ON LQD_HRR_ID = HRR_ID
                INNER JOIN MB_FUNCIONARIOS F ON LQD_ANFITRION = F.FUNCIONARIO_ID
                INNER JOIN MB_FUNCIONARIOS F1 ON LQD_CAJERO = F1.FUNCIONARIO_ID
                WHERE LQD_CONFIRMADO = 'SI' AND LQD_ESTADO = 'ACTIVO'
                ORDER BY LQD_HRR_ID,LQD_PRG_ID,LQD_GIRO_ID";
    else
      $sSQL = " SELECT L.*, HRR_DESCRIPCION, CONCAT (F.FUNCIONARIO_PATERNO,' ',F.FUNCIONARIO_MATERNO,' ',F.FUNCIONARIO_NOMBRES) AS FUNCIONARIO_NOMBRE_COMPLETO,
                CONCAT (F1.FUNCIONARIO_PATERNO,' ',F1.FUNCIONARIO_MATERNO,' ', F1.FUNCIONARIO_NOMBRES) AS CAJERO_NOMBRE_COMPLETO
                FROM MB_LIQUIDACIONES L
                INNER JOIN MB_HERRAMIENTAS H ON LQD_HRR_ID = HRR_ID
                INNER JOIN MB_FUNCIONARIOS F ON LQD_ANFITRION = F.FUNCIONARIO_ID
                INNER JOIN MB_FUNCIONARIOS F1 ON LQD_CAJERO = F1.FUNCIONARIO_ID
                WHERE LQD_CONFIRMADO = 'SI' AND LQD_ANFITRION = '$a' AND LQD_ESTADO = 'ACTIVO'
                ORDER BY LQD_HRR_ID,LQD_PRG_ID,LQD_GIRO_ID";  
    $aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");
    return (array(sizeof($aResult), array_slice($aResult, $i, $r)));
}
function rowsGetNO($r, $i, $a) {
    if ($a=="")
      $sSQL = " SELECT COUNT(*) AS PASAJES, DATE(TRX_MODIFICACION)AS FECHA, SUM(CAST(TRX_TARIFA AS DECIMAL(20,2))) AS LQD_MONTO, 
                TRX_USUARIO,TRX_PRG_ID, TRX_HERRAMIENTA_ID, HRR_DESCRIPCION , 
                CONCAT( FUNCIONARIO_PATERNO, ' ', FUNCIONARIO_MATERNO, ' ',FUNCIONARIO_NOMBRES ) AS FUNCIONARIO_NOMBRE_COMPLETO, FUNCIONARIO_ID as LQD_ANFITRION, 
                'NO' AS LQD_CONFIRMADO, 'INGRESO' AS LQD_FLUJO
                FROM MB_TRXS
                INNER JOIN MB_HERRAMIENTAS H ON TRX_HERRAMIENTA_ID = HRR_ID
                INNER JOIN SA_USUARIOS ON TRX_USUARIO = USUARIO_CODIGO
                INNER JOIN MB_FUNCIONARIOS F ON USUARIO_FUNCIONARIO_ID = FUNCIONARIO_ID
                WHERE TRX_ESTADO = 'ACTIVO' AND TRX_LQD_ID =''
                GROUP BY TRX_HERRAMIENTA_ID, TRX_PRG_ID, TRX_USUARIO, DATE(TRX_MODIFICACION)
                ORDER BY TRX_HERRAMIENTA_ID, FUNCIONARIO_NOMBRE_COMPLETO";
    else
      $sSQL = " SELECT COUNT(*) AS PASAJES, DATE(TRX_MODIFICACION)AS FECHA, SUM(CAST(TRX_TARIFA AS DECIMAL(20,2))) AS LQD_MONTO, 
                TRX_USUARIO,TRX_PRG_ID, TRX_HERRAMIENTA_ID, HRR_DESCRIPCION , 
                CONCAT( FUNCIONARIO_PATERNO, ' ', FUNCIONARIO_MATERNO, ' ',FUNCIONARIO_NOMBRES ) AS FUNCIONARIO_NOMBRE_COMPLETO, FUNCIONARIO_ID as LQD_ANFITRION, 
                'NO' AS LQD_CONFIRMADO, 'INGRESO' AS LQD_FLUJO
                FROM MB_TRXS
                INNER JOIN MB_HERRAMIENTAS H ON TRX_HERRAMIENTA_ID = HRR_ID
                INNER JOIN SA_USUARIOS ON TRX_USUARIO = USUARIO_CODIGO
                INNER JOIN MB_FUNCIONARIOS F ON USUARIO_FUNCIONARIO_ID = FUNCIONARIO_ID
                WHERE TRX_ESTADO = 'ACTIVO' AND TRX_LQD_ID ='' AND FUNCIONARIO_ID = '$a'
                GROUP BY TRX_HERRAMIENTA_ID, TRX_PRG_ID, TRX_USUARIO, DATE(TRX_MODIFICACION)
                ORDER BY TRX_HERRAMIENTA_ID, FUNCIONARIO_NOMBRE_COMPLETO";
    $aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");
    return (array(sizeof($aResult), array_slice($aResult, $i, $r)));
}

function rowsGetANF($r, $i) {
    $sSQL = " SELECT CONCAT(FUNCIONARIO_PATERNO,' ',FUNCIONARIO_MATERNO,' ',FUNCIONARIO_NOMBRES) AS FUNCIONARIO_NOMBRE_COMPLETO, FUNCIONARIO_ID AS LQD_ANFITRION
              FROM MB_FUNCIONARIOS f
              INNER JOIN SA_USUARIOS su ON f.FUNCIONARIO_ID = su.USUARIO_FUNCIONARIO_ID
              INNER JOIN SA_USUARIO_TIPOS_FUNCIONARIO sutf ON su.USUARIO_ID = sutf.UTF_USUARIO_ID
              WHERE UTF_TIPO_FUNCIONARIO_ID = 5 ";
    $aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");
    return (array(sizeof($aResult), array_slice($aResult, $i, $r)));
}

function rowsGetGIROS($r, $i, $h) {
    $sSQL = "SELECT GIRO_ID  FROM MB_GIROS
              INNER JOIN MB_PROGRAMACIONES ON GIRO_PRG_ID = PRG_ID
              INNER JOIN MB_HERRAMIENTAS ON PRG_HRR_ID = HRR_ID
              WHERE  HRR_ID = '$h'";
    $aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");
    return (array(sizeof($aResult), array_slice($aResult, $i, $r)));
}
function rowsGetTOTAL($r, $i, $a) {
  if ($a=="")
    $sSQL = " SELECT SUM(LQD_MONTO) AS TOTAL FROM MB_LIQUIDACIONES
              WHERE LQD_ESTADO = 'ACTIVO' AND LQD_CONFIRMADO ='SI' ";
              //GROUP BY LQD_CONFIRMADO";
  else
    $sSQL = " SELECT SUM(LQD_MONTO) AS TOTAL FROM MB_LIQUIDACIONES
              WHERE LQD_ANFITRION = '$a' AND LQD_ESTADO = 'ACTIVO' AND LQD_CONFIRMADO ='SI' ";
              //GROUP BY LQD_CONFIRMADO";
    $aResult = executeQuery($sSQL, "COBRO_BUSES_ORIGEN");
    return (array(sizeof($aResult), array_slice($aResult, $i, $r)));
}
try {
    $option = $_REQUEST["option"];

    switch ($option) {
        case "LST": $pageSize = $_REQUEST["pageSize"];
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
                    $anfitrion = isset($_REQUEST["anfitrion"])? $_REQUEST["anfitrion"] : "";
                    list($nLen, $aData) = rowsGetNO($limit, $start, $anfitrion);
                    echo json_encode(array("success" => true, "resultTotal" => $nLen, "resultRoot" => $aData));
                    break;
        case "LSTSI": $pageSize = $_REQUEST["pageSize"];
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
                    $anfitrion = isset($_REQUEST["anfitrion"])? $_REQUEST["anfitrion"] : "";
                    list($nLen, $aData) = rowsGetSI($limit, $start, $anfitrion);
                    echo json_encode(array("success" => true, "resultTotal" => $nLen, "resultRoot" => $aData));
                    break;
        case "LSTANF": $pageSize = $_REQUEST["pageSize"];
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
                    list($nLen, $aData) = rowsGetANF($limit, $start);
                    echo json_encode(array("success" => true, "resultTotal" => $nLen, "resultRoot" => $aData));
                    break;
        case "LSTGIRO": $pageSize = $_REQUEST["pageSize"];
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
                    $hrrId = $_REQUEST["hrr_id"];
                    list($nLen, $aData) = rowsGetGIROS($limit, $start,$hrrId);
                    echo json_encode(array("success" => true, "resultTotal" => $nLen, "resultRoot" => $aData));
                    break;
        case "LSTTOTAL": $pageSize = $_REQUEST["pageSize"];
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
                    $anfitrion = isset($_REQUEST["anfitrion"])? $_REQUEST["anfitrion"] : "";
                    list($nLen, $aData) = rowsGetTOTAL($limit, $start, $anfitrion);
                    echo json_encode(array("success" => true, "resultTotal" => $nLen, "resultRoot" => $aData));
                    break;
        case "LSTHST": $pageSize = $_REQUEST["pageSize"];
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
                    $anfitrion = isset($_REQUEST["anfitrion"])? $_REQUEST["anfitrion"] : "";
                    list($nLen, $aData) = rowsHST($limit, $start, $anfitrion);
                    echo json_encode(array("success" => true, "resultTotal" => $nLen, "resultRoot" => $aData));
                    break;
        case "NEW": $sHrrId = $_REQUEST["H_HRR_ID"];
                    $sLqdAnfitrion = $_REQUEST["LQDANFITRION"];
                    $sLqdMonto = $_REQUEST["LQDMONTO"];
					          $sLqdConfirmado = $_REQUEST["LQDCONFIRMADO"];
                    $sLqdGiroId = $_REQUEST["GIRO_ID"];
                    $sLqdFlujo = $_REQUEST["LQDFLUJO"];
          					$sUsuario = $_SESSION["usr_session"]; 
                    $idUsuario = $_SESSION["idUsuario"]; 

					          $sFecha = strftime( "%Y-%m-%d", time() );
					          $sSQL = "INSERT INTO MB_LIQUIDACIONES (LQD_ANFITRION, LQD_HRR_ID, LQD_GIRO_ID, LQD_MONTO, LQD_CONFIRMADO, LQD_FLUJO, LQD_REGISTRO, LQD_USUARIO, LQD_CAJERO) 
                             VALUES ('$sLqdAnfitrion', '$sHrrId','$sLqdGiroId','$sLqdMonto','$sLqdConfirmado','$sLqdFlujo','$sFecha','$sUsuario','$idUsuario') ";
                    $sRes = executeInsert($sSQL, "COBRO_BUSES_ORIGEN");
                    if ($sRes)
                      echo json_encode(array("success" => true));
                    else
                      echo json_encode(array("failure" => false));
                    break;
        case "DEL": $sId = $_REQUEST["idLiquidacion"];
                    $sSQL = "UPDATE MB_LIQUIDACIONES SET LQD_ESTADO = 'INACTIVO' WHERE LQD_ID = '$sId'";
                    $sRes = executeDelete($sSQL, "COBRO_BUSES_ORIGEN");;
                    if ($sRes)
                      echo json_encode(array("success" => true));
                    else
                      echo json_encode(array("failure" => false));
                    break;
        case "CONF": $sUsuario = $_REQUEST["usuario"];
                    $sFechaLiq = $_REQUEST["fecha"]; 
                    $sHrr = $_REQUEST["hrr"]; 
                    $sPrg = $_REQUEST["prg"]; 
                    $sTotal = $_REQUEST["total"]; 
                    $sAnfitrion = $_REQUEST["anfitrion"]; 

                    $sUsuarioName = $_SESSION["usr_session"]; 
                    $sIdUsuario = $_SESSION["idUsuario"]; 

                    $sFecha = strftime( "%Y-%m-%d", time() );
                    $sSQL = "INSERT INTO MB_LIQUIDACIONES (LQD_ANFITRION, LQD_HRR_ID, LQD_GIRO_ID, LQD_PRG_ID, LQD_MONTO, LQD_CONFIRMADO, LQD_FLUJO, LQD_REGISTRO, LQD_USUARIO, LQD_CAJERO) 
                             VALUES ('$sAnfitrion', '$sHrr','1','$sPrg','$sTotal','SI','INGRESO','$sFecha','$sUsuario','$sIdUsuario') ";
                    $sRes = executeInsert($sSQL, "COBRO_BUSES_ORIGEN");
                    $ultimo_id = mysql_insert_id(); 
                    $sSQL = "UPDATE MB_TRXS SET TRX_LQD_ID = '$ultimo_id', TRX_MODIFICACION = '$sFecha' WHERE TRX_HERRAMIENTA_ID='$sHrr' AND TRX_PRG_ID='$sPrg' AND TRX_USUARIO='$sUsuario' AND DATE(TRX_MODIFICACION)='$sFechaLiq'";
                    
                    $sRes = executeInsert($sSQL, "COBRO_BUSES_ORIGEN");
                    if ($sRes)
                      echo json_encode(array("success" => true));
                    else
                      echo json_encode(array("failure" => false));
                    break;
		    case "UPDATE":
                    $sLqdId = $_REQUEST["LQD_ID"];
          					$sHrrId = $_REQUEST["LQD_HRR_ID"];
                    $sLqdAnfitrion = $_REQUEST["LQDANFITRIONM"];
                    $sLqdMonto = $_REQUEST["LQDMONTOM"];
                    $sLqdConfirmado = $_REQUEST["LQDCONFIRMADOM"];
                    $sLqdGiroId = $_REQUEST["GIRO_ID"];
                    $sLqdFlujo = $_REQUEST["LQDFLUJOM"];
                    $sUsuario = $_SESSION["usr_session"]; 
                    $sFecha = strftime( "%Y-%m-%d", time() );
          					$sSQL = "UPDATE MB_LIQUIDACIONES SET 
                              LQD_ANFITRION='$sLqdAnfitrion',LQD_HRR_ID='$sHrrId',LQD_GIRO_ID='$sLqdGiroId',LQD_MONTO='$sLqdMonto',LQD_CONFIRMADO='$sLqdConfirmado',LQD_FLUJO='$sLqdFlujo',LQD_REGISTRO='$sFecha',LQD_USUARIO='$sUsuario'
                              WHERE LQD_ID='$sLqdId'";
                    $sRes = executeDelete($sSQL, "COBRO_BUSES_ORIGEN");
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