<?php
require('dbVersion02.php');
LocalInstanciarConexion();
try {
    $option = $_REQUEST["option"];

    switch ($option) {
        case "LST": $pageSize = $_REQUEST["pageSize"];
                    $limit = isset($_REQUEST["limit"])? $_REQUEST["limit"] : $pageSize;
                    $start = isset($_REQUEST["start"])? $_REQUEST["start"] : 0;
                    $consultaSql = "SELECT T.*,P.PARADA_DESCRIPCION, P.PARADA_DETALLE ,
									HR.HRR_DETALLE, HR.HRR_DESCRIPCION,
									THR.TIPO_HERRAMIENTA_DESCRIPCION,
									
									TF.TIPO_FUNCIONARIO_DESCRIPCION, 
									CONCAT(F.FUNCIONARIO_NOMBRES,' ',F.FUNCIONARIO_PATERNO,' ',F.FUNCIONARIO_MATERNO) AS FUNCIONARIO_NOMBRE_COMPLETO,
									TP.TIPO_PASAJE_DESCRIPCION,
									TR.TARIFA_MONTO
										FROM MB_TRXS T
										INNER JOIN MB_GIROS G ON T.TRX_GIRO_ID = G.GIRO_ID
										INNER JOIN MB_PROGRAMACIONES PR ON G.GIRO_PRG_ID = PR.PRG_ID
										INNER JOIN MB_HERRAMIENTAS HR ON PR.PRG_HRR_ID = HR.HRR_ID
										INNER JOIN MB_TIPOS_HERRAMIENTA THR ON HR.HRR_TIPO_HERRAMIENTA_ID = THR.TIPO_HERRAMIENTA_ID
										INNER JOIN MB_FUNCIONARIOS F ON G.GIRO_CONDUCTOR_ID = F.FUNCIONARIO_ID
										OR G.GIRO_RECAUDADOR_ID = F.FUNCIONARIO_ID
									INNER JOIN SA_USUARIOS U ON F.FUNCIONARIO_ID = U.USUARIO_FUNCIONARIO_ID
									INNER JOIN SA_USUARIO_TIPOS_FUNCIONARIO UTF ON UTF.UTF_USUARIO_ID = U.USUARIO_ID
									INNER JOIN MB_TIPOS_FUNCIONARIO TF ON TF.TIPO_FUNCIONARIO_ID = UTF.UTF_TIPO_FUNCIONARIO_ID
										INNER JOIN MB_TIPOS_PASAJE TP ON T.TRX_TIPO_PASAJE_ID = TP.TIPO_PASAJE_ID									
										INNER JOIN MB_TARIFAS TR ON TR.TARIFA_TIPO_PASAJE_ID = TP.TIPO_PASAJE_ID										
										INNER JOIN MB_PARADAS P ON T.TRX_PARADA_ID = P.PARADA_ID
										WHERE TIPO_FUNCIONARIO_DESCRIPCION != 'ADMINISTRADOR'";
					$respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,$start,$limit);
                    break;
        case "NEW": $sProfileLabel = $_REQUEST["COUNTRY_LABEL"];
                    $sProfileStatus = $_REQUEST["COUNTRY_STATUS"];
                    $consultaSql = "INSERT INTO PMT_LF2_PROFILES (PROFILE_LABEL, PROFILE_STATUS,) 
                             VALUES ('$sProfileLabel', '$sProfileStatus') ";
                    $respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,$start,$limit);
                    break;
        case "DEL": $sI = $_REQUEST["i"];
					//$consultaSql = "DELETE FROM mb_trxs WHERE TRX_ID = '$sI'";
                    $consultaSql = "UPDATE MB_TRXS SET TRX_ESTADO = 'INACTIVO' WHERE TRX_ID = '$sI'";
                    $respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,$start,$limit);
                    break;
		case "OTRO": 
                    $consultaSql = "SELECT T.*,  TIPO_PASAJE_DESCRIPCION, PARADA_DESCRIPCION
							 FROM MB_TRXS_TMP T
							 INNER JOIN MB_GIROS G ON T.TRX_GIRO_ID = G.GIRO_ID
							 INNER JOIN MB_TIPOS_PASAJE TP ON T.TRX_TIPO_PASAJE_ID = TP.TIPO_PASAJE_ID
							 INNER JOIN MB_PARADAS P ON T.TRX_PARADA_ID = P.PARADA_ID
							 WHERE T.TRX_ESTADO = 'ACTIVO'
							 GROUP BY TRX_GIRO_ID, TRX_TIPO_PASAJE_ID
							 ORDER BY TRX_GIRO_ID, TRX_TIPO_PASAJE_ID
							 ";
					//echo $consultaSql;					
                    $respuesta=LocalExecuteQuery($consultaSql);
					doGenerarJsonRespuesta($respuesta,$start,$limit);			
                    break;
    }
} catch (Exception $e) {
    echo null;
}
 LocalCerrarConexion();
?>