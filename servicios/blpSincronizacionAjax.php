<?php

require('db.php');
$sResTotal = "true"; 
define('NOMBRE_BASE_DATOS', 'cobro_buses_origen');

function rowsGetGiroTmp() {
    $sSQL = "SELECT `GIRO_ID`,`GIRO_PRG_ID`, `GIRO_CONDUCTOR_ID`, `GIRO_RECAUDADOR_ID`, `GIRO_SALE`, `GIRO_LLEGA`, `GIRO_REGISTRO`, `GIRO_MODIFICACION`, `GIRO_USUARIO`, `GIRO_ESTADO`
			FROM `mb_giros_tmp`
			WHERE `GIRO_ESTADO` = 'ACTIVO' ";
    $aResult = executeQuery($sSQL, NOMBRE_BASE_DATOS);
    return (array(sizeof($aResult), $aResult));
}

function rowsGetTrxTmp() {
    $sSQL = "SELECT `TRX_GIRO_ID`, `TRX_TIPO_PASAJE_ID`, `TRX_NRO_TARJETA`, `TRX_NRO_FACTURA`, `TRX_PARADA_ID`, `TRX_REGISTRO`, `TRX_MODIFICACION`, `TRX_USUARIO`, `TRX_ESTADO`
				FROM `mb_trxs_tmp`
				WHERE `TRX_ESTADO` = 'ACTIVO' ";
    $aResult = executeQuery($sSQL, NOMBRE_BASE_DATOS);
    return (array(sizeof($aResult), $aResult));
}

function rowsGetLqdTmp() {
    $sSQL = "SELECT `LQD_ANFITRION`, `LQD_HRR_ID`, `LQD_GIRO_ID`, `LQD_MONTO`, `LQD_CONFIRMADO`, `LQD_FLUJO`, `LQD_REGISTRO`, `LQD_MODIFICACION`, `LQD_USUARIO`, `LQD_ESTADO` FROM `mb_liquidaciones_tmp`";
    $aResult = executeQuery($sSQL, NOMBRE_BASE_DATOS);
    return (array(sizeof($aResult), $aResult));
}

function rowsInsert($cadenaJsonDeLaTabla,$sSQL) {
		global $sResTotal;
		$objGiro = json_decode($cadenaJsonDeLaTabla);
		$array = $objGiro ->{'resultRoot'};
		$jsRowsInsertar = "";
		foreach ($array as $v1) {
			$registro= "(";
			foreach ($v1 as $v2) {
				$registro = $registro."'".$v2."', ";
			}
			$registro = substr($registro, 0, strlen ( $registro)-2);
			$jsRowsInsertar =$jsRowsInsertar.$registro."),";
			//echo $registro."\n";
		}
		$jsRowsInsertar = substr($jsRowsInsertar, 0, strlen ( $jsRowsInsertar)-1);
		//echo $jsRowsInsertar;
		$sSQL = $sSQL.$jsRowsInsertar.";";
		return ($sSQL);
}//fin funcion rosInsert

function doLlenarLiquidacionTmp() {
		$queryGrupo="SELECT DISTINCT TRX_GIRO_ID
				FROM MB_TRXS_TMP";
  $server = "localhost";
  $usr = "root";
  $pwd = "";  
  $conn = mysql_connect($server, $usr, $pwd);  
  $dbname=NOMBRE_BASE_DATOS;  
  mysql_select_db($dbname);
  $rGrupos = mysql_query ($queryGrupo, $conn);
  
  

 while ($rowG = mysql_fetch_array ($rGrupos, MYSQL_ASSOC)) {
 $idGiro=$rowG["TRX_GIRO_ID"];
 $anfitrion= $_SESSION["usr_session"];
 $idHerramienta= $_SESSION["usr_session"];
 $usuario= $_SESSION["usr_session"];
 
 $queryInsertLiquidacionTmp = "INSERT INTO MB_LIQUIDACIONES_TMP (LQD_ANFITRION, LQD_HRR_ID, LQD_GIRO_ID, LQD_MONTO, LQD_CONFIRMADO, LQD_FLUJO, LQD_REGISTRO, LQD_USUARIO) 
					VALUES ('".$anfitrion."','".$idHerramienta."','".$idGiro."',(SELECT SUM( TARIFA_MONTO ) AS TOTAL
					FROM MB_GIROS_TMP
					INNER JOIN MB_FUNCIONARIOS ON GIRO_RECAUDADOR_ID = FUNCIONARIO_ID
					INNER JOIN MB_TRXS_TMP ON GIRO_ID = TRX_GIRO_ID
					INNER JOIN MB_TIPOS_PASAJE ON TRX_TIPO_PASAJE_ID = TIPO_PASAJE_ID
					INNER JOIN MB_TARIFAS ON TIPO_PASAJE_ID = TARIFA_TIPO_PASAJE_ID
					WHERE GIRO_ESTADO = 'ACTIVO' AND GIRO_ID =".$idGiro."
					GROUP BY GIRO_ID ORDER BY 1),'NO','INGRESO','2013-06-19','".$usuario."')";
	executeInsert($queryInsertLiquidacionTmp,NOMBRE_BASE_DATOS);
  
  }
		
		
		
}//fin funcion rosInsert


try {
    $option = $_REQUEST["option"];
	//include ("seguridad.php");

    switch ($option) {
        case "LST_GIRO_TMP": 
					
                    list($nLen, $aData) = rowsGetGiroTmp();
                    echo json_encode(array("success" => true, "resultTotal" => $nLen, "resultRoot" => $aData));
                    break;
		case "LST_TRX_TMP": 
                    list($nLen, $aData) = rowsGetTrxTmp();
                    echo json_encode(array("success" => true, "resultTotal" => $nLen, "resultRoot" => $aData));
                    break;
					
		case "LST_LQD_TMP": 
					//llenamos la liquidacion temporal inicio
					doLlenarLiquidacionTmp();
					//llenamos la liquidacion temporal fin
                    list($nLen, $aData) = rowsGetLqdTmp();
                    echo json_encode(array("success" => true, "resultTotal" => $nLen, "resultRoot" => $aData));
                    break;
					
		case "GIRO_TRX_EXTERNO": 
					//sincronizando las tablas-locales-temporales(bd-copia) con la bd-central (bd-origen)
					global $sResTotal;
					$tablaGiroTmp = $_REQUEST["TABLA_GIRO_TMP"];
					echo $tablaGiroTmp;
					die("fin");
					
					//mb_giros_tmp
					//`GIRO_ID`,`GIRO_PRG_ID`, `GIRO_CONDUCTOR_ID`, `GIRO_RECAUDADOR_ID`, `GIRO_SALE`, `GIRO_LLEGA`, `GIRO_REGISTRO`, `GIRO_MODIFICACION`, `GIRO_USUARIO`, `GIRO_ESTADO`
					$sSQL01 = "INSERT INTO mb_giros ( GIRO_TMP_ID, GIRO_PRG_ID ,  GIRO_CONDUCTOR_ID ,  GIRO_RECAUDADOR_ID ,  GIRO_SALE ,  GIRO_LLEGA ,  GIRO_REGISTRO ,  GIRO_MODIFICACION ,  GIRO_USUARIO ,  GIRO_ESTADO ) 
							VALUES ";
					$sCadenaInsertGiro = rowsInsert($tablaGiroTmp,$sSQL01);
					
					//para la tabla mb_trx_tmp
					//columnas de la temporal : `TRX_GIRO_ID`, `TRX_TIPO_PASAJE_ID`, `TRX_NRO_TARJETA`, `TRX_NRO_FACTURA`, `TRX_PARADA_ID`, `TRX_REGISTRO`, `TRX_MODIFICACION`, `TRX_USUARIO`, `TRX_ESTADO`
					$tablaTrxTmp = $_REQUEST["TABLA_TRX_TMP"];
					$sSQL02 = "INSERT INTO mb_trxs ( `TRX_GIRO_ID`, `TRX_TIPO_PASAJE_ID`, `TRX_NRO_TARJETA`, `TRX_NRO_FACTURA`, `TRX_PARADA_ID`, `TRX_REGISTRO`, `TRX_MODIFICACION`, `TRX_USUARIO`, `TRX_ESTADO`) VALUES ";
					$sCadenaInsertTrx = rowsInsert($tablaTrxTmp,$sSQL02);
					echo $sCadenaInsertGiro."\n";
					echo $sCadenaInsertTrx."\n";
					//$sCadenaMysqlCommit = "START TRANSACTION; ".$sCadenaInsertGiro.$sCadenaInsertTrx." COMMIT;";
					$tablaLqdTmp = $_REQUEST["TABLA_LQD_TMP"];
					$sSQL03 = "INSERT INTO `mb_liquidaciones` ( `LQD_ANFITRION`, `LQD_HRR_ID`, `LQD_GIRO_ID`, `LQD_MONTO`, `LQD_CONFIRMADO`, `LQD_FLUJO`, `LQD_REGISTRO`, `LQD_MODIFICACION`, `LQD_USUARIO`, `LQD_ESTADO`) VALUES ";
					$sCadenaInsertLqd = rowsInsert($tablaLqdTmp,$sSQL03);
					echo $sCadenaInsertLqd."\n";
					executeCommit(NOMBRE_BASE_DATOS,$sCadenaInsertGiro,$sCadenaInsertTrx,$sCadenaInsertLqd);
					
                    break;
					
		case "VACIAR_GIRO_TRX":
					//vaciando las tablas en el dispositivo portable 
					executeCommit(NOMBRE_BASE_DATOS,"TRUNCATE TABLE mb_trxs_tmp;","TRUNCATE TABLE mb_giros_tmp;","TRUNCATE TABLE mb_liquidaciones_tmp;");
                    break;
    }
} catch (Exception $e) {
    echo null;
}

?>